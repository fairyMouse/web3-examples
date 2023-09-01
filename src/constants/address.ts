// import { L2_ETH_TOKEN_ADDRESS } from "zksync-web3/build/src/utils";
import { checksumAddress } from "../utils/formatters";

// 目前项目的ethers版本略高，zksync-web3用的还是旧的，写法不兼容
const L2_ETH_TOKEN_ADDRESS = "0x000000000000000000000000000000000000800a";

export const ETH_L1_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ETH_L2_ADDRESS = checksumAddress(L2_ETH_TOKEN_ADDRESS);
