import { Stack, TextField } from "@mui/material";
import { useErc20AirdropContext } from "../../../../provider/Erc20AirdropProvider";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/src/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormProvider from "@/src/components/hook-form/FormProvider";
import handleError from "@/src/utils/handleError";
import { ERC20_CONTRACT_ADDR } from "@/src/constants/wallet";
import { toast } from "react-toastify";
import { useErc20Context } from "src/provider/Erc20Provider";
import { ethers } from "ethers";

interface IAirdropFormProps {
  updateAllowanceForAirdrop: () => Promise<void>;
}

const AirdropForm = (props: IAirdropFormProps) => {
  const { updateAllowanceForAirdrop } = props;

  const { tokenInfo } = useErc20Context();
  const { airdropSignerContract } = useErc20AirdropContext();
  const [airdropping, setAirdropping] = useState(false);
  const schema = Yup.object().shape({
    addresses: Yup.string().required("target address is required"),
    amount: Yup.string().required("amount is required"),
  });

  const methods = useForm<{
    addresses: string;
    amount: string;
  }>({
    resolver: yupResolver(schema),
    defaultValues: { addresses: "", amount: "" },
  });

  const { watch, setValue, reset, handleSubmit } = methods;
  const values = watch();

  async function onSubmit() {
    const { addresses, amount } = values;

    if (!tokenInfo) {
      return;
    }

    const addressArr = addresses.split(",");
    const value = ethers.parseUnits(amount, tokenInfo.decimals); // 精度需要自己指定的
    const amountArr = addressArr.map(item => value);

    if (airdropSignerContract) {
      try {
        setAirdropping(true);

        const res = await airdropSignerContract.multiTransferToken(
          ERC20_CONTRACT_ADDR,
          addressArr,
          amountArr
        );
        console.log("空投结果信息:", res);
        const receipt = await res.wait();
        console.log("空投收据信息:", receipt);

        reset();
        updateAllowanceForAirdrop();

        toast.success("Successful airdrop!");
      } catch (error) {
        handleError(error);
      } finally {
        setAirdropping(false);
      }
    }
  }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField
          name="addresses"
          rows={6}
          sx={{ flex: 1 }}
          multiline
          label="Enter target addresses"
          placeholder="Enter the airdrop addresses of the targets, separated by commas."
        />
        <RHFTextField
          name="amount"
          sx={{ flex: 1 }}
          size="small"
          label="Enter the unified airdrop amount"
        />
        <LoadingButton loading={airdropping} variant="contained" type="submit">
          Airdrop
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default AirdropForm;
