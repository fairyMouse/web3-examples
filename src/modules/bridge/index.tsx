import { Card, Container, Stack, Tab, Tabs } from "@mui/material";
import { BridgeTabEnum } from "./types";
import { useState } from "react";
import BridgeProvider from "./BridgeProvider";
import ZksyncEraProviderProvider from "./ZksyncEraProvider";
import BridgeTxForm from "./BridgeTxForm";

const BridgeMain = () => {
  const [currentTab, setCurrentTab] = useState<BridgeTabEnum>(
    BridgeTabEnum.DEPOSIT
  );
  const tabs = [
    {
      value: BridgeTabEnum.DEPOSIT,
      label: "Deposit",
    },
    {
      value: BridgeTabEnum.WITHDRAW,
      label: "Withdraw",
    },
  ];
  const handleFilterStatus = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: BridgeTabEnum
  ) => {
    setCurrentTab(newValue);
  };

  return (
    <Container>
      <Stack alignItems={"center"} sx={{ mt: 3 }}>
        <BridgeTxForm />
      </Stack>
    </Container>
  );
};

const BridgeIndex = () => {
  return (
    <BridgeProvider>
      <ZksyncEraProviderProvider>
        <BridgeMain />
      </ZksyncEraProviderProvider>
    </BridgeProvider>
  );
};

export default BridgeIndex;
