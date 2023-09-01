import { ethers } from "ethers";

export interface IWalletContext {
  ethersProvider: ethers.providers.Web3Provider | null;
  account: string;
  setAccount: (account: string) => void;
}
