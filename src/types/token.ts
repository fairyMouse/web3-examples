export type TokenPrice = number | "loading" | undefined;
export type Token = {
  address: string;
  l1Address?: string;
  name?: string;
  symbol: string;
  decimals: number;
  iconUrl?: string;
  enabledForFees?: boolean;
  price?: TokenPrice;
};
