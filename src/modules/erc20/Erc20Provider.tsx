import { createContext, useContext, useState } from "react";
import { IErc20Context } from "./types";
import { Address, useAccount, useContractRead, useContractReads } from "wagmi";
import { ERC20_CONTRACT_ADDR } from "@/src/constants/wallet";
import MTT_ERC20_ABI from "src/constants/abi/MTT_ERC20.abi.json";
import { formatUnits } from "ethers";

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
  const ERC20Contract: {
    address: Address;
    abi: any;
  } = {
    address: ERC20_CONTRACT_ADDR,
    abi: MTT_ERC20_ABI,
  };
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...ERC20Contract,
        functionName: "name",
      },
      {
        ...ERC20Contract,
        functionName: "symbol",
      },
      {
        ...ERC20Contract,
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

  const { data: balanceData } = useContractRead({
    address: ERC20_CONTRACT_ADDR,
    abi: MTT_ERC20_ABI,
    functionName: "balanceOf",
    args: [address || "0x"],
    enabled: !!address,
  }) as any;

  const balance =
    balanceData && tokenInfo
      ? formatUnits(balanceData.toString(), tokenInfo?.decimals)
      : "";

  return (
    <Erc20Context.Provider value={{ tokenInfo, balance }}>
      {children}
    </Erc20Context.Provider>
  );
};
export default Erc20Provider;
