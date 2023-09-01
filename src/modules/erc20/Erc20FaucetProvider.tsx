import { createContext, useContext } from "react";
import { IErc20FaucetContext } from "./types";

export const Erc20FaucetContext = createContext<IErc20FaucetContext | null>(
  null
);

export const useErc20FaucetContext = () => {
  const context = useContext(Erc20FaucetContext);
  if (!context)
    throw new Error(
      "useErc20FaucetContext must be use inside Erc20FaucetProvider"
    );

  return context;
};

type Props = { children: React.ReactNode };

const Erc20FaucetProvider = ({ children }: Props) => {
  return (
    <Erc20FaucetContext.Provider value={{ test: 123 }}>
      {children}
    </Erc20FaucetContext.Provider>
  );
};
export default Erc20FaucetProvider;
