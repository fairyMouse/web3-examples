import { Chain } from "wagmi";

export type L1Network = Chain;
export type L2Network = {
  key: string;
  name: string;
  shortName: string;
  l1Network?: L1Network;
  blockExplorerUrl?: string;
  // If set to true, the network will not be shown in the network selector
  hidden?: boolean;
};
export type EraNetwork = L2Network & {
  id: number;
  rpcUrl: string;
  blockExplorerApi?: string;
  faucetUrl?: string;
  displaySettings?: {
    showPartnerLinks?: boolean;
    showZkSyncLiteNetworks?: boolean;
  };
  // getTokens: () => Token[] | Promise<Token[]>;
};
