import { Keplr } from "@keplr-wallet/types";
import { useEffect, useState } from "react";
import { KeplrConnectionStatus, KeplrStatus } from "../types";

/**
 * https://docs.keplr.app/api/
 * Taken from above
 * @returns The window's Keplr instance
 */
async function getKeplr(): Promise<Keplr | undefined> {
  if (window.keplr) {
    return window.keplr;
  }

  if (document.readyState === "complete") {
    return window.keplr;
  }

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        resolve(window.keplr);
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
}


/**
 * A hook used on start up to query the current state of Keplr within the user's browser, returns the Keplr instance if it exists and a status enum
 * @returns An object containing the status of fetching Keplr and the Keplr instance itself if it exists
 */
export default function useGetKeplrOnStart(): KeplrStatus {
  const [keplr, setKeplr] = useState<Keplr | undefined>();
  const [status, setStatus] = useState<KeplrStatus["status"]>(
    KeplrConnectionStatus.Connecting,
  );

  useEffect(() => {
    const updateStatus = async () => {
      const keplr = await getKeplr();
      if (keplr) {
        setKeplr(keplr);
        setStatus(KeplrConnectionStatus.Ok);
      } else {
        //If Keplr is undefined it is not installed
        setStatus(KeplrConnectionStatus.NotInstalled);
      }
    };

    updateStatus();
  }, []);

  return {
    keplr,
    status,
  };
}
