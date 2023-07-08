import Erc721Index from "@/src/modules/erc721/Erc721Index";
import { Stack } from "@mui/material";
import RandomNFT_ABI from "src/constants/abi/RandomNFT.abi.json";

const Erc721 = () => {
  return (
    <Stack>
      <Erc721Index />
    </Stack>
  );
};

export default Erc721;
