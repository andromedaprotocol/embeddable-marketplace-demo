import type { OfflineSigner, AccountData } from "@cosmjs/proto-signing";
import type { ChainConfig } from "@andromedaprotocol/andromeda.js/dist/types";

import React, {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useGetKeplrOnStart from "../hooks/useGetKeplrOnStart";
import useChainConnect from "../hooks/useChainConnect";
import { AUTOCONNECT_KEY } from "../utils/contants";
import { WalletContext } from "../hooks/useWalletContext";
import { useToast } from "@chakra-ui/react";
import { useChainConfig } from "@/lib/graphql/hooks/chain";
import useApp from "@/lib/app/hooks/useApp";

interface WalletProviderProps {
  children: ReactNode;
}
const WalletProvider: FC<WalletProviderProps> = memo(function WalletProvider(
  props
) {
  const { children } = props;
  const {
    config: { chainId },
  } = useApp();
  const { data: config } = useChainConfig(chainId ?? "");

  const [signer, setSigner] = useState<OfflineSigner | undefined>();
  const [accounts, setAccounts] = useState<readonly AccountData[]>([]);

  const { keplr, status } = useGetKeplrOnStart();

  const chainConnect = useChainConnect();

  const toast = useToast();

  const connect = useCallback(() => {
    if (!config) return;
    return chainConnect(config.chainId)
      .then((_signer) => {
        setSigner(_signer);
        return _signer.getAccounts();
      })
      .then((_accounts) => {
        setAccounts(_accounts);
      })
      .catch((err) => {
        console.log(err.message);
        toast({
          title: err.message,
          status: "error",
          position: "top-right",
        });
      });
  }, [chainConnect, config]);

  //Removes signer info from context
  const disconnect = useCallback(() => {
    setSigner(undefined);
    setAccounts([]);
    localStorage.removeItem(AUTOCONNECT_KEY);
  }, []);

  //Checks if the user has given wallet info before, if so the wallet info is requested from Keplr
  useEffect(() => {
    const autoconnect = localStorage.getItem(AUTOCONNECT_KEY);
    if (typeof keplr !== "undefined" && autoconnect === keplr?.mode) {
      connect();
    }
  }, [config, keplr, connect]);

  return (
    <WalletContext.Provider
      value={{
        keplr,
        status,
        config,
        connect,
        disconnect,
        signer,
        account: accounts[0],
      }}
    >
      {children}
    </WalletContext.Provider>
  );
});

export default WalletProvider;
