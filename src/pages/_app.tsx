import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "styles/globals.css";
import Web3AppProvider from "context/Web3";
import GameContextProvider from "context/Game";
import { isBrowser, isProd } from "shared/constants";
import { disableReactDevTools } from "shared/utils";

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (isBrowser && isProd) disableReactDevTools();

  return (
    <Web3AppProvider>
      <GameContextProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </GameContextProvider>
    </Web3AppProvider>
  );
};

export default MyApp;
