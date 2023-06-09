import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import HFT_ERC20_ABI from 'src/constants/abi/HFT_ERC20.abi.json';
import { myContractAddr } from 'src/constants/wallet';
import { IErc20Context, IMyTokenInfo } from '@/src/modules/erc20/types';
import Erc20Index from '@/src/modules/erc20/Erc20Index';

export const Erc20Context = createContext<IErc20Context | null>(null);

export const useErc20Context = () => {
  const context = useContext(Erc20Context);
  if (!context)
    throw new Error('useErc20Context must be use inside Erc20Provider');

  return context;
};

const Erc20Provider = () => {
  const [walletProvider, setWalletProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [providerContract, setProviderContract] =
    useState<ethers.Contract | null>(null);
  const [signerContract, setSignerContract] = useState<ethers.Contract | null>(
    null
  );

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [myBalanceLoading, setMyBalanceLoading] = useState(false);

  useEffect(() => {
    if (!window.ethereum) {
      toast.error('please install Metamask');
      return;
    }
    // ethers 6.0版本后似乎就不能这么用了
    const provider = new ethers.providers.Web3Provider(window.ethereum); // provider为了读
    const signer = provider.getSigner(); // signer为了写

    setWalletProvider(provider);

    const contract = new ethers.Contract(
      myContractAddr,
      HFT_ERC20_ABI,
      provider
    );
    const signerContract = new ethers.Contract(
      myContractAddr,
      HFT_ERC20_ABI,
      signer
    );

    setProviderContract(contract);
    setSignerContract(signerContract);
  }, []);

  const [tokenInfo, setTokenInfo] = useState<IMyTokenInfo | null>(null);

  useEffect(() => {
    initToken();
  }, [providerContract]);

  async function initToken() {
    if (providerContract) {
      const symbol = await providerContract.symbol();
      const name = await providerContract.name();
      const decimals = await providerContract.decimals();

      setTokenInfo({
        name,
        symbol,
        decimals,
      });
    }
  }

  // ethers.utils.formatEther
  const updateMyBalance = useCallback(async () => {
    setMyBalanceLoading(true);
    if (providerContract && tokenInfo) {
      const res = await providerContract.balanceOf(account);

      const tokenBalance = ethers.utils.formatUnits(res, tokenInfo.decimals);
      setBalance(tokenBalance);
    }
    setMyBalanceLoading(false);
  }, [account, tokenInfo, providerContract]);

  return (
    <Erc20Context.Provider
      value={{
        account,
        setAccount,
        tokenInfo,
        balance,
        myBalanceLoading,
        updateMyBalance,
        walletProvider,
        providerContract,
        signerContract,
      }}
    >
      <Erc20Index />
    </Erc20Context.Provider>
  );
};
export default Erc20Provider;
