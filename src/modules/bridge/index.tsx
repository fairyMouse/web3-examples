import { Card, Container, Stack, Tab, Tabs } from "@mui/material";
import { BridgeTabEnum } from "./types";
import { useState } from "react";
import BridgeProvider from "./BridgeProvider";
import ZksyncEraProviderProvider from "./ZksyncEraProvider";
import BridgeFrom from "./components/BridgeFrom";

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
        <Card
          className="flex-col-c"
          sx={{
            width: 600,
            p: 3,
          }}
        >
          <Tabs value={currentTab} onChange={handleFilterStatus}>
            {tabs.map(tab => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>
          <Stack sx={{ mt: 2, width: "100%" }}>
            <BridgeFrom />
          </Stack>
        </Card>
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
