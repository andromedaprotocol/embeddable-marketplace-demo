import { EncodeObject } from "@cosmjs/proto-signing";
import { useCallback } from "react";
import useAndromedaClient from "./useAndromedaClient";

/**
 * A hook for simulate encoded messages, returns an async simulation function
 * @returns
 */
export default function useSimulateExecute() {
  const client = useAndromedaClient();

  const simulate = useCallback(
    async (msgs: readonly EncodeObject[], memo?: string) => {
      return client!.estimateFee(msgs, undefined, memo);
    },
    [client],
  );

  return simulate;
}
