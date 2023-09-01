import { Card, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { RHFTextField } from "@/src/components/hook-form";
import FormProvider from "@/src/components/hook-form/FormProvider";
import { useErc20Context } from "../Erc20Provider";
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ERC20_CONTRACT_ADDR } from "@/src/constants/wallet";
import MTT_ERC20_ABI from "src/constants/abi/MTT_ERC20.abi.json";
import { tokenTransferSchema } from "@/src/constants/schema";
import { formatUnits, isAddress, parseUnits } from "ethers/lib/utils";

const TokenTransfer = () => {
  const { tokenInfo, ERC20ContractParams } = useErc20Context();
  const methods = useForm<{
    targetAddress: string;
    amount: string;
  }>({
    resolver: yupResolver(tokenTransferSchema),
    defaultValues: { targetAddress: "", amount: "0" },
  });

  const { watch, setValue, handleSubmit } = methods;
  const values = watch();
  const { targetAddress, amount } = values;

  const { data, isLoading, write } = useContractWrite({
    address: ERC20_CONTRACT_ADDR,
    abi: MTT_ERC20_ABI,
    functionName: "transfer",
  });

  const { isSuccess, isLoading: isTxLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  const [queryAddress, setQueryAddress] = useState("");
  const { data: queryBalance } = useContractRead({
    ...ERC20ContractParams,
    functionName: "balanceOf",
    args: [queryAddress],
    enabled: isAddress(queryAddress),
  }) as any;

  const queryBalanceFormatted = queryBalance
    ? formatUnits(queryBalance, tokenInfo?.decimals)
    : 0;

  async function onSubmit() {
    write &&
      write({
        args: [targetAddress, parseUnits(amount, tokenInfo?.decimals)],
      });
  }

  useEffect(() => {
    if (isSuccess) {
      setValue("amount", "");
      toast.success("successfully transferred");
    }
  }, [isSuccess]);

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5"> Transfer </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <RHFTextField
            placeholder="Target address"
            size="small"
            name="targetAddress"
          ></RHFTextField>
          <RHFTextField
            placeholder="amount (MTT unit)"
            size="small"
            name="amount"
          ></RHFTextField>
          <LoadingButton
            loading={isLoading || isTxLoading}
            variant="contained"
            type="submit"
          >
            transfer
          </LoadingButton>
        </Stack>
      </FormProvider>

      <Stack spacing={2} sx={{ mt: 5 }}>
        <Typography variant="h5"> Query Balance </Typography>
        <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
          <TextField
            sx={{ flex: 1 }}
            size="small"
            label="Target address "
            value={queryAddress}
            onChange={e => {
              setQueryAddress(e.target.value);
            }}
          />
        </Stack>
        <Typography variant="body1">{`${queryBalanceFormatted} MTT`}</Typography>
      </Stack>
    </Card>
  );
};

export default TokenTransfer;
