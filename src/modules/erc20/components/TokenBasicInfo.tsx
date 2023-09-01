import { blockExplorerUrl } from "@/src/constants/network";
import { shortenAddress } from "@/src/utils/formatters";
import {
  Alert,
  Box,
  Card,
  Divider,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ERC20_CONTRACT_ADDR,
  FAUCET_CONTRACT_ADDR,
} from "src/constants/wallet";

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import MTT_ERC20_ABI from "src/constants/abi/MTT_ERC20.abi.json";
import MTT_FAUCET_ABI from "src/constants/abi/MTT_FAUCET.abi.json";

import { useErc20Context } from "../Erc20Provider";
import { LoadingButton } from "@mui/lab";
import { useMemo } from "react";

const TokenBasicInfo = () => {
  const { tokenInfo, balance } = useErc20Context();
  const { address } = useAccount();

  const { data: isFaucetRequested } = useContractRead({
    address: FAUCET_CONTRACT_ADDR,
    abi: MTT_FAUCET_ABI,
    functionName: "requestedAddress",
    args: [address || "0x"],
    enabled: !!address,
  }) as any;
  console.log("isFaucetRequested:", isFaucetRequested);

  const { config } = usePrepareContractWrite({
    address: FAUCET_CONTRACT_ADDR,
    abi: MTT_FAUCET_ABI,
    functionName: "requestTokens",
  });
  // 得写新的Provider了

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  console.log(isLoading, data);

  const faucetButtonText = useMemo(() => {
    if (!address) {
      return `Please connect wallet first`;
    }
    return isFaucetRequested ? "Already Received" : "Receive";
  }, [address, isFaucetRequested]);

  return (
    <Card sx={{ p: 3, mt: 3 }}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Typography variant="h5">Token Contract </Typography>
          <Box
            gap={2}
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
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h5">Token Balance</Typography>
          <Typography variant="body1">
            {balance || 0} {tokenInfo?.symbol}
          </Typography>
        </Stack>
        {tokenInfo && (
          <Stack spacing={2} sx={{ width: "50%" }}>
            <Typography variant="h5">Faucet</Typography>
            <Alert severity="info">
              The same wallet address can only receive 10{tokenInfo.symbol} test
              coins.
            </Alert>
            <LoadingButton
              loading={isLoading}
              onClick={write}
              disabled={isFaucetRequested || !address}
            >
              {faucetButtonText}
            </LoadingButton>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default TokenBasicInfo;
