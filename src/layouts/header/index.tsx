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
import { Network } from "ethers";
import { useEffect, useState } from "react";
import Iconify from "@/src/components/iconify/Iconify";

const Header = () => {
  const { ethersProvider } = useWalletContext();
  const [buttonText, setButtonText] = useState("");

  const [network, setNetwork] = useState<Network | null>(null);

  useEffect(() => {
    if (ethersProvider) {
      ethersProvider.getNetwork().then(res => {
        setNetwork(res);
      });
    }
  }, [ethersProvider]);

  console.log("network:", network);
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
        {/* <Stack sx={{ width: 200, mt: 5 }}>
            {account ? (
              <Button
                variant="outlined"
                onClick={walletDisconnect}
                onMouseEnter={() => setButtonText("disconnect")}
                onMouseLeave={() => setButtonText(account)}
              >
                {`${buttonText.slice(0, 4)}...${buttonText.slice(-4)}`}
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
          </Stack> */}
      </Stack>
    </AppBar>
  );
};

export default Header;
