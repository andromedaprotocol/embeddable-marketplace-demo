import { Msg } from "@andromedaprotocol/andromeda.js";
import { useCallback } from "react";

interface IConstuctData {
  numTokens: number;
}

export default function useCrowdfundGroupPurchaseConstruct() {
  // Contruction reference: https://docs.andromedaprotocol.io/andromeda/andromeda-digital-objects/auction#placebid
  const construct = useCallback((data: IConstuctData) => {
    const msg: Msg = {
      purchase: {
        number_of_tokens: data.numTokens
      },
    };
    return msg;
  }, []);
  return construct;
}
