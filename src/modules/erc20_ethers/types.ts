import { ethers } from "ethers";

export interface IMyTokenInfo {
  name: string;
  symbol: string;
  decimals: ethers.BigNumberish;
}
export interface IErc20Context {
  tokenInfo: IMyTokenInfo | null;
  balance: string;
  myBalanceLoading: boolean;
  updateMyBalance: () => void;
  erc20ProviderContract: ethers.Contract | null;
  erc20SignerContract: ethers.Contract | null;
  faucetProviderContract: ethers.Contract | null;
  faucetSignerContract: ethers.Contract | null;
}

export interface IErc20AirdropContext {
  airdropProviderContract: ethers.Contract | null;
  airdropSignerContract: ethers.Contract | null;
}
