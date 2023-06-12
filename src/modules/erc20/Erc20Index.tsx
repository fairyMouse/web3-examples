import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useEffect, useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import TokenTransfer from './components/TokenTransfer';
import TokenBasicInfo from './components/TokenBasicInfo';
import { useErc20Context } from '@/pages/erc20';
import TokenFaucet from './components/TokenFaucet';
import { Network } from 'ethers';
import TokenAirdrop from './components/TokenAirdrop';

const Erc20Index = () => {
  const { account, setAccount, ethersProvider } = useErc20Context();
  const [buttonText, setButtonText] = useState('');
  const [connecting, setConnecting] = useState(false);

  const [network, setNetwork] = useState<Network | null>(null);

  useEffect(() => {
    if (ethersProvider) {
      ethersProvider.getNetwork().then(res => {
        setNetwork(res);
      });
    }
  }, [ethersProvider]);

  useEffect(() => {
    setButtonText(account);
  }, [account]);

  useEffect(() => {
    connectToMetamask();
  }, [ethersProvider]);

  const connectToMetamask = async () => {
    setConnecting(true);
    if (ethersProvider) {
      try {
        const accounts = await ethersProvider.send('eth_requestAccounts', []);

        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
        toast.error('failed to connect to metamask');
      }
    }

    setConnecting(false);
  };

  const walletDisconnect = () => {
    setAccount('');
  };

  return (
    <Container>
      <Stack alignItems={'center'} spacing={2}>
        <Stack sx={{ width: 500, mt: 5 }}>
          {account ? (
            <Button
              variant="outlined"
              onClick={walletDisconnect}
              onMouseEnter={() => setButtonText('disconnect')}
              onMouseLeave={() => setButtonText(account)}
            >
              {buttonText}
            </Button>
          ) : (
            <LoadingButton
              variant="contained"
              loading={connecting}
              onClick={connectToMetamask}
            >
              connect metamask to see more
            </LoadingButton>
          )}
        </Stack>
        {network && (
          <Stack flexDirection={'row'} gap={1}>
            <Typography variant="subtitle1">Network: </Typography>
            <Typography variant="body2">{network.name}</Typography>
          </Stack>
        )}
      </Stack>
      <Box
        gap={3}
        sx={{ mt: 5 }}
        display="grid"
        gridTemplateColumns={{
          sm: 'repeat(1, 1fr)',
          lg: 'repeat(2, 1fr)',
        }}
      >
        <TokenBasicInfo />
        {account && <TokenTransfer />}
        {account && <TokenFaucet />}
        {account && <TokenAirdrop />}
      </Box>
    </Container>
  );
};

export default Erc20Index;
