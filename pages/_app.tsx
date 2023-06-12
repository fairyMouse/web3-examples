import 'windi.css';
import ThemeProvider from '@/src/theme';
import type { AppProps } from 'next/app';
import { Stack } from '@mui/material';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Iconify from '@/src/components/iconify/Iconify';
import MenuDesktopVertical from '@/src/components/menu/MenuDesktopVertical';

export default function App({ Component, pageProps }: AppProps) {
  const menuData = [
    {
      title: 'ERC 20',
      path: '/erc20',
      icon: <Iconify icon="gala:apple" sx={{ mb: '2px' }} />,
    },
  ];
  return (
    <ThemeProvider>
      <Stack
        flexDirection={'row'}
        sx={{
          height: '100vh',
        }}
      >
        <MenuDesktopVertical data={menuData} sx={{ width: 200 }} />

        <Stack sx={{ flex: 1, bgcolor: 'grey.50' }}>
          <Component {...pageProps} />
        </Stack>
      </Stack>
      <ToastContainer theme="light" limit={2} pauseOnFocusLoss={false} />
    </ThemeProvider>
  );
}
