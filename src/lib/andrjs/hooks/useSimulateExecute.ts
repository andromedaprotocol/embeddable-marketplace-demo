import type { Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";
import { useCallback } from "react";
import useAndromedaClient from "./useAndromedaClient";

/**
 * A hook for simulate an execute message on a given contract, returns an async simulation function
 * @param address
 * @returns
 */
export default function useSimulateExecute(address: string) {
  const client = useAndromedaClient();

  const simulate = useCallback(
    async (msg: Msg, funds: Coin[], memo?: string) => {
      return client!.estimateExecuteFee(address, msg, funds, undefined, memo);
    },
    [address, client],
  );

  return simulate;
}
