import { ethers } from "ethers";

export interface IWalletContext {
  ethersProvider: ethers.BrowserProvider | null;
}
