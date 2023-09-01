import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useAccount, useBalance } from "wagmi";
import { ETH_L1_ADDRESS, ETH_L2_ADDRESS } from "src/constants/address";
import { Hash, fetchBalance, getWalletClient } from "@wagmi/core";

import axios from "axios";
import { L2VoidSigner, Signer, Web3Provider } from "zksync-web3";

import { IZksyncEraProviderContext } from "./types";
import { useBridgeProviderContext } from "./BridgeProvider";
import { formatUnits } from "ethers";
import { calculateFee } from "@/src/utils/helpers";
import { useEraProviderStore } from "./hooks/useEraProviderStore";

export const ZksyncEraProviderContext =
  createContext<IZksyncEraProviderContext | null>(null);

export const useZksyncEraProviderContext = () => {
  const context = useContext(ZksyncEraProviderContext);
  if (!context)
    throw new Error(
      "useZksyncEraProviderContext must be use inside ZksyncEraProviderProvider"
    );

  return context;
};

type Props = { children: React.ReactNode };

const ZksyncEraProviderProvider = ({ children }: Props) => {
  const { isCorrectNetworkSet, l1ChainId, isDeposit, accountBalance } =
    useBridgeProviderContext();
  const { address } = useAccount();

  const { eraNetwork } = useEraProviderStore();
  const [eraL2Signer, setEraL2Signer] = useState<Signer | null>(null);
  const [web3Provider, setWeb3Provider] = useState<Web3Provider | null>(null);
  const [maxWithdrawFee, setMaxWithdrawFee] = useState("0");

  useEffect(() => {
    if (!eraL2Signer && isCorrectNetworkSet) {
      getWalletClient({ chainId: eraNetwork.id }).then((client: any) => {
        const web3Provider = new Web3Provider(client, "any");

        const eraL2Signer = web3Provider.getSigner();
        setEraL2Signer(eraL2Signer);
        setWeb3Provider(web3Provider);
      });
    }
  }, [eraNetwork, eraL2Signer, isCorrectNetworkSet]);

  useEffect(() => {
    updateWithdrawFee();
  }, [web3Provider, address, isCorrectNetworkSet]);

  const updateWithdrawFee = () => {
    if (web3Provider && address && isCorrectNetworkSet) {
      const gasParams = {
        from: address,
        to: address,
        token: ETH_L1_ADDRESS,
        amount: "1",
      };
      Promise.all([
        web3Provider.getGasPrice(),
        web3Provider.estimateGasWithdraw(gasParams),
      ]).then(([price, limit]) => {
        const maxWithdrawFee = calculateFee(limit, price).toString();

        setMaxWithdrawFee(maxWithdrawFee);
      });
    }
  };

  const [eraBalances, setEraBalances] = useState(null);

  useEffect(() => {
    if (address && !eraBalances) {
      axios
        .get(`${eraNetwork.blockExplorerApi}/address/${address}`)
        .then(res => {
          setEraBalances(res.data.balances);
        });
    }
  }, [address, eraBalances, eraNetwork]);

  const tokenBalance = eraBalances?.[ETH_L2_ADDRESS] as any;

  const l1Balance = accountBalance?.formatted || "0";
  const l2Balance = tokenBalance
    ? formatUnits(tokenBalance.balance, tokenBalance.token.decimals)
    : "0";

  return (
    <ZksyncEraProviderContext.Provider
      value={{
        updateWithdrawFee,
        eraBalances,
        eraL2Signer,
        l1Balance,
        l2Balance,
        maxWithdrawFee,
      }}
    >
      {children}
    </ZksyncEraProviderContext.Provider>
  );
};
export default ZksyncEraProviderProvider;
