import { goerli, mainnet } from "@wagmi/core/chains";
import { EraNetwork, L2Network } from "../types/network";
import { Network } from "hardhat/types";

console.log("goerli:", goerli);
export const blockExplorerUrl = goerli.blockExplorers.default.url;

export const l1Networks = {
  mainnet: {
    ...mainnet,
    name: "Mainnet",
    network: "mainnet",
  },
  goerli: {
    ...goerli,
    name: "Goerli Testnet",
  },
} as const;

export const eraNetworks: EraNetwork[] = [
  {
    id: 324,
    key: "era-mainnet",
    name: "zkSync Era Mainnet",
    shortName: "Era Mainnet",
    rpcUrl: "https://mainnet.era.zksync.io",
    blockExplorerUrl: "https://explorer.zksync.io",
    blockExplorerApi: "https://block-explorer-api.mainnet.zksync.io",
    displaySettings: {
      showPartnerLinks: true,
      showZkSyncLiteNetworks: true,
    },
    // getTokens: () => getTokensByNetworkId(324),
    l1Network: l1Networks.mainnet,
  },
  {
    id: 280,
    key: "era-goerli",
    name: "zkSync Era Testnet",
    shortName: "Era Testnet",
    rpcUrl: "https://testnet.era.zksync.dev",
    blockExplorerUrl: "https://goerli.explorer.zksync.io",
    blockExplorerApi: "https://block-explorer-api.testnets.zksync.dev",
    faucetUrl: "https://testnet2-faucet.zksync.dev/ask_money",
    displaySettings: {
      showPartnerLinks: true,
      showZkSyncLiteNetworks: true,
    },
    // getTokens: () => getTokensByNetworkId(280),
    l1Network: l1Networks.goerli,
  },
];

export type ZkSyncLiteNetwork = L2Network & { network: string };
export const zkSyncLiteNetworks: ZkSyncLiteNetwork[] = [
  {
    key: "lite-mainnet",
    name: "zkSync Lite Mainnet",
    network: "mainnet",
    shortName: "Lite Mainnet",
    blockExplorerUrl: "https://zkscan.io",
    l1Network: l1Networks.mainnet,
  },
  {
    key: "lite-goerli",
    name: "zkSync Lite Goerli",
    network: "goerli",
    shortName: "Lite Goerli",
    blockExplorerUrl: "https://goerli.zkscan.io",
    l1Network: l1Networks.goerli,
  },
];
