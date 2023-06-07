import dayjs from 'dayjs';

export const WELCOME_TEXT =
  'Hello! Please sign this message to confirm your ownership of the address. This action will not cost any gas fee. Here is a unique text: ';

export const originText = WELCOME_TEXT + dayjs().unix() * 1000;

export const myContractAddr = '0x036B06F83A7Ae0C0f05e035b23d09D4123B85ABe';
