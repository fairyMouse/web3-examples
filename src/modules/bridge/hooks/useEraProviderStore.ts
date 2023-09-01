import { L1Signer, Web3Provider, Provider } from "zksync-web3";
import { useNetworkStore } from "./useNetworkStore";

import { EraNetwork } from "@/src/types/network";
import { eraNetworks } from "@/src/constants/network";
import { findNetworkWithSameL1 } from "@/src/utils/helpers";

export const useEraProviderStore = () => {
  const { selectedNetwork, l1Network, version } = useNetworkStore();
  const eraNetwork =
    version === "era"
      ? (selectedNetwork as EraNetwork)
      : (l1Network &&
          (findNetworkWithSameL1(l1Network, eraNetworks) as EraNetwork)) ||
        eraNetworks[0];

  let provider: Provider | undefined;

  const requestProvider = () => {
    if (version !== "era") throw new Error("Invalid network");
    if (!provider) {
      provider = new Provider(eraNetwork.rpcUrl);
    }
    return provider;
  };

  return {
    eraNetwork,
    requestProvider,
    blockExplorerUrl: eraNetwork.blockExplorerUrl,
  };
};
