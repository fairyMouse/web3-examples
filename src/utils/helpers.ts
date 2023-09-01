import { BigNumberish } from "ethers";
import { L1Network, L2Network } from "../types/network";

export const findNetworkWithSameL1 = (
  l1Network: L1Network,
  networks: L2Network[]
) => {
  return networks.find(
    network => l1Network.network === network.l1Network?.network
  );
};

export function calculateFee(gasLimit: BigNumberish, gasPrice: BigNumberish) {
  return Number(gasLimit.toString()) * Number(gasPrice.toString());
}
