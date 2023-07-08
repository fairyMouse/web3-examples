import { LoadingButton } from "@mui/lab";
import { Container, Stack } from "@mui/material";

const Erc721Index = () => {
  const mintNFT = () => {
    console.log("mintNFT");
  };
  return (
    <Container>
      <Stack flexDirection={"row"} justifyContent={"center"} sx={{ mt: 4 }}>
        <LoadingButton sx={{ width: 120 }} onClick={mintNFT}>
          Mint NFT
        </LoadingButton>
      </Stack>
    </Container>
  );
};

export default Erc721Index;
