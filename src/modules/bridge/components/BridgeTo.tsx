import { RHFSelect, RHFTextField } from "src/components/hook-form";

import { Box, Stack, Typography } from "@mui/material";
import { useBridgeProviderContext } from "../BridgeProvider";
import { useZksyncEraProviderContext } from "../ZksyncEraProvider";

const BridgeTo = () => {
  const { methods, isDeposit } = useBridgeProviderContext();
  const { l1Balance, l2Balance } = useZksyncEraProviderContext();
  const { watch, setValue } = methods;
  const values = watch();

  const balance = isDeposit ? l2Balance : l1Balance;

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Typography variant="h5">To</Typography>
      <Stack flexDirection={"row"} gap={2} alignItems={"flex-start"}>
        <Stack spacing={1} sx={{ width: "100%" }}>
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
              {isDeposit ? "Zksync Era" : "Ethereum"}
            </Typography>
            <Box sx={{ width: "1px", height: 32, bgcolor: "divider" }}></Box>
            <RHFTextField
              name="amount"
              size="small"
              disabled
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
            <Typography variant="body1">ETH</Typography>
          </Stack>

          <Typography
            variant="body2"
            color={"text.secondary"}
            sx={{ alignSelf: "flex-end" }}
          >
            Balance:{balance} ETH
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BridgeTo;
