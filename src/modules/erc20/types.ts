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
  providerContract: ethers.Contract | null;
  signerContract: ethers.Contract | null;
}
