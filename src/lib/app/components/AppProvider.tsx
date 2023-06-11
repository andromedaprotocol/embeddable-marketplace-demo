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
import config from "@/config.json";
import { AndromedaProvider } from "@/lib/andrjs";
import { IConfig } from "../types";
import { useRouter } from "next/router";
import { parseEmbeddableUrl } from "@/utils/config";
import { SESSION_KEYS, setSessionStorage } from "@/utils/storage";


interface AppProviderProps {
  children: ReactNode;
  theme?: ChakraProviderProps["theme"];
}
const AppProvider: FC<AppProviderProps> = (props) => {
  const { children, theme = defaultTheme } = props;
  const [configState, setConfigState] = useState(config);

  const router = useRouter();
  const configUri = useMemo(() => {
    return router.query.config as string;
  }, [router.query])
  useEffect(() => {
    const tId = setTimeout(() => {
      if(!configUri) return;
      setSessionStorage(SESSION_KEYS.CONFIG_URI, configUri);
      const _config = parseEmbeddableUrl(configUri);
      setConfigState(_config);
    }, 100);
    return () => clearTimeout(tId);
  }, [configUri])

  useEffect(() => {
    // console.log(configState);
  }, [configState]);

  const updateConfigState = (newConfig: IConfig) => {
    setConfigState(newConfig);
    console.log('updating Config State');
    //console.log(configState);
  };
  return (
    <AppContext.Provider value={{ config: configState, updateConfig: updateConfigState }}>
      <ChakraProvider theme={theme} colorModeManager={ThemeStorageManager}>
        <CSSReset />
        <WalletProvider>
          <AndromedaProvider>
            <GlobalModalProvider>{children}</GlobalModalProvider>
          </AndromedaProvider>
        </WalletProvider>
      </ChakraProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
