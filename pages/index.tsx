import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/erc20');
  }, []);

  return (
    <Stack
      flexDirection={'row'}
      sx={{
        height: '100vh',
      }}
    ></Stack>
  );
}
