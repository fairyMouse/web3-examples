import { createContext, useContext, useState } from "react";
import { IContractParams, IErc20Context } from "./types";
import {
  Address,
  useAccount,
  useContractRead,
  useContractReads,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { ERC20_CONTRACT_ADDR } from "@/src/constants/wallet";
import MTT_ERC20_ABI from "src/constants/abi/MTT_ERC20.abi.json";
import { l1Networks } from "@/src/constants/network";

export const Erc20Context = createContext<IErc20Context | null>(null);

export const useErc20Context = () => {
  const context = useContext(Erc20Context);
  if (!context)
    throw new Error("useErc20Context must be use inside Erc20Provider");

  return context;
};

type Props = { children: React.ReactNode };

const Erc20Provider = ({ children }: Props) => {
  const { address } = useAccount();

  const ERC20ContractParams: IContractParams = {
    address: ERC20_CONTRACT_ADDR,
    abi: MTT_ERC20_ABI,
  };
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...ERC20ContractParams,
        functionName: "name",
      },
      {
        ...ERC20ContractParams,
        functionName: "symbol",
      },
      {
        ...ERC20ContractParams,
        functionName: "decimals",
      },
    ],
  }) as any;
  const tokenInfo = data
    ? {
        name: data[0].result,
        symbol: data[1].result,
        decimals: data[2].result,
      }
    : null;

  const balanceRes = useContractRead({
    ...ERC20ContractParams,
    functionName: "balanceOf",
    args: [address || "0x"],
    enabled: !!address,
  }) as any;

  // const { config } = usePrepareContractWrite({
  //   ...ERC20ContractParams,
  //   functionName: "transfer",
  // });

  return (
    <Erc20Context.Provider
      value={{
        ERC20ContractParams,
        tokenInfo,
        balanceRes,
        // transferConfig: config
      }}
    >
      {children}
    </Erc20Context.Provider>
  );
};
export default Erc20Provider;
