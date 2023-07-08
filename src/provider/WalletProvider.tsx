import { createContext, useContext, useEffect, useState } from "react";
import { IWalletContext } from "../types/wallet";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export const WalletContext = createContext<IWalletContext | null>(null);

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context)
    throw new Error("useWalletContext must be use inside WalletProvider");

  return context;
};

type Props = { children: React.ReactNode };

const WalletProvider = ({ children }: Props) => {
  const [ethersProvider, setEthersProvider] =
    useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    if (!window.ethereum) {
      toast.error("please install Metamask");
      return;
    }
    if (window.ethereum.selectedAddress === null) {
      toast.warn("MetaMask is not logged in");
      return;
    }

    const handleAccountsChanged = () => {
      const provider = new ethers.BrowserProvider(window.ethereum); // provider为了读
      setEthersProvider(provider);
    };
    handleAccountsChanged();

    // 监听账户切换
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  return (
    <WalletContext.Provider value={{ ethersProvider }}>
      {children}
    </WalletContext.Provider>
  );
};
export default WalletProvider;
