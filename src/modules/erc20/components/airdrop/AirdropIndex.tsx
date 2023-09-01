import { Card, Stack, Typography } from "@mui/material";
import AirdropForm from "./AirdropForm";
import AirdropApproval from "./AirdropApproval";
import { useErc20Context } from "src/provider/Erc20Provider";
import { useEffect, useState } from "react";
import { AIRDROP_CONTRACT_ADDR } from "@/src/constants/wallet";

import { useWalletContext } from "@/src/provider/WalletProvider";
import { formatUnits } from "ethers/lib/utils";

const AirdropIndex = () => {
  const { account } = useWalletContext();
  const { erc20ProviderContract, erc20SignerContract, tokenInfo } =
    useErc20Context();

  const [amountInput, setAmountInput] = useState("100");

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
        setAmountInput(formatUnits(res, tokenInfo.decimals));
      }
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4"> Airdrop </Typography>

      <Stack spacing={3} sx={{ mt: 2 }}>
        <AirdropApproval
          amountInput={amountInput}
          updateAllowanceForAirdrop={updateAllowanceForAirdrop}
        />
        <AirdropForm updateAllowanceForAirdrop={updateAllowanceForAirdrop} />
      </Stack>
    </Card>
  );
};

export default AirdropIndex;
