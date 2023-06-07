import { Button, Container, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
// import MyTokenWalletTransfer from './components/MyTokenWalletTransfer';
import MyTokenWalletDetails from './components/MyTokenWalletDetails';
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
    <Stack>
      <Stack className="flex-row-cc">
        {account ? (
          <Button
            variant="outlined"
            size="large"
            sx={{
              width: '50%',
              ml: 2,
            }}
            onClick={walletDisconnect}
            onMouseEnter={() => setButtonText('disconnect')}
            onMouseLeave={() => setButtonText(account)}
          >
            {buttonText}
          </Button>
        ) : (
          <LoadingButton
            size="large"
            variant="contained"
            loading={connecting}
            onClick={connectToMetamask}
          >
            connect metamask
          </LoadingButton>
        )}
      </Stack>
      {account && <MyTokenWalletDetails />}
      {/* {account && <MyTokenWalletTransfer />} */}
    </Stack>
  );
};

export default Erc20Index;
