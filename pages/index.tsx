import { Stack } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Stack
      flexDirection={'row'}
      sx={{
        height: '100vh',
      }}
    >
      首页
    </Stack>
  );
}
