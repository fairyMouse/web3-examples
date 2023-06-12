import { useErc20Context } from '@/pages/erc20';
import { LoadingButton } from '@mui/lab';
import { Alert, Card, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const TokenAirdrop = () => {
  const {
    account,
    tokenInfo,
    faucetProviderContract,
    faucetSignerContract,
    updateMyBalance,
  } = useErc20Context();

  const [authorizedAmountInput, setApprovedAmountInput] = useState('');

  const changeApprovedAmount = () => {
    console.log('changeApprovedAmount');
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4"> Airdrop </Typography>

      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack spacing={1}>
          <Typography variant="subtitle1">
            {' '}
            Approval
            {/* 加个tooltip解释下 */}
          </Typography>
          <Stack flexDirection={'row'} gap={1}>
            {/* <Typography variant="body1">Approved amount:</Typography> */}
            <TextField
              sx={{ flex: 1 }}
              size="small"
              // disabled 后面当authorizedAmountInput和当前真实授权额度一样的时候可以disable
              label="Approved amount"
              value={authorizedAmountInput}
              onChange={e => {
                setApprovedAmountInput(e.target.value);
              }}
            />

            <LoadingButton onClick={changeApprovedAmount}>Change</LoadingButton>
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle1"> Airdrop </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default TokenAirdrop;
