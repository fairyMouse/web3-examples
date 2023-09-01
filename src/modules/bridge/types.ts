import { Token } from "@/src/types/token";
import { FetchBalanceResult } from "@wagmi/core";
import { UseFormReturn } from "react-hook-form";
import { L1Signer, Signer } from "zksync-web3";
import { FullDepositFee } from "zksync-web3/build/src/types";

export enum BridgeTabEnum {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

export interface IBridgeFormKeys {
  amount: string;
}

export enum BridgeTxDirectionEnum {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

export interface IBridgeProviderContext {
  l1ChainId: number | undefined;
  maxFee: string;
  averageFee: string;
  isCorrectNetworkSet: boolean;
  isDeposit: boolean;
  isWithdraw: boolean;
  eraL1Signer: L1Signer | null;
  voidL1Signer: L1Signer | null;
  tokens: Token[];
  tokenFrom: Token | null;
  setTokenFrom: (token: Token) => void;
  methods: UseFormReturn<IBridgeFormKeys, any, undefined>;
  txDirection: BridgeTxDirectionEnum;
  setTxDirection: (txDirection: BridgeTxDirectionEnum) => void;
  fullDepositFee: FullDepositFee | null;
  accountBalance: FetchBalanceResult | undefined;
  updateDepositFee: () => void;
  // setFullDepositFee: (fullDepositFee: FullDepositFee | null) => void;
}

export interface IBridgeTxHistoryItem {
  // address: string;
}

export interface IZksyncEraProviderContext {
  eraBalances: Record<
    string,
    {
      balance: string;
      token: Token;
    }
  > | null;
  eraL2Signer: Signer | null;
  l1Balance: string;
  l2Balance: string;
  maxWithdrawFee: string;
  updateWithdrawFee: () => void;
}
