import Erc721Index from "@/src/modules/erc721/Erc721Index";
import Erc721Provider from "@/src/provider/Erc721Provider";
import { Stack } from "@mui/material";

const Erc721 = () => {
  return (
    <Erc721Provider>
      <Erc721Index />
    </Erc721Provider>
  );
};

export default Erc721;
