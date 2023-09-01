import {
  Box,
  Button,
  Divider,
  ListItemButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAccount } from "wagmi";
import { RHFTextField } from "@/src/components/hook-form";
import MenuPopover from "@/src/components/menu-popover/MenuPopover";
import { useBridgeProviderContext } from "../BridgeProvider";
import { useZksyncEraProviderContext } from "../ZksyncEraProvider";
import { formatEther } from "ethers/lib/utils";

const BridgeFrom = () => {
  const { methods, maxFee, isDeposit, tokens, tokenFrom, setTokenFrom } =
    useBridgeProviderContext();
  const { l1Balance, l2Balance } = useZksyncEraProviderContext();
  const { address } = useAccount();

  const balance = isDeposit ? l1Balance : l2Balance;

  const { watch, setValue } = methods;
  const values = watch();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const currentToken = tokens.find(t => t.address === tokenFrom?.address);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Typography variant="h5">From</Typography>
      <Stack flexDirection={"row"} gap={2} alignItems={"flex-start"}>
        <Stack spacing={1}>
          <Stack
            gap={2}
            flexDirection={"row"}
            alignItems={"center"}
            sx={{
              height: 64,
              borderRadius: "8px",
              p: 2,
              bgcolor: "background.neutral",
            }}
          >
            <Typography variant="body1">
              {isDeposit ? "Ethereum" : "Zksync Era"}
            </Typography>
            <Box sx={{ width: "1px", height: 32, bgcolor: "divider" }}></Box>
            <RHFTextField
              name="amount"
              size="small"
              type="number"
              disabled={!address}
              sx={{
                flex: 1,
                textAlign: "center",
                "& .MuiOutlinedInput-root": {
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              placeholder="0.0"
            />
            <Button
              variant="text"
              onClick={() => {
                setValue(
                  "amount",
                  (Number(balance) - Number(formatEther(maxFee))).toString()
                );
              }}
            >
              Max
            </Button>
          </Stack>

          <Typography
            variant="body2"
            color={"text.secondary"}
            sx={{ alignSelf: "flex-end" }}
          >
            Balance: {balance} ETH
          </Typography>
        </Stack>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
          sx={{
            minWidth: 132,
            height: 64,
            borderRadius: "8px",
            p: 2,
            bgcolor: "background.neutral",
          }}
        >
          <Button
            onClick={handleOpenPopover}
            variant="text"
            color="inherit"
            startIcon={
              <img src={currentToken?.iconUrl || ""} width={24} height={24} />
            }
            endIcon={<ChevronDown size={20} />}
          >
            {currentToken?.symbol}
          </Button>
          <MenuPopover
            disabledArrow
            open={openPopover}
            onClose={handleClosePopover}
            sx={{ minWidth: 152, p: 1 }}
          >
            {tokens.map(token => {
              return (
                <ListItemButton
                  key={token.address}
                  onClick={() => {
                    setTokenFrom(token);
                    handleClosePopover();
                  }}
                >
                  <img src={token?.iconUrl || ""} width={24} height={24} />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {token.symbol}
                  </Typography>
                </ListItemButton>
              );
            })}
          </MenuPopover>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BridgeFrom;
