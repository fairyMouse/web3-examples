import { createContext, useContext, useEffect, useState } from "react";
import { IErc20AirdropContext } from "../modules/erc20/types_ethers";

import { ethers } from "ethers";
import MTT_AIRDROP_ABI from "src/constants/abi/MTT_AIRDROP.abi.json";
import { AIRDROP_CONTRACT_ADDR } from "@/src/constants/wallet";
import { useWalletContext } from "@/src/provider/WalletProvider";

export const Erc20AirdropContext = createContext<IErc20AirdropContext | null>(
  null
);

export const useErc20AirdropContext = () => {
  const context = useContext(Erc20AirdropContext);
  if (!context)
    throw new Error(
      "useErc20AirdropContext must be use inside Erc20AirdropProvider"
    );

  return context;
};

type Props = { children: React.ReactNode };

const Erc20AirdropProvider = ({ children }: Props) => {
  const { account, ethersProvider } = useWalletContext();
  const [airdropProviderContract, setAirdropProviderContract] =
    useState<ethers.Contract | null>(null);
  const [airdropSignerContract, setAirdropSignerContract] =
    useState<ethers.Contract | null>(null);

  useEffect(() => {
    setContract();
  }, [account, ethersProvider]);

  async function setContract() {
    if (ethersProvider) {
      const signer = await ethersProvider.getSigner(); // signer为了写

      const airdropContract = new ethers.Contract(
        AIRDROP_CONTRACT_ADDR,
        MTT_AIRDROP_ABI,
        ethersProvider
      );
      const airdropSignerContract = new ethers.Contract(
        AIRDROP_CONTRACT_ADDR,
        MTT_AIRDROP_ABI,
        signer
      );
      setAirdropProviderContract(airdropContract);
      setAirdropSignerContract(airdropSignerContract);
    }
  }

  return (
    <Erc20AirdropContext.Provider
      value={{
        airdropProviderContract,
        airdropSignerContract,
      }}
    >
      {children}
    </Erc20AirdropContext.Provider>
  );
};
export default Erc20AirdropProvider;
