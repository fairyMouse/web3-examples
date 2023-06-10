import 'windi.css';
import ThemeProvider from '@/src/theme';
import type { AppProps } from 'next/app';
import { Stack } from '@mui/material';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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

        <Stack sx={{ flex: 1, bgcolor: 'grey.50' }}>
          <Component {...pageProps} />
        </Stack>
      </Stack>
      <ToastContainer theme="light" limit={2} pauseOnFocusLoss={false} />
    </ThemeProvider>
  );
}
