import { Button, Stack } from "@mui/material";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { l1Networks } from "../constants/network";

interface IPageContainerProps {
  children: React.ReactNode;
}

const PageContainer = (props: IPageContainerProps) => {
  const { children } = props;
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const isCorrectNetwork = chain?.id === l1Networks.goerli.id;

  return (
    <Stack sx={{ mt: 3 }}>
      {isCorrectNetwork ? (
        children
      ) : (
        <Stack alignItems={"center"}>
          <Button
            disabled={!address}
            sx={{ width: "50%" }}
            onClick={() => switchNetwork && switchNetwork(l1Networks.goerli.id)}
          >
            Change wallet network to {l1Networks.goerli.name}
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default PageContainer;
