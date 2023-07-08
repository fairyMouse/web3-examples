import dayjs from "dayjs";

export const WELCOME_TEXT =
  "Hello! Please sign this message to confirm your ownership of the address. This action will not cost any gas fee. Here is a unique text: ";

export const originText = WELCOME_TEXT + dayjs().unix() * 1000;

export const ERC20_CONTRACT_ADDR = "0x50cd9608B2681F450deaC9AC6BcFea5Aa55BC858";
export const ERC721_CONTRACT_ADDR =
  "0x15F2c7Bab12647299c4eC51eAc738919053A1119"; // 使用 donkeys/0/images/75.png 这种图片结尾合约
// export const ERC721_CONTRACT_ADDR =
//   "0x818b93d64d17849E66D973811075422B9d2A4A20"; // 使用 donkey/images/75.png 这种图片结尾合约

export const FAUCET_CONTRACT_ADDR =
  "0xd986437F12D06a753f24eA56b334044E4531f7c9";

export const AIRDROP_CONTRACT_ADDR =
  "0x24dabF82Db4116BAC9E77bE2A34507D59D7be369";
