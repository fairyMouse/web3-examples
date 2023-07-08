import { ethers } from "ethers";

export interface IErc721Context {
  erc721ProviderContract: ethers.Contract | null;
  erc721SignerContract: ethers.Contract | null;
}
