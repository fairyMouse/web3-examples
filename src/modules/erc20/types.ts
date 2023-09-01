import { Address, PrepareWriteContractResult } from "@wagmi/core";
import { ethers } from "ethers";

export interface IMyTokenInfo {
  name: string;
  symbol: string;
  decimals: ethers.BigNumberish;
}

export interface IContractParams {
  address: Address;
  abi: any;
}
export interface IErc20Context {
  tokenInfo: IMyTokenInfo | null;
  balanceRes: any;
  ERC20ContractParams: IContractParams;
  // transferConfig: PrepareWriteContractResult<any, "transfer", number>;
}
