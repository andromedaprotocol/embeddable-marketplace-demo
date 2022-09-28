import { Keplr } from "@keplr-wallet/types";
import pisco1Connect from "./piscol";

const connectionFunctions = {
  "pisco-1": pisco1Connect,

};

/**
 * Adds chain info or enables a chain in Keplr by a given chain ID and Keplr instance
 * @param chainId
 * @param keplr
 */
export async function connectByChainId(chainId: string, keplr: Keplr) {
  const connect = Object(connectionFunctions)[chainId];

  if (!connect) {
    try {
      await keplr.enable(chainId);
    } catch (error) {
      console.error(`Chain ${chainId} is not supported`);
    }
  } else {
    await connect(keplr);
  }
}
