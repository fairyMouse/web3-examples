import { createContext, useContext, useEffect, useState } from "react";
import { IWalletContext } from "../types/wallet";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { switchToEthereum } from "../utils/ethereum";

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
    useState<ethers.providers.Web3Provider | null>(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (!window.ethereum) {
      toast.error("please install Metamask");
      return;
    }

    const handleAccountsChanged = () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // provider为了读
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
    <WalletContext.Provider value={{ account, setAccount, ethersProvider }}>
      {children}
    </WalletContext.Provider>
  );
};
export default WalletProvider;
