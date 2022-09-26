import {
  ChakraProvider,
  ChakraProviderProps,
  CSSReset,
} from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import defaultTheme from "@/theme";
import { GlobalModalProvider } from "@/modules/modals";
import { WalletProvider } from "@/lib/wallet";

interface AppProviderProps {
  children: ReactNode;
  theme?: ChakraProviderProps["theme"];
}
const AppProvider: FC<AppProviderProps> = (props) => {
  const { children, theme = defaultTheme } = props;

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <WalletProvider>
        <GlobalModalProvider>{children}</GlobalModalProvider>
      </WalletProvider>
    </ChakraProvider>
  );
};

export default AppProvider;
