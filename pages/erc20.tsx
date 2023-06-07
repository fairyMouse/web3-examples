import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import HF_ERC20Abi from 'src/constants/abi/HF_ERC20.abi.json';
import { myContractAddr } from 'src/constants/wallet';
import { IErc20Context } from '@/src/modules/erc20/types';
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

  useEffect(() => {
    if (!window.ethereum) {
      toast.error('please install Metamask');
      return;
    }
    // ethers 6.0版本后似乎就不能这么用了
    const provider = new ethers.providers.Web3Provider(window.ethereum as any); // provider为了读
    const signer = provider.getSigner(); // signer为了写

    setWalletProvider(provider);

    const contract = new ethers.Contract(myContractAddr, HF_ERC20Abi, provider);
    const contract2 = new ethers.Contract(myContractAddr, HF_ERC20Abi, signer);

    setProviderContract(contract);
    setSignerContract(contract2);
  }, []);

  const updateMyTokenBalance = useCallback(() => {
    if (providerContract) {
      providerContract.balanceOf(account).then((res: any) => {
        const tokenBalance = ethers.utils.formatUnits(res, 4);
        setBalance(tokenBalance);
      });
    }
  }, [account, providerContract]);

  return (
    <Erc20Context.Provider
      value={{
        account,
        setAccount,
        balance,
        updateMyTokenBalance,
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
