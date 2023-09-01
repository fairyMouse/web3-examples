import { blockExplorerUrl } from "@/src/constants/network";
import { shortenAddress } from "@/src/utils/formatters";
import { Box, Card, Link, Stack, Tooltip, Typography } from "@mui/material";
import { ERC20_CONTRACT_ADDR } from "src/constants/wallet";
import { useErc20Context } from "src/provider/Erc20Provider";

const TokenBasicInfo = () => {
  const { tokenInfo } = useErc20Context();

  return (
    <Card sx={{ p: 3, mt: 5 }}>
      <Typography variant="h4">Basic Info</Typography>

      <Box
        gap={3}
        sx={{ mt: 2 }}
        display="grid"
        gridTemplateColumns={{
          sm: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
      >
        <Stack flexDirection={"row"} gap={1}>
          <Typography variant="body1">Contract Address:</Typography>
          <Tooltip title={ERC20_CONTRACT_ADDR}>
            <Link
              href={`${blockExplorerUrl}/address/${ERC20_CONTRACT_ADDR}`}
              target="_blank"
            >
              {shortenAddress(ERC20_CONTRACT_ADDR)}
            </Link>
          </Tooltip>
        </Stack>

        <Typography variant="body1">
          Token Name: {tokenInfo?.name || ""}
        </Typography>
        <Typography variant="body1">
          Token Symbol: {tokenInfo?.symbol || ""}
        </Typography>
        <Typography variant="body1">
          Token Decimals: {tokenInfo?.decimals.toString() || ""}
        </Typography>
      </Box>
    </Card>
  );
};

export default TokenBasicInfo;
