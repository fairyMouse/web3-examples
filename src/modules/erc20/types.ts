import { ethers } from 'ethers';

export interface IMyTokenInfo {
  name: string;
  symbol: string;
  decimals: number;
}
export interface IErc20Context {
  account: string;
  setAccount: (account: string) => void;
  tokenInfo: IMyTokenInfo | null;
  balance: string;
  myBalanceLoading: boolean;
  updateMyBalance: () => void;
  walletProvider: ethers.providers.Web3Provider | null;
  erc20ProviderContract: ethers.Contract | null;
  erc20SignerContract: ethers.Contract | null;
  faucetProviderContract: ethers.Contract | null;
  faucetSignerContract: ethers.Contract | null;
}
