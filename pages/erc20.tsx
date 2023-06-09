import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import MTT_ERC20_ABI from 'src/constants/abi/MTT_ERC20.abi.json';
import MTT_FAUCET_ABI from 'src/constants/abi/MTT_FAUCET.abi.json';
import {
  ERC20_CONTRACT_ADDR,
  FAUCET_CONTRACT_ADDR,
} from 'src/constants/wallet';
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

    const erc20Contract = new ethers.Contract(
      ERC20_CONTRACT_ADDR,
      MTT_ERC20_ABI,
      provider
    );
    const erc20SignerContract = new ethers.Contract(
      ERC20_CONTRACT_ADDR,
      MTT_ERC20_ABI,
      signer
    );

    setErc20ProviderContract(erc20Contract);
    setErc20SignerContract(erc20SignerContract);

    const faucetContract = new ethers.Contract(
      FAUCET_CONTRACT_ADDR,
      MTT_FAUCET_ABI,
      provider
    );
    const faucetSignerContract = new ethers.Contract(
      FAUCET_CONTRACT_ADDR,
      MTT_FAUCET_ABI,
      signer
    );
    setFaucetProviderContract(faucetContract);
    setFaucetSignerContract(faucetSignerContract);
  }, []);

  useEffect(() => {
    initToken();
  }, [erc20ProviderContract]);

  async function initToken() {
    if (erc20ProviderContract) {
      const symbol = await erc20ProviderContract.symbol();
      const name = await erc20ProviderContract.name();
      const decimals = await erc20ProviderContract.decimals();

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
    if (erc20ProviderContract && tokenInfo) {
      const res = await erc20ProviderContract.balanceOf(account);

      const tokenBalance = ethers.utils.formatUnits(res, tokenInfo.decimals);
      setBalance(tokenBalance);
    }
    setMyBalanceLoading(false);
  }, [account, tokenInfo, erc20ProviderContract]);

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
        erc20ProviderContract,
        erc20SignerContract,
        faucetProviderContract,
        faucetSignerContract,
      }}
    >
      <Erc20Index />
    </Erc20Context.Provider>
  );
};
export default Erc20Provider;
