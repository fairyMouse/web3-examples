import "windi.css";
import ThemeProvider from "@/src/theme";
import type { AppProps } from "next/app";
import { Stack } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "src/modules/erc721/style.css";
import Header from "@/src/layouts/header";
import Menu from "@/src/layouts/menu";
import { HEADER } from "@/src/constants/layouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Stack flexDirection={"row"}>
        <Menu />
        <Stack sx={{ flex: 1 }}>
          <Header />
          <Stack sx={{ bgcolor: "grey.50", pt: `${HEADER.H_MAIN_DESKTOP}px` }}>
            <Component {...pageProps} />
          </Stack>
        </Stack>
      </Stack>
      <ToastContainer theme="light" limit={2} pauseOnFocusLoss={false} />
    </ThemeProvider>
  );
}
