import Erc20Index from "@/src/modules/erc20/Erc20Index";
import Erc20AirdropProvider from "@/src/provider/Erc20AirdropProvider";
import Erc20Provider from "@/src/provider/Erc20Provider";

const Erc20Page = () => {
  return (
    <Erc20Provider>
      <Erc20AirdropProvider>
        <Erc20Index />
      </Erc20AirdropProvider>
    </Erc20Provider>
  );
};

export default Erc20Page;
