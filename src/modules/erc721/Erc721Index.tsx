import { LoadingButton } from "@mui/lab";
import { Container, Stack } from "@mui/material";

const Erc721Index = () => {
  return (
    <Container>
      <Stack flexDirection={"row"} justifyContent={"center"} sx={{ mt: 4 }}>
        <LoadingButton sx={{ width: 120 }}>Mint</LoadingButton>
      </Stack>
    </Container>
  );
};

export default Erc721Index;
