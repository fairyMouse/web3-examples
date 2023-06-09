import dayjs from 'dayjs';

export const WELCOME_TEXT =
  'Hello! Please sign this message to confirm your ownership of the address. This action will not cost any gas fee. Here is a unique text: ';

export const originText = WELCOME_TEXT + dayjs().unix() * 1000;

export const ERC20_CONTRACT_ADDR = '0x50cd9608B2681F450deaC9AC6BcFea5Aa55BC858';
export const FAUCET_CONTRACT_ADDR =
  '0xd986437F12D06a753f24eA56b334044E4531f7c9';
