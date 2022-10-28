import { useCallback, useEffect } from "react";
import { connectByChainId } from "../chains";
import { AUTOCONNECT_KEY } from "../utils/contants";
import useGetKeplrOnStart from "./useGetKeplrOnStart";

const useChainConnect = () => {
  const { keplr } = useGetKeplrOnStart();

  //Assigns signer info to context
  const connect = useCallback(async (chainId: string) => {
    if (!keplr) {
      throw new Error("Keplr not initiated yet");
    }
    // Enable chain
    try {
      await connectByChainId(chainId, keplr);
    } catch (err) {
      throw new Error(`Could not connect to chain ${chainId}`);
    }
    try {
      const _signer = await keplr?.getOfflineSignerAuto(chainId);
      //Assign the auto connect storage item to be the same as the current Keplr mode
      localStorage.setItem(AUTOCONNECT_KEY, keplr?.mode ?? "extension");
      return _signer;
    } catch (error) {
      throw new Error(`There was a problem accessing your Keplr wallet`);
    }
  }, [keplr]);

  return connect;
};

export default useChainConnect;
