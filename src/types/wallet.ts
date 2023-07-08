import { ethers } from "ethers";

export interface IWalletContext {
  ethersProvider: ethers.BrowserProvider | null;
  account: string;
  setAccount: (account: string) => void;
}
