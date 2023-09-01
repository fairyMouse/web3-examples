import { useErc20Context } from "src/provider/Erc20Provider";
import { AIRDROP_CONTRACT_ADDR } from "@/src/constants/wallet";
import { LoadingButton } from "@mui/lab";
import { Alert, Card, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useImperativeHandle, useState } from "react";
import { toast } from "react-toastify";
import handleError from "@/src/utils/handleError";

interface IAirdropApprovalProps {
  amountInput: string;
  updateAllowanceForAirdrop: () => Promise<void>;
}

const AirdropApproval = (props: IAirdropApprovalProps) => {
  const { updateAllowanceForAirdrop, amountInput } = props;
  const { erc20ProviderContract, erc20SignerContract, tokenInfo } =
    useErc20Context();

  const [approving, setApproving] = useState(false);

  const updateAmount = async () => {
    if (erc20SignerContract) {
      try {
        setApproving(true);
        const res = await erc20SignerContract.approve(
          AIRDROP_CONTRACT_ADDR,
          "100" // 这个值可以随便填，真正生效的数值是在metamask上填的
        );
        console.log("授权结果信息:", res);
        const receipt = await res.wait();
        console.log("授权收据信息:", receipt);

        updateAllowanceForAirdrop();

        toast.success("successfully updated");
      } catch (error: any) {
        handleError(error);
      } finally {
        setApproving(false);
      }
    }
  };

  return (
    <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
      <Typography variant="body1">Approved amount: {amountInput}</Typography>

      <LoadingButton
        onClick={updateAmount}
        loading={approving}
        sx={{ ml: "auto" }}
      >
        Approve
      </LoadingButton>
    </Stack>
  );
};

export default AirdropApproval;
