import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  router.push('/erc20');

  return (
    <Stack
      flexDirection={'row'}
      sx={{
        height: '100vh',
      }}
    ></Stack>
  );
}
