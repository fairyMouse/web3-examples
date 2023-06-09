import { Box, Button, Container, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import TokenTransfer from './components/TokenTransfer';
import TokenBasicInfo from './components/TokenBasicInfo';
import { useErc20Context } from '@/pages/erc20';

const Erc20Index = () => {
  const { account, setAccount, walletProvider } = useErc20Context();
  const [buttonText, setButtonText] = useState('');
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    setButtonText(account);
  }, [account]);

  const connectToMetamask = async () => {
    setConnecting(true);
    if (walletProvider) {
      try {
        const accounts = await walletProvider.send('eth_requestAccounts', []);

        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
        toast.error('failed to connect to metamask');
      }
    } else {
      toast.error("walletProvider doesn't exist ");
    }
    setConnecting(false);
  };

  const walletDisconnect = () => {
    setAccount('');
  };

  return (
    <Container>
      <Stack className="flex-row-cc">
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
      </Stack>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          sm: 'repeat(1, 1fr)',
          lg: 'repeat(2, 1fr)',
        }}
      >
        <TokenBasicInfo />
        {account && <TokenTransfer />}
      </Box>
    </Container>
  );
};

export default Erc20Index;
