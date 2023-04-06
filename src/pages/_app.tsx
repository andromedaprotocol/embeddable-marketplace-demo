import { AppProvider } from "@/lib/app";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import { apolloClient } from "@/lib/graphql";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <AppProvider>
        
          <Head>
            <title>Marketplace</title>
          </Head>
          <Component {...pageProps} />
        
      </AppProvider>
    </ApolloProvider>
  );
}

export default MyApp;
