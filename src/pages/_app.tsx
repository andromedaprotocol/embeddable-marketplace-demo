import { AppProvider } from "@/lib/app";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Head>
        <title>Marketplace</title>
      </Head>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
