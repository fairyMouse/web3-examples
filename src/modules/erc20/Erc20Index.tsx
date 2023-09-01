import { Alert, Box, Button, Card, Container, Typography } from "@mui/material";

import TokenTransfer from "./components/TokenTransfer";
import TokenBasicInfo from "./components/TokenBasicInfo";
import TokenAirdrop from "./components/airdrop/AirdropIndex";
import Erc20Provider from "./Erc20Provider";
import { useAccount } from "wagmi";

const Erc20Main = () => {
  const { address } = useAccount();
  return (
    <Container>
      <TokenBasicInfo />
      {address ? (
        <Box
          // gap={3}
          sx={{ mt: 3 }}
          // display="grid"
          // gridTemplateColumns={{
          //   sm: "repeat(1, 1fr)",
          //   lg: "repeat(2, 1fr)",
          // }}
        >
          <TokenTransfer />
          {/* <TokenAirdrop /> */}
        </Box>
      ) : (
        <Typography
          variant="body1"
          paragraph
          color={"text.secondary"}
          sx={{ mt: 3 }}
        >
          Link wallet to discover more...
        </Typography>
      )}
    </Container>
  );
};

const Erc20Index = () => {
  return (
    <Erc20Provider>
      <Erc20Main />
    </Erc20Provider>
  );
};

export default Erc20Index;
