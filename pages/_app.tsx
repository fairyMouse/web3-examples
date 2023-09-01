import "windi.css";
import ThemeProvider from "@/src/theme";
import type { AppProps } from "next/app";
import { Stack } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Header from "@/src/layouts/header";
import Menu from "@/src/layouts/menu";
import { HEADER } from "@/src/constants/layouts";
import { WagmiConfig, createConfig } from "wagmi";
import { goerli } from "@wagmi/core/chains";
import { createPublicClient, http } from "viem";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: goerli,
    transport: http(),
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <WagmiConfig config={config}>
        <Stack flexDirection={"row"}>
          <Menu />
          <Stack sx={{ flex: 1, minHeight: "100vh" }}>
            <Header />
            <Stack
              sx={{
                flex: 1,
                bgcolor: "grey.50",
                py: `${HEADER.H_MAIN_DESKTOP}px`,
              }}
            >
              <Component {...pageProps} />
            </Stack>
          </Stack>
        </Stack>
        <ToastContainer theme="light" limit={2} pauseOnFocusLoss={false} />
      </WagmiConfig>
    </ThemeProvider>
  );
}
