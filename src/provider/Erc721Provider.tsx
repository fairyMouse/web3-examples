import { createContext, useContext, useEffect, useState } from "react";
import { IErc721Context } from "../modules/erc721/types";
import { useWalletContext } from "./WalletProvider";
import { ethers } from "ethers";
import { ERC721_CONTRACT_ADDR } from "../constants/wallet";
import RandomNFT_ABI from "src/constants/abi/RandomNFT.abi.json";

export const Erc721Context = createContext<IErc721Context | null>(null);

export const useErc721Context = () => {
  const context = useContext(Erc721Context);
  if (!context)
    throw new Error("useErc721Context must be use inside Erc721Provider");

  return context;
};

type Props = { children: React.ReactNode };

const Erc721Provider = ({ children }: Props) => {
  const { ethersProvider, account } = useWalletContext();
  // 为了ERC721合约的读写
  const [erc721ProviderContract, setErc721ProviderContract] =
    useState<ethers.Contract | null>(null);
  const [erc721SignerContract, setErc721SignerContract] =
    useState<ethers.Contract | null>(null);

  useEffect(() => {
    setContract();
  }, [account, ethersProvider]);

  async function setContract() {
    if (ethersProvider) {
      const signer = await ethersProvider.getSigner(); // signer为了写

      setErc721ProviderContract(
        new ethers.Contract(ERC721_CONTRACT_ADDR, RandomNFT_ABI, ethersProvider)
      );
      setErc721SignerContract(
        new ethers.Contract(ERC721_CONTRACT_ADDR, RandomNFT_ABI, signer)
      );
    }
  }

  return (
    <Erc721Context.Provider
      value={{ erc721ProviderContract, erc721SignerContract }}
    >
      {children}
    </Erc721Context.Provider>
  );
};
export default Erc721Provider;
