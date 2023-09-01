import { createContext, useContext, useEffect, useState } from "react";
import {
  BridgeTxDirectionEnum,
  IBridgeFormKeys,
  IBridgeProviderContext,
} from "./types";
import { useForm } from "react-hook-form";

import { ETH_L1_ADDRESS, ETH_L2_ADDRESS } from "src/constants/address";
import { checksumAddress } from "src/utils/formatters";

import { TOKEN_LIST } from "src/constants/token";
import { getWalletClient } from "@wagmi/core";
import { L1Signer, L1VoidSigner } from "zksync-web3";
import { VoidSigner, ethers } from "ethers";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { FullDepositFee } from "zksync-web3/build/src/types";
import { useEraProviderStore } from "./hooks/useEraProviderStore";
import { Token } from "@/src/types/token";

export const BridgeProviderContext =
  createContext<IBridgeProviderContext | null>(null);

export const useBridgeProviderContext = () => {
  const context = useContext(BridgeProviderContext);
  if (!context)
    throw new Error(
      "useBridgeProviderContext must be use inside BridgeProvider"
    );

  return context;
};

type Props = { children: React.ReactNode };

const BridgeProvider = ({ children }: Props) => {
  const [txDirection, setTxDirection] = useState<BridgeTxDirectionEnum>(
    BridgeTxDirectionEnum.DEPOSIT
  );
  const { address } = useAccount();
  const { data: accountBalance } = useBalance({ address });
  const isDeposit = txDirection === BridgeTxDirectionEnum.DEPOSIT;
  const isWithdraw = txDirection === BridgeTxDirectionEnum.WITHDRAW;

  const [eraL1Signer, setEraL1Signer] = useState<L1Signer | null>(null);
  const [voidL1Signer, setVoidL1Signer] = useState<L1Signer | null>(null);

  const { eraNetwork, requestProvider } = useEraProviderStore();
  const network = useNetwork();
  console.log("network:", network);
  const l1ChainId = eraNetwork?.l1Network?.id;

  const [fullDepositFee, setFullDepositFee] = useState<FullDepositFee | null>(
    null
  );
  const [maxFee, setMaxFee] = useState("0");
  const [averageFee, setAverageFee] = useState("0");

  const [tokens, setTokens] = useState<Token[]>([]);
  const [tokenFrom, setTokenFrom] = useState<Token | null>(null);

  const isCorrectNetworkSet = isDeposit
    ? network?.chain?.id === eraNetwork?.l1Network?.id
    : network?.chain?.id === eraNetwork.id;

  const methods = useForm<IBridgeFormKeys>({
    defaultValues: {
      amount: "",
    },
  });

  useEffect(() => {
    if (!eraL1Signer && !voidL1Signer && address && isCorrectNetworkSet) {
      getWalletClient(l1ChainId ? { chainId: l1ChainId } : undefined).then(
        (client: any) => {
          if (client) {
            const web3Provider = new ethers.providers.Web3Provider(
              client as any
            );

            const eraL1Signer = L1Signer.from(
              web3Provider.getSigner(),
              requestProvider()
            );
            setEraL1Signer(eraL1Signer);

            const voidSigner = new VoidSigner(address, web3Provider);
            setVoidL1Signer(
              L1VoidSigner.from(
                voidSigner,
                requestProvider()
              ) as unknown as L1Signer
            );
          }
        }
      );
    }
  }, [
    l1ChainId,
    requestProvider,
    eraL1Signer,
    address,
    voidL1Signer,
    isCorrectNetworkSet,
  ]);

  useEffect(() => {
    if (eraNetwork) {
      getTokensByNetworkId(eraNetwork.id).then(result => {
        setTokens(result);
        if (!tokenFrom) {
          setTokenFrom(result[0]);
        }
      });
    }
  }, [eraNetwork, tokenFrom]);

  console.log("fullDepositFee:", fullDepositFee);
  useEffect(() => {
    updateDepositFee();
  }, [eraL1Signer, address, isDeposit, isCorrectNetworkSet]);

  const updateDepositFee = () => {
    if (eraL1Signer && isDeposit && isCorrectNetworkSet) {
      const params = {
        token: ETH_L1_ADDRESS,
        to: address,
      };

      eraL1Signer?.getFullRequiredDepositFee(params).then((fee: any) => {
        setFullDepositFee(fee);

        if (fee.l1GasLimit && fee.maxFeePerGas && fee.maxPriorityFeePerGas) {
          const fee1 = fee.l1GasLimit
            .mul(fee.maxFeePerGas)
            .add(fee.baseCost || "0")
            .toString();
          const fee2 = fee.l1GasLimit
            .mul(fee.maxPriorityFeePerGas)
            .add(fee.baseCost || "0")
            .toString();
          setMaxFee(fee1);
          setAverageFee(fee2);
        }
      });
    }
  };

  const getTokensByNetworkId = async (networkId: number) => {
    if (![270, 324, 280].includes(networkId))
      throw new Error(`Network id ${networkId} is not supported`);

    // const tokens = await getTokenCollection(networkId as 270 | 324 | 280);

    return TOKEN_LIST.map(token => {
      const l2Address =
        token.l2Address === ETH_L1_ADDRESS
          ? ETH_L2_ADDRESS
          : checksumAddress(token.l2Address);
      return {
        l1Address: checksumAddress(token.l1Address),
        address: l2Address,
        symbol: token.symbol,
        name: token.name,
        decimals: token.decimals,
        iconUrl: token.imageUrl,
        enabledForFees: l2Address === ETH_L2_ADDRESS,
        price: undefined,
      };
    }) as Token[];
  };

  return (
    <BridgeProviderContext.Provider
      value={{
        isCorrectNetworkSet,
        maxFee,
        averageFee,
        accountBalance,
        l1ChainId,
        isDeposit,
        isWithdraw,
        eraL1Signer,
        voidL1Signer,
        methods,
        tokens,
        tokenFrom,
        setTokenFrom,
        txDirection,
        setTxDirection,
        fullDepositFee,
        updateDepositFee,
      }}
    >
      {children}
    </BridgeProviderContext.Provider>
  );
};
export default BridgeProvider;
