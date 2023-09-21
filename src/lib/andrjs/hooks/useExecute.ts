import type { Fee, Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";
import { useCallback } from "react";
import useAndromedaClient from "./useAndromedaClient";

/**
 * A hook for performing an execute message on a given contract, returns an async execute function
 * @param address
 * @returns
 */
export default function useExecute(address: string) {
  const client = useAndromedaClient();

  const execute = useCallback(
    async (msg: Msg, fee: Fee, memo?: string, funds?: Coin[]) => {
      return client!.execute(address, msg, fee, memo, funds);
    },
    [address, client],
  );

  return execute;
}
