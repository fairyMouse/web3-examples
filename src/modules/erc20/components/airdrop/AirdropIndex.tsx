import { useErc20Context } from '@/pages/erc20';
import { AIRDROP_CONTRACT_ADDR } from '@/src/constants/wallet';
import { LoadingButton } from '@mui/lab';
import { Alert, Card, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useErc20AirdropContext } from '../../Erc20AirdropProvider';
import { toast } from 'react-toastify';
import handleError from '@/src/utils/handleError';
import { ethers } from 'ethers';
import AirdropForm from './AirdropForm';

const AirdropIndex = () => {
  const { account, erc20ProviderContract, erc20SignerContract, tokenInfo } =
    useErc20Context();

  const [amountInput, setAmountInput] = useState('100');
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    updateAllowanceForAirdrop();
  }, [erc20ProviderContract]);

  const updateAllowanceForAirdrop = async () => {
    if (erc20ProviderContract) {
      const res = await erc20ProviderContract.allowance(
        account,
        AIRDROP_CONTRACT_ADDR
      );

      if (tokenInfo) {
        setAmountInput(ethers.formatUnits(res, tokenInfo.decimals));
      }
    }
  };

  const updateAmount = async () => {
    if (erc20SignerContract) {
      try {
        setApproving(true);
        const res = await erc20SignerContract.approve(
          AIRDROP_CONTRACT_ADDR,
          '100' // 这个值可以随便填，真正生效的数值是在metamask上填的
        );
        console.log('授权结果信息:', res);
        const receipt = await res.wait();
        console.log('授权收据信息:', receipt);

        updateAllowanceForAirdrop();

        toast.success('successfully updated');
      } catch (error: any) {
        handleError(error);
      } finally {
        setApproving(false);
      }
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4"> Airdrop </Typography>

      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack spacing={1}>
          {/* <Typography variant="subtitle1">
            Approval
          </Typography> */}
          <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
            <Typography variant="body1">
              Approved amount: {amountInput}
            </Typography>
            {/* <TextField
              sx={{ flex: 1 }}
              size="small"
              // disabled={ }
              label="Allowance For Airdrop"
              value={amountInput}
              onChange={e => {
                setAmountInput(e.target.value);
              }}
            /> */}

            <LoadingButton
              onClick={updateAmount}
              loading={approving}
              sx={{ ml: 'auto' }}
            >
              Approve
            </LoadingButton>
          </Stack>
        </Stack>
        <AirdropForm />
      </Stack>
    </Card>
  );
};

export default AirdropIndex;
