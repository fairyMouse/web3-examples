import {
  Button,
  Card,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { LoadingButton } from "@mui/lab";

import BridgeFrom from "./components/BridgeFrom";
import BridgeTo from "./components/BridgeTo";
import { ArrowDown, XIcon } from "lucide-react";
import FormProvider from "src/components/hook-form/FormProvider";
import BridgeProvider, { useBridgeProviderContext } from "./BridgeProvider";
import { BridgeTxDirectionEnum } from "./types";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { formatEther, parseEther } from "ethers/lib/utils";
import { ETH_L1_ADDRESS } from "src/constants/address";

import { useEffect, useMemo, useState } from "react";
import BridgeTxItem from "./components/BridgeTxItem";
import EthereumSvg from "@icons/blockchain/ethereum.svg";
import { useEraProviderStore } from "./hooks/useEraProviderStore";
import { useZksyncEraProviderContext } from "./ZksyncEraProvider";

const tabs = [
  {
    label: "Deposit",
    value: BridgeTxDirectionEnum.DEPOSIT,
  },
  {
    label: "Withdraw",
    value: BridgeTxDirectionEnum.WITHDRAW,
  },
];

const BridgeTxForm = () => {
  const { palette } = useTheme();
  const { address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const [currentTx, setCurrentTx] = useState<any>(null);

  const {
    maxFee,
    averageFee,
    eraL1Signer,
    voidL1Signer,
    fullDepositFee,
    tokenFrom,
    methods,
    txDirection,
    isDeposit,
    isWithdraw,
    setTxDirection,
    isCorrectNetworkSet,
    updateDepositFee,
  } = useBridgeProviderContext();
  const { eraNetwork } = useEraProviderStore();

  const correctNetworkName = isDeposit
    ? eraNetwork?.l1Network?.name
    : eraNetwork?.name;
  const correctNetworkId = isDeposit
    ? eraNetwork?.l1Network?.id
    : eraNetwork?.id;
  console.log("eraNetwork:", eraNetwork);
  console.log("isCorrectNetworkSet:", isCorrectNetworkSet, correctNetworkName);

  const { eraL2Signer, maxWithdrawFee, updateWithdrawFee } =
    useZksyncEraProviderContext();
  const [actionStatus, setActionStatus] = useState("idle");
  const { watch, setValue, handleSubmit } = methods;
  const values = watch();
  const { amount } = values;
  // console.log(formatEther("782081502687274") * 1500); // $1.17

  async function makeTransaction() {
    setActionStatus("start");
    if (
      isDeposit &&
      fullDepositFee &&
      eraL1Signer &&
      address &&
      tokenFrom?.l1Address
    ) {
      try {
        const depositParams = {
          to: address,
          token: tokenFrom.l1Address,
          amount: amount ? parseEther(amount).toString() : "0",
          l2GasLimit: fullDepositFee.l2GasLimit,
          overrides: {
            gasLimit: fullDepositFee.l1GasLimit,
            maxFeePerGas: fullDepositFee.maxFeePerGas,
            maxPriorityFeePerGas: fullDepositFee.maxPriorityFeePerGas,
          },
        };
        console.log("depositParams:", depositParams);

        setActionStatus("pending");
        const depositResponse = await eraL1Signer.deposit(depositParams);
        console.log("depositResponse:", depositResponse);

        setValue("amount", "");
        setOpen(true);
        setCurrentTx({
          type: "deposit",
          openL1Explorer: true,
          transactionHash: depositResponse.hash,
          amount: depositResponse.value.toString(),
        });
      } catch (error: any) {
        console.error(error.message);
      }
    }
    if (isWithdraw) {
      const withdrawParams = {
        to: address,
        amount: amount ? parseEther(amount).toString() : "0",
        token: ETH_L1_ADDRESS,
        // overrides: {
        //   gasLimit: fullDepositFee.l2GasLimit,
        //   gasPrice: fullDepositFee.gasPrice,
        // },
      };
      if (eraL2Signer?.withdraw) {
        console.log("withdraw:", withdrawParams);
        setActionStatus("pending");
        const withdrawRes = await eraL2Signer.withdraw(withdrawParams);
        console.log("withdrawRes:", withdrawRes);

        setValue("amount", "");
        setOpen(true);
        setCurrentTx({
          type: "withdrawal",
          transactionHash: withdrawRes.hash,
          amount: withdrawRes.value.toString(),
        });
      }
    }

    setActionStatus("idle");
  }

  const actionText = useMemo(() => {
    if (!isCorrectNetworkSet) {
      return `Change wallet network to ${correctNetworkName}`;
    }
    switch (actionStatus) {
      case "start":
        return "";
      case "pending":
        return "Waiting for confirmation";
    }

    return txDirection === BridgeTxDirectionEnum.DEPOSIT
      ? "Deposit"
      : "Withdraw";
  }, [txDirection, actionStatus, isCorrectNetworkSet, correctNetworkName]);

  const actionDisabled = useMemo(() => {
    if (!address) {
      return true;
    }
    if (!isCorrectNetworkSet) {
      return false;
    }

    return Number(amount) <= 0 || actionStatus !== "idle";
  }, [amount, actionStatus, isCorrectNetworkSet, address]);

  const [open, setOpen] = useState(false);

  const updateSeconds = 60;
  const [timeLeft, setTimeLeft] = useState(updateSeconds);

  useEffect(() => {
    if (timeLeft > 0 && address) {
      const timerId = setTimeout(() => {
        const next = timeLeft - 1;
        if (next === 0) {
          isDeposit ? updateDepositFee() : updateWithdrawFee();
          setTimeLeft(updateSeconds);
        } else {
          setTimeLeft(next);
        }
      }, 1000);

      return () => clearTimeout(timerId); // 在组件卸载或重新渲染时清除定时器
    }
  }, [timeLeft, isDeposit, address, updateDepositFee, updateWithdrawFee]);

  const progressValue = (updateSeconds - timeLeft) * (100 / updateSeconds);

  return (
    <FormProvider methods={methods}>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#2C2D2E",
          },
        }}
      >
        <Stack alignItems={"center"} sx={{ position: "relative", mt: 4 }}>
          <EthereumSvg width={58} height={58} />
          <Typography variant="h4">
            Transaction submitted on {isDeposit ? "L1" : "L2"}
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: 20,
              top: -20,
            }}
          >
            <XIcon size={20} />
          </IconButton>
        </Stack>
        <DialogContent sx={{ pb: 4, mt: 3 }}>
          {currentTx && <BridgeTxItem data={currentTx} />}
          <Stack
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
            sx={{ mt: 3 }}
          >
            <CircularProgress />
            <Typography variant="body1">
              Processing On{" "}
              {isDeposit ? eraNetwork.name : eraNetwork.l1Network?.name}
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
      <Card sx={{ width: 560, p: 4 }}>
        <Stack
          sx={{ width: "100%", height: "100%" }}
          alignItems={"center"}
          spacing={1}
        >
          <Stack
            flexDirection={"row"}
            sx={{ borderRadius: 100, bgcolor: alpha("#000", 0.16), p: "4px" }}
          >
            {tabs.map(tab => {
              const isActive = tab.value === txDirection;
              return (
                <Button
                  key={tab.value}
                  sx={{ borderRadius: 100, width: 90 }}
                  variant={isActive ? "soft" : "text"}
                  onClick={() => {
                    setTxDirection(tab.value);
                  }}
                >
                  {tab.label}
                </Button>
              );
            })}
          </Stack>

          <BridgeFrom />

          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 48,
              bgcolor: "#2F2A2C",
              // cursor: "pointer",
            }}
          >
            <ArrowDown size={24} color={palette.primary.main} />
          </Stack>
          {/* <IconButton
            onClick={() => {
              if (txDirection === BridgeTxDirectionEnum.DEPOSIT) {
                setTxDirection(BridgeTxDirectionEnum.WITHDRAW);
              } else {
                setTxDirection(BridgeTxDirectionEnum.DEPOSIT);
              }
            }}
          >
     
          </IconButton> */}

          <BridgeTo />

          <Stack
            sx={{ width: "100%" }}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack spacing={1}>
              <Stack flexDirection={"row"} gap={1} alignSelf={"flex-start"}>
                <Typography variant="body1">Maximum execution fees:</Typography>
                <Typography variant="body1">
                  {isCorrectNetworkSet
                    ? formatEther(isDeposit ? maxFee : maxWithdrawFee || "0")
                    : 0}{" "}
                  ETH
                </Typography>
              </Stack>

              {isDeposit && (
                <Stack flexDirection={"row"} gap={1} alignSelf={"flex-start"}>
                  <Typography variant="body1">Estimated gas fees:</Typography>
                  <Typography variant="body1">
                    {isCorrectNetworkSet ? formatEther(averageFee || "0") : 0}{" "}
                    ETH
                  </Typography>
                </Stack>
              )}
            </Stack>
            {address && isCorrectNetworkSet && (
              <Tooltip title="Updating fee every 60 seconds">
                <CircularProgress
                  variant="determinate"
                  size={32}
                  value={progressValue}
                />
              </Tooltip>
            )}
          </Stack>

          {!address && (
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={1}
              sx={{
                height: 48,
                width: "100%",
                borderRadius: "6px",
                bgcolor: theme => alpha(theme.palette.error.main, 0.16),
              }}
            >
              <ErrorIcon color="error" />
              <Typography variant="body2" color={"error"}>
                Please link your wallet first
              </Typography>
            </Stack>
          )}
        </Stack>
        <Stack sx={{ mt: 3 }} spacing={3} alignItems={"center"}>
          <LoadingButton
            sx={{ width: "100%" }}
            size={"large"}
            disabled={actionDisabled}
            onClick={e => {
              if (!isCorrectNetworkSet && correctNetworkId && switchNetwork) {
                switchNetwork(correctNetworkId);
              } else {
                makeTransaction();
                // handleSubmit(makeTransaction)(e);
              }
            }}
          >
            {actionText}
          </LoadingButton>
          <Stack flexDirection={"row"} gap={1}>
            <InfoRoundedIcon color={"primary"} />
            <Typography variant="body1">
              Powered by Zksync Era Official Bridge
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  );
};

export default BridgeTxForm;
