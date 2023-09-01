import { L2Network } from "@/src/types/network";
import { eraNetworks, zkSyncLiteNetworks } from "src/constants/network";

export type Version = "era" | "lite";

// const selectedNetworkKey = "era-mainnet";
const selectedNetworkKey = "era-goerli";

export const useNetworkStore = () => {
  const l2Networks = [...eraNetworks, ...zkSyncLiteNetworks];
  const defaultNetwork = l2Networks[0];

  const getVersionByNetwork = (network: L2Network): Version => {
    if (eraNetworks.some(e => e.key === network.key)) {
      return "era";
    } else if (zkSyncLiteNetworks.some(e => e.key === network.key)) {
      return "lite";
    } else {
      throw new Error(`Unknown network: ${network.key}`);
    }
  };
  const selectedNetwork =
    l2Networks.find(e => e.key === selectedNetworkKey) ?? defaultNetwork;

  const version = getVersionByNetwork(selectedNetwork);
  const l1Network = selectedNetwork.l1Network;

  return {
    selectedNetwork,
    l1Network,
    version,
  };
};
