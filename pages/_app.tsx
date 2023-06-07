import 'windi.css';
import ThemeProvider from '@/src/theme';
import type { AppProps } from 'next/app';
import { Stack } from '@mui/material';
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Stack
        flexDirection={'row'}
        sx={{
          height: '100vh',
        }}
      >
        <Stack sx={{ width: 240, height: 800 }} alignItems={'center'}>
          <Link href={'/erc20'}>ERC 20</Link>
        </Stack>

        <Stack sx={{ flex: 1, bgcolor: 'grey.100' }}>
          <Component {...pageProps} />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
