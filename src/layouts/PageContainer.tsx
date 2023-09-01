import { Stack } from "@mui/material";
import { useNetwork } from "wagmi";

interface IPageContainerProps {
  children: React.ReactNode;
}

const PageContainer = (props: IPageContainerProps) => {
  const { children } = props;
  const res = useNetwork();
  console.log("res:", res);

  return <Stack>{children}</Stack>;
};

export default PageContainer;
