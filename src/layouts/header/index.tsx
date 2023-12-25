import { HEADER, NAV } from "@/src/constants/layouts"

import { LoadingButton } from "@mui/lab"
import EthereumSvg from "@icons/blockchain/ethereum.svg"
import {
  AppBar,
  Box,
  Button,
  Stack,
  Typography,
  capitalize,
} from "@mui/material"
import MetamaskSvg from "public/icons/common/metamask.svg"
import { useEffect, useState } from "react"
import Iconify from "@/src/components/iconify/Iconify"
import { toast } from "react-toastify"
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi"
import { InjectedConnector } from "@wagmi/core"
import { shortenAddress } from "@/src/utils/formatters"

const Header = () => {
  const { address, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  })
  const { chain } = useNetwork()
  const disconnectText = "disconnect"
  const [buttonText, setButtonText] = useState("")

  useEffect(() => {
    setButtonText(address || "")
  }, [address])

  const walletDisconnect = () => {
    disconnect()
  }
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
        {chain && (
          <Button
            variant="outlined"
            startIcon={<EthereumSvg />}
            endIcon={<Iconify icon="eva:chevron-down-fill" />}
          >
            {capitalize(chain.name)}
          </Button>
        )}
        <Stack sx={{ width: 200 }}>
          {address ? (
            <Button
              variant="outlined"
              startIcon={<MetamaskSvg width={20} height={20} />}
              onClick={walletDisconnect}
              onMouseEnter={() => setButtonText(disconnectText)}
              onMouseLeave={() => setButtonText(address)}
            >
              {buttonText === disconnectText
                ? disconnectText
                : `${shortenAddress(buttonText)}`}
            </Button>
          ) : (
            <LoadingButton
              variant="contained"
              loading={isConnecting}
              onClick={() => connect()}
            >
              Connect to Wallet
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </AppBar>
  )
}

export default Header
