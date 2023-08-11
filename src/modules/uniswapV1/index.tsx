import { Card, Container, Divider, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { EnumUniswapV1Tab } from "./types";
import SwapIndex from "./modules/Swap/SwapIndex";
import AddLiquidityIndex from "./modules/AddLiquidity/AddLiquidityIndex";

const UniswapV1Index = () => {
  const [currentTab, setCurrentTab] = useState<EnumUniswapV1Tab>(
    EnumUniswapV1Tab.ADD_LIQUIDITY
  );

  const tabs = [
    {
      value: EnumUniswapV1Tab.ADD_LIQUIDITY,
      label: "添加流动性",
    },
    {
      value: EnumUniswapV1Tab.SWAP,
      label: "Swap 交换",
    },
  ];
  const handleFilterStatus = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: EnumUniswapV1Tab
  ) => {
    setCurrentTab(newValue);
  };

  return (
    <Container>
      <Stack alignItems={"center"} sx={{ mt: 4 }}>
        <Tabs value={currentTab} onChange={handleFilterStatus}>
          {tabs.map(tab => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Stack>

      <Card sx={{ mt: 3 }}>
        <Stack sx={{ minHeight: 480, p: 2 }}>
          {currentTab === EnumUniswapV1Tab.ADD_LIQUIDITY && (
            <AddLiquidityIndex />
          )}
          {currentTab === EnumUniswapV1Tab.SWAP && <SwapIndex />}
        </Stack>
      </Card>
    </Container>
  );
};

export default UniswapV1Index;
