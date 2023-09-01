import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import TokenTransfer from "./components/TokenTransfer";
import TokenBasicInfo from "./components/TokenBasicInfo";
import TokenAirdrop from "./components/airdrop/AirdropIndex";
import Erc20Provider, { useErc20Context } from "./Erc20Provider";
import { useAccount } from "wagmi";
import { l1Networks } from "@/src/constants/network";

const Erc20Main = () => {
  const { address } = useAccount();
  return (
    <Container>
      <Stack>
        <TokenBasicInfo />
        {address ? (
          <Box sx={{ mt: 3 }}>
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
      </Stack>
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
