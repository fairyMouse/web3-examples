import { Card, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { IMyTokenInfo } from '../types';
import { myContractAddr } from 'src/constants/wallet';
import { ethers } from 'ethers';
import { useErc20Context } from '@/pages/erc20';

const TokenBasicInfo = () => {
  const { tokenInfo } = useErc20Context();

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4">Basic Info</Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Typography variant="body1">
          Contract Address: {myContractAddr}
        </Typography>

        <Typography variant="body1">
          Token Name: {tokenInfo?.name || ''}
        </Typography>
        <Typography variant="body1">
          Token Symbol: {tokenInfo?.symbol || ''}
        </Typography>
        <Typography variant="body1">
          Token Decimals: {tokenInfo?.decimals || ''}
        </Typography>
      </Stack>
    </Card>
  );
};

export default TokenBasicInfo;
