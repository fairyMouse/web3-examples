import { Card, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { IMyTokenInfo } from '../types';
import { myContractAddr } from 'src/constants/wallet';
import { ethers } from 'ethers';
import { useErc20Context } from '@/pages/erc20';

const MyTokenWalletDetails = () => {
  const { providerContract } = useErc20Context();

  const [tokenInfo, setTokenInfo] = useState<IMyTokenInfo | null>(null);

  useEffect(() => {
    initToken();
  }, [providerContract]);

  async function initToken() {
    if (providerContract) {
      const symbol = await providerContract.symbol();
      const name = await providerContract.name();
      const decimals = await providerContract.decimals();
      setTokenInfo({
        name,
        symbol,
        decimals,
      });
    }
  }

  return (
    <Card sx={{ p: 3, mt: 5 }}>
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

export default MyTokenWalletDetails;
