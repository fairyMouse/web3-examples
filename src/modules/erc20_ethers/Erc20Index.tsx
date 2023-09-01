import { Box, Button, Container } from "@mui/material";

import TokenTransfer from "./components/TokenTransfer";
import TokenBasicInfo from "./components/TokenBasicInfo";
import TokenFaucet from "./components/TokenFaucet";
import TokenAirdrop from "./components/airdrop/AirdropIndex";

import { useAccount } from "wagmi";
import { useWalletContext } from "@/src/provider/WalletProvider";

const Erc20Index = () => {
  const { account } = useWalletContext();
  // const { address } = useAccount();
  // console.log("address:", address);
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
        {account && <TokenFaucet />}
        {account && <TokenTransfer />}
        {account && <TokenAirdrop />}
      </Box>
    </Container>
  );
};

export default Erc20Index;
