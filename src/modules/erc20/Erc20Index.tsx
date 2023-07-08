import { Box, Button, Container, Stack, Typography } from "@mui/material";

import TokenTransfer from "./components/TokenTransfer";
import TokenBasicInfo from "./components/TokenBasicInfo";
import TokenFaucet from "./components/TokenFaucet";
import TokenAirdrop from "./components/airdrop/AirdropIndex";
import { useWalletContext } from "@/src/provider/WalletProvider";

const Erc20Index = () => {
  const { account } = useWalletContext();
  return (
    <Container>
      <Box
        gap={3}
        sx={{ mt: 5 }}
        display="grid"
        gridTemplateColumns={{
          sm: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
      >
        <TokenBasicInfo />
        {account && <TokenTransfer />}
        {account && <TokenFaucet />}
        {account && <TokenAirdrop />}
      </Box>
    </Container>
  );
};

export default Erc20Index;
