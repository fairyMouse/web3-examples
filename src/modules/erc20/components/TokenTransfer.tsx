import * as Yup from "yup";
import { Card, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { RHFTextField } from "@/src/components/hook-form";
import { useErc20Context } from "src/provider/Erc20Provider";
import FormProvider from "@/src/components/hook-form/FormProvider";
import handleError from "@/src/utils/handleError";

const TokenTransfer = () => {
  const {
    account,
    tokenInfo,
    erc20ProviderContract,
    balance,
    myBalanceLoading,
    updateMyBalance,
    erc20SignerContract,
    ethersProvider,
  } = useErc20Context();

  useEffect(() => {
    updateMyBalance();
  }, [account, tokenInfo, erc20ProviderContract]);

  useEffect(() => {
    if (erc20ProviderContract) {
      const fromMe = erc20ProviderContract.filters.Transfer(account, null);
      const toMe = erc20ProviderContract.filters.Transfer(null, account);

      // 监听我给别人转账事件
      erc20ProviderContract.on(fromMe, payload => {
        console.log("我给别人转账了:", payload);
      });
      // 监听别人给我转账事件
      erc20ProviderContract.on(toMe, payload => {
        console.log("别人给我转账了:", payload);
      });

      return () => {
        erc20ProviderContract.removeAllListeners(fromMe);
        erc20ProviderContract.removeAllListeners(toMe);
      };
    }
  }, [account, erc20ProviderContract]);

  const [transferring, setTransferring] = useState<boolean>(false);

  const schema = Yup.object().shape({
    targetAddress: Yup.string().required("target address is required"),
    amount: Yup.string().required("amount is required"),
  });

  const methods = useForm<{
    targetAddress: string;
    amount: string;
  }>({
    resolver: yupResolver(schema),
    defaultValues: { targetAddress: "", amount: "0" },
  });

  const { watch, setValue, handleSubmit } = methods;
  const values = watch();

  async function onSubmit() {
    console.log("values:", values);
    const { targetAddress, amount } = values;
    if (ethersProvider && erc20SignerContract && tokenInfo) {
      try {
        setTransferring(true);
        const value = ethers.parseUnits(amount, tokenInfo.decimals); // 精度需要自己指定的

        const res = await erc20SignerContract.transfer(targetAddress, value);
        console.log("交易结果信息:", res);
        const receipt = await res.wait();
        console.log("交易收据信息:", receipt);

        updateMyBalance();
        setValue("amount", "");
        toast.success("successfully transferred");
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
      } finally {
        setTransferring(false);
      }
    }
  }

  const [amountInput, setAmountInput] = useState("");
  const [targetBalanceLoading, setTargetBalanceLoading] = useState(false);
  const [targetBalance, setTargetBalance] = useState("");

  const queryTargetBalance = async (targetAccount: string) => {
    if (erc20ProviderContract && tokenInfo) {
      try {
        setTargetBalanceLoading(true);
        const res = await erc20ProviderContract.balanceOf(targetAccount);

        const tokenBalance = ethers.formatUnits(res, tokenInfo.decimals);
        setTargetBalance(tokenBalance);
      } catch (error: any) {
        handleError(error);
        setTargetBalance("");
      } finally {
        setTargetBalanceLoading(false);
      }
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4"> Transfer </Typography>

      <Stack flexDirection={"row"} alignItems={"center"} sx={{ mt: 2 }}>
        <Typography variant="body1">
          Current Balance: {`${balance || 0} MTT`}
        </Typography>

        {/* 这里可以做成监听我给别人转账、别人给我转账来自动更新，但我感觉还是有个手动刷新比较放心 */}
        <LoadingButton
          size="small"
          variant="outlined"
          sx={{ ml: "auto" }}
          onClick={updateMyBalance}
          loading={myBalanceLoading}
        >
          refresh
        </LoadingButton>
      </Stack>

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
            loading={transferring}
            variant="contained"
            type="submit"
          >
            transfer
          </LoadingButton>
        </Stack>
      </FormProvider>

      <Stack spacing={1} sx={{ mt: 3 }}>
        <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
          <TextField
            sx={{ flex: 1 }}
            size="small"
            label="Enter target address"
            placeholder="Query the balance of the specified address"
            value={amountInput}
            onChange={e => {
              setAmountInput(e.target.value);
            }}
          />
          <LoadingButton
            onClick={() => {
              if (amountInput) {
                queryTargetBalance(amountInput);
              }
            }}
            loading={targetBalanceLoading}
            sx={{ ml: "auto" }}
          >
            query
          </LoadingButton>
        </Stack>
        <Typography variant="body1">{`${targetBalance || 0} MTT`}</Typography>
      </Stack>
    </Card>
  );
};

export default TokenTransfer;
