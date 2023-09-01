import { HEADER, NAV } from "@/src/constants/layouts";
import { useWalletContext } from "@/src/provider/WalletProvider";
import { LoadingButton } from "@mui/lab";
import EthereumSvg from "@icons/blockchain/ethereum.svg";
import {
  AppBar,
  Box,
  Button,
  Stack,
  Typography,
  capitalize,
} from "@mui/material";
import { useEffect, useState } from "react";
import Iconify from "@/src/components/iconify/Iconify";
import { toast } from "react-toastify";
import { Network } from "hardhat/types";

const Header = () => {
  const { ethersProvider, account, setAccount } = useWalletContext();

  const disconnectText = "disconnect";
  const [buttonText, setButtonText] = useState("");
  const [connecting, setConnecting] = useState(false);

  const [network, setNetwork] = useState<Network | null>(null);
  console.log("network:", network);

  useEffect(() => {
    if (ethersProvider) {
      ethersProvider.getNetwork().then((res: any) => {
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
    console.log("ethersProvider:", ethersProvider);
    if (ethersProvider) {
      try {
        const accounts = await ethersProvider.send("eth_requestAccounts", []);

        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
        toast.error("failed to connect to metamask");
      }
    }

    setConnecting(false);
  };

  const walletDisconnect = () => {
    setAccount("");
  };
  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MAIN_DESKTOP,
        px: 5,
        width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
        bgcolor: "background.default",
      }}
    >
      <Stack
        sx={{ height: "100%", color: "text.primary" }}
        flexDirection={"row"}
        alignItems={"center"}
        gap={2}
      >
        <Box sx={{ flexGrow: 1 }}></Box>
        {network && (
          <Button
            variant="outlined"
            startIcon={<EthereumSvg />}
            endIcon={<Iconify icon="eva:chevron-down-fill" />}
          >
            {capitalize(network.name)}
          </Button>
        )}
        <Stack sx={{ width: 200 }}>
          {account ? (
            <Button
              variant="outlined"
              onClick={walletDisconnect}
              onMouseEnter={() => setButtonText(disconnectText)}
              onMouseLeave={() => setButtonText(account)}
            >
              {buttonText === disconnectText
                ? disconnectText
                : `${buttonText.slice(0, 6)}...${buttonText.slice(-4)}`}
            </Button>
          ) : (
            <LoadingButton
              variant="contained"
              loading={connecting}
              onClick={connectToMetamask}
            >
              connect metamask
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default Header;
