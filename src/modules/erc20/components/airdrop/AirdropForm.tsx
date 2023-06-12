import { Stack } from '@mui/material';
import { useErc20AirdropContext } from '../../Erc20AirdropProvider';

const AirdropForm = () => {
  const { airdropSignerContract } = useErc20AirdropContext();

  return <Stack>AirdropForm</Stack>;
};

export default AirdropForm;
