import type { OfflineSigner, AccountData } from "@cosmjs/proto-signing";
import { ChainConfig, configs } from "@andromedaprotocol/andromeda.js";
import React, {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import useGetKeplrOnStart from "../hooks/useGetKeplrOnStart";
import useChainConnect from "../hooks/useChainConnect";
import { AUTOCONNECT_KEY } from "../utils/contants";
import { WalletContext } from "../hooks/useWalletContext";
import { useToast } from "@chakra-ui/react";

interface WalletProviderProps {
  children: ReactNode;
  chainId?: ChainConfig["chainId"];
}
const WalletProvider: FC<WalletProviderProps> = memo((props) => {
  const { chainId: defaultChainId, children } = props;
  const [config, setConfig] = useState(configs[0]);
  const [signer, setSigner] = useState<OfflineSigner | undefined>();
  const [accounts, setAccounts] = useState<readonly AccountData[]>([]);

  const { keplr, status } = useGetKeplrOnStart();

  const chainConnect = useChainConnect();

  const toast = useToast();

  useEffect(() => {
    const _config = configs.find((c) => c.chainId === defaultChainId);
    if (_config) {
      setConfig(_config);
    }
  }, [defaultChainId]);

  const connect = useCallback(() => {
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

        setConfig(configs[0]);
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
        setConfig,
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
