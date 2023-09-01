import { Stack, Typography, useTheme } from "@mui/material";

import dayjs from "dayjs";
import { ArrowRight, Copy, CornerRightUp, Divide } from "lucide-react";

import { useEraProviderStore } from "../hooks/useEraProviderStore";
import { formatEther } from "ethers/lib/utils";

const BridgeTxItem = (props: { data: any }) => {
  const {
    data: { type, transactionHash, openL1Explorer, amount, timestamp },
  } = props;
  const { eraNetwork } = useEraProviderStore();
  console.log("eraNetwork:", eraNetwork);

  const nameFrom = type === "withdrawal" ? "Zksync Era" : "Ethereum";
  const nameTo = type === "withdrawal" ? "Ethereum" : "Zksync Era";

  return (
    <Stack
      spacing={1}
      onClick={() => {
        window.open(
          `${
            openL1Explorer
              ? eraNetwork.l1Network?.blockExplorers?.default.url
              : `https://zksync-era.l2scan.co/`
            // :  eraNetwork.blockExplorerUrl
          }/tx/${transactionHash}`,
          "_blank"
        );
      }}
      sx={{
        px: "16px",
        py: "12px",
        background: "#1D1E1F",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "background.neutral",
          boxShadow: theme => theme.customShadows.z20,
        },
      }}
    >
      <Stack flexDirection={"row"} alignItems={"center"}>
        <Typography variant="body1">{nameFrom}</Typography>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            mx: "12px",
            width: 24,
            height: 24,
            borderRadius: 24,
            bgcolor: "#2C2D2E",
          }}
        >
          <ArrowRight color="#007AF5" size={16} />
        </Stack>
        <Typography variant="body1">{nameTo}</Typography>
        <Stack flexDirection={"row"} sx={{ ml: "auto" }} alignItems={"center"}>
          <CornerRightUp size={20} />
        </Stack>
      </Stack>
      <Stack flexDirection={"row"} alignItems={"center"}>
        <Typography variant="h5">{formatEther(amount)} ETH</Typography>
        {timestamp && (
          <Typography
            variant="body2"
            color={"rgba(255, 255, 255, 0.45)"}
            sx={{ ml: "auto" }}
          >
            {dayjs(timestamp).format("MMM D YYYY, HH:mm")}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
export default BridgeTxItem;
