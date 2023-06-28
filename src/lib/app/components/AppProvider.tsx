import {
  ChakraProvider,
  ChakraProviderProps,
  CSSReset,
} from "@chakra-ui/react";
import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import defaultTheme, { ThemeStorageManager } from "@/theme";
import { GlobalModalProvider } from "@/modules/modals";
import { WalletProvider } from "@/lib/wallet";
import { AppContext } from "../hooks";
import { AndromedaProvider } from "@/lib/andrjs";
import { useAppConfigFromUrl } from "../hooks/useAppConfigFromUrl";
import Loading from "@/modules/common/ui/Loading";
// import { APP_ENV } from "@/appEnv"; // Uncomment this line in private build


interface AppProviderProps {
  children: ReactNode;
  theme?: ChakraProviderProps["theme"];
}
const AppProvider: FC<AppProviderProps> = (props) => {
  const { children, theme = defaultTheme } = props;

  const { configState } = useAppConfigFromUrl(); // Comment this line if you are using your own private build

  return (
    <AppContext.Provider value={{
      config: configState // Comment this line if you are using your own private build
      // config: APP_ENV.DEFAULT_CONFIG // Un-comment this line if you are using your own private build
    }}>
      <ChakraProvider theme={theme} colorModeManager={ThemeStorageManager}>
        <CSSReset />
        <Loading loading={!configState}>
          <WalletProvider>
            <AndromedaProvider>
              <GlobalModalProvider>
                {children}
              </GlobalModalProvider>
            </AndromedaProvider>
          </WalletProvider>
        </Loading>
      </ChakraProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
