import PageContainer from "@/src/layouts/PageContainer";
import Erc20Index from "@/src/modules/erc20/Erc20Index";
import Erc20AirdropProvider from "@/src/provider/Erc20AirdropProvider";
import Erc20Provider from "@/src/provider/Erc20Provider";

const Erc20Page = () => {
  return (
    <PageContainer>
      <Erc20Provider>
        <Erc20AirdropProvider>
          <Erc20Index />
        </Erc20AirdropProvider>
      </Erc20Provider>
    </PageContainer>
  );
};

export default Erc20Page;
