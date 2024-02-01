import { Msg } from "@andromedaprotocol/andromeda.js";
import { useCallback } from "react";

interface IConstuctData {
  recipient: string;
}

export default function useExchangeConstruct() {
  const construct = useCallback((data: IConstuctData) => {
    const msg: Msg = {
      purchase: {
        recipient: data.recipient
      },
    };
    return msg;
  }, []);
  return construct;
}
