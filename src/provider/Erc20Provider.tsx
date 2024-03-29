import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import MTT_ERC20_ABI from "src/constants/abi/MTT_ERC20.abi.json";
import MTT_FAUCET_ABI from "src/constants/abi/MTT_FAUCET.abi.json";
import {
  ERC20_CONTRACT_ADDR,
  FAUCET_CONTRACT_ADDR,
} from "src/constants/wallet";
import { IErc20Context, IMyTokenInfo } from "@/src/modules/erc20/types_ethers";
import { useWalletContext } from "@/src/provider/WalletProvider";
import { formatUnits } from "ethers/lib/utils";

export const Erc20Context = createContext<IErc20Context | null>(null);

export const useErc20Context = () => {
  const context = useContext(Erc20Context);
  if (!context)
    throw new Error("useErc20Context must be use inside Erc20Provider");

  return context;
};

interface IErc20Provider {
  children: React.ReactNode;
}

const Erc20Provider = (props: IErc20Provider) => {
  const { ethersProvider, account } = useWalletContext();
  // 为了ERC20合约的读写
  const [erc20ProviderContract, setErc20ProviderContract] =
    useState<ethers.Contract | null>(null);
  const [erc20SignerContract, setErc20SignerContract] =
    useState<ethers.Contract | null>(null);

  // 为了Faucet合约的读写
  const [faucetProviderContract, setFaucetProviderContract] =
    useState<ethers.Contract | null>(null);
  const [faucetSignerContract, setFaucetSignerContract] =
    useState<ethers.Contract | null>(null);

  const [tokenInfo, setTokenInfo] = useState<IMyTokenInfo | null>(null);

  const [balance, setBalance] = useState("");
  const [myBalanceLoading, setMyBalanceLoading] = useState(false);

  useEffect(() => {
    setContract();
  }, [account, ethersProvider]);

  async function setContract() {
    if (ethersProvider) {
      const signer = await ethersProvider.getSigner(); // signer为了写

      const erc20ProviderContract = new ethers.Contract(
        ERC20_CONTRACT_ADDR,
        MTT_ERC20_ABI,
        ethersProvider
      );
      const erc20SignerContract = new ethers.Contract(
        ERC20_CONTRACT_ADDR,
        MTT_ERC20_ABI,
        signer
      );

      setErc20ProviderContract(erc20ProviderContract);
      setErc20SignerContract(erc20SignerContract);

      const faucetContract = new ethers.Contract(
        FAUCET_CONTRACT_ADDR,
        MTT_FAUCET_ABI,
        ethersProvider
      );
      const faucetSignerContract = new ethers.Contract(
        FAUCET_CONTRACT_ADDR,
        MTT_FAUCET_ABI,
        signer
      );
      setFaucetProviderContract(faucetContract);
      setFaucetSignerContract(faucetSignerContract);
    }
  }

  useEffect(() => {
    initToken();
  }, [erc20ProviderContract]);

  async function initToken() {
    if (erc20ProviderContract && ethersProvider) {
      const code = await ethersProvider.getCode(ERC20_CONTRACT_ADDR);

      // 确保交互的是个部署到链上的合约
      if (code !== "0x") {
        const symbol = await erc20ProviderContract.symbol();
        const name = await erc20ProviderContract.name();
        const decimalsBigInt = await erc20ProviderContract.decimals();

        setTokenInfo({
          name,
          symbol,
          decimals: decimalsBigInt,
        });
      }
    }
  }

  const updateMyBalance = async () => {
    setMyBalanceLoading(true);
    if (erc20ProviderContract && tokenInfo) {
      const res = await erc20ProviderContract.balanceOf(account);

      const tokenBalance = formatUnits(res, tokenInfo.decimals);
      setBalance(tokenBalance);
    }
    setMyBalanceLoading(false);
  };

  return (
    <Erc20Context.Provider
      value={{
        tokenInfo,
        balance,
        myBalanceLoading,
        updateMyBalance,
        erc20ProviderContract,
        erc20SignerContract,
        faucetProviderContract,
        faucetSignerContract,
      }}
    >
      {props.children}
    </Erc20Context.Provider>
  );
};
export default Erc20Provider;
