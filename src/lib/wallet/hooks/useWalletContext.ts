/* eslint-disable @typescript-eslint/no-empty-function */
import { ChainConfig, configs } from "@andromedaprotocol/andromeda.js";
import { AccountData } from "@cosmjs/proto-signing";
import { Keplr } from "@keplr-wallet/types";
import type { OfflineSigner } from "@cosmjs/proto-signing";
import { createContext, useContext } from "react";
import { KeplrConnectionStatus } from "../types";

export interface WalletContext {
  keplr?: Keplr;
  status: KeplrConnectionStatus;
  config: ChainConfig;
  setConfig: (config: ChainConfig) => void;
  signer?: OfflineSigner;
  account?: AccountData
  //Requests the user's wallet info from Keplr
  connect: () => void;
  //Removes the user's wallet info from wallet context
  disconnect: () => void;
}

const defaultWalletContext: WalletContext = {
  status: KeplrConnectionStatus.Connecting,
  config: configs[0],
  setConfig: () => { },
  connect: () => { },
  disconnect: () => { },
};

export const WalletContext = createContext(defaultWalletContext);

export default function useWalletContext(): WalletContext {
  return useContext(WalletContext);
}
