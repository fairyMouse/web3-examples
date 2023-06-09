import { useErc20Context } from '@/pages/erc20';
import { LoadingButton } from '@mui/lab';
import { Alert, Card, Stack, Typography } from '@mui/material';

const TokenFaucet = () => {
  const { tokenInfo } = useErc20Context();
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4"> Faucet </Typography>

      {tokenInfo && (
        <Stack sx={{ mt: 2 }} spacing={2}>
          <Alert severity="info">
            The same wallet address can only receive 10{tokenInfo.symbol} test
            coins.
          </Alert>
          <LoadingButton>Receive</LoadingButton>
        </Stack>
      )}
    </Card>
  );
};

export default TokenFaucet;
