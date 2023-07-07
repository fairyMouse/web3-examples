import { useErc20Context } from "@/pages/erc20";
import handleError from "@/src/utils/handleError";
import { LoadingButton } from "@mui/lab";
import { Alert, Card, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const TokenFaucet = () => {
  const {
    account,
    tokenInfo,
    faucetProviderContract,
    faucetSignerContract,
    updateMyBalance,
  } = useErc20Context();

  const [faucetReceived, setFaucetReceived] = useState(false);
  const [receiving, setReceiving] = useState(false);

  useEffect(() => {
    updateFaucetReceiveState();
  }, [faucetProviderContract]);

  async function updateFaucetReceiveState() {
    if (faucetProviderContract) {
      const res = await faucetProviderContract.requestedAddress(account);

      setFaucetReceived(res);
    }
  }

  async function receiveCoins() {
    console.log("receiveCoins");
    setReceiving(true);
    if (faucetSignerContract) {
      try {
        const res = await faucetSignerContract.requestTokens();
        console.log("请求水龙头结果:", res);
        const receipt = await res.wait();
        console.log("请求水龙头收据信息:", receipt);

        updateFaucetReceiveState();
        updateMyBalance();
      } catch (error: any) {
        handleError(error);
      }
    }
    setReceiving(false);
  }

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4"> Faucet </Typography>

      {tokenInfo && (
        <Stack sx={{ mt: 2 }} spacing={2}>
          <Alert severity="info">
            The same wallet address can only receive 10{tokenInfo.symbol} test
            coins.
          </Alert>
          <LoadingButton
            loading={receiving}
            onClick={receiveCoins}
            disabled={faucetReceived}
          >
            {faucetReceived ? "Already Received" : "Receive"}
          </LoadingButton>
        </Stack>
      )}
    </Card>
  );
};

export default TokenFaucet;
