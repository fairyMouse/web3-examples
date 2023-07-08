import { Card, Stack, Typography } from "@mui/material";
import { ERC20_CONTRACT_ADDR } from "src/constants/wallet";
import { useErc20Context } from "src/provider/Erc20Provider";

const TokenBasicInfo = () => {
  const { tokenInfo } = useErc20Context();

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4">Basic Info</Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Typography variant="body1">
          Contract Address: {ERC20_CONTRACT_ADDR}
        </Typography>

        <Typography variant="body1">
          Token Name: {tokenInfo?.name || ""}
        </Typography>
        <Typography variant="body1">
          Token Symbol: {tokenInfo?.symbol || ""}
        </Typography>
        <Typography variant="body1">
          Token Decimals: {tokenInfo?.decimals.toString() || ""}
        </Typography>
      </Stack>
    </Card>
  );
};

export default TokenBasicInfo;
