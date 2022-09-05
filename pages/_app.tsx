import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { WalletBalanceProvider } from "../src/hooks/useWalletBalance";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";

library.add(fab, faCoffee);

require("@solana/wallet-adapter-react-ui/styles.css");

const WalletConnectionProvider = dynamic(
  () => import("../src/providers/WalletConnection/WalletConnectionProvider"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CSSReset />
      <WalletConnectionProvider>
        <WalletBalanceProvider>
          <Component {...pageProps} />
        </WalletBalanceProvider>
      </WalletConnectionProvider>
    </ChakraProvider>
  );
}
export default MyApp;
