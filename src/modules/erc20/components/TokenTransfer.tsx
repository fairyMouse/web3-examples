import * as Yup from 'yup';
import { Card, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { RHFTextField } from '@/src/components/hook-form';
import { useErc20Context } from '@/pages/erc20';
import FormProvider from '@/src/components/hook-form/FormProvider';

const TokenTransfer = () => {
  const {
    account,
    tokenInfo,
    providerContract,
    balance,
    myBalanceLoading,
    updateMyBalance,
    signerContract,
    walletProvider,
  } = useErc20Context();

  useEffect(() => {
    updateMyBalance();
  }, [account, providerContract]);

  const [transferring, setTransferring] = useState<boolean>(false);

  const schema = Yup.object().shape({
    targetAddress: Yup.string().required('target address is required'),
    amount: Yup.string().required('amount is required'),
  });

  const methods = useForm<{
    targetAddress: string;
    amount: string;
  }>({
    resolver: yupResolver(schema),
    defaultValues: { targetAddress: '' },
  });

  const { watch, setValue, handleSubmit } = methods;
  const values = watch();

  // 0x15dbB04aD9D365dc9e56C4d44C528c96eCCcef5d
  async function onSubmit() {
    console.log('values:', values);
    const { targetAddress, amount } = values;
    if (walletProvider && signerContract && tokenInfo) {
      try {
        setTransferring(true);
        const value = ethers.utils.parseUnits(amount, tokenInfo.decimals); // 精度需要自己指定的

        const res = await signerContract.transfer(targetAddress, value);
        console.log('交易结果信息:', res);
        const receipt = await res.wait();
        console.log('交易收据信息:', receipt);

        updateMyBalance();
        setValue('amount', '');
        toast.success('successfully transferred');
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
      } finally {
        setTransferring(false);
      }
    }
  }

  return (
    <Card sx={{ p: 3, mt: 5 }}>
      <Typography variant="h4"> Transfer </Typography>

      <Stack flexDirection={'row'} alignItems={'center'} sx={{ mt: 2 }}>
        <Typography variant="body1">
          Current Balance: {`${balance || 0} MTT`}
        </Typography>

        <LoadingButton
          size="small"
          variant="outlined"
          sx={{ ml: 'auto' }}
          onClick={updateMyBalance}
          loading={myBalanceLoading}
        >
          refresh
        </LoadingButton>
      </Stack>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <RHFTextField
            placeholder="target address"
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
    </Card>
  );
};

export default TokenTransfer;