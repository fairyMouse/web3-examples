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
      <Stack sx={{ width: 240 }}>
        <Link href={'/erc20'}>ERC 20</Link>
      </Stack>

      <Stack sx={{ flex: 1, bgcolor: 'grey.100' }}>content</Stack>
    </Stack>
  );
}
