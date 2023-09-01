import { Box, Button, Container } from "@mui/material";

import TokenTransfer from "./components/TokenTransfer";
import TokenBasicInfo from "./components/TokenBasicInfo";
import TokenFaucet from "./components/TokenFaucet";
import TokenAirdrop from "./components/airdrop/AirdropIndex";

import { useAccount } from "wagmi";

const Erc20Index = () => {
  const { address } = useAccount();
  return (
    <Container>
      <TokenBasicInfo />
      <Box
        gap={3}
        sx={{ mt: 3 }}
        display="grid"
        gridTemplateColumns={{
          sm: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
      >
        {address && <TokenFaucet />}
        {address && <TokenTransfer />}
        {address && <TokenAirdrop />}
      </Box>
    </Container>
  );
};

export default Erc20Index;
