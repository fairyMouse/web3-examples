import { ethers } from "ethers";

export interface IMyTokenInfo {
  name: string;
  symbol: string;
  decimals: ethers.BigNumberish;
}

export interface IErc20Context {
  tokenInfo: IMyTokenInfo | null;
  balance: string;
}

export interface IErc20FaucetContext {}
