import dayjs from 'dayjs';

export const WELCOME_TEXT =
  'Hello! Please sign this message to confirm your ownership of the address. This action will not cost any gas fee. Here is a unique text: ';

export const originText = WELCOME_TEXT + dayjs().unix() * 1000;

export const myContractAddr = '0xe96a4D42072024e6b4b3ee615eB4dFd3F6fAd322';
