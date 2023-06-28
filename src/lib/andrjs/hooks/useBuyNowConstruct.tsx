import { Msg } from "@andromedaprotocol/andromeda.js";
import { useCallback } from "react";

interface IConstuctData {
  tokenAddress: string;
  tokenId: string;
}

export default function useBuyNowConstruct() {
  // Contruction reference: https://docs.andromedaprotocol.io/andromeda/andromeda-digital-objects/marketplace#buy
  const construct = useCallback((data: IConstuctData) => {
    const msg: Msg = {
      buy: {
        token_id: data.tokenId,
        token_address: data.tokenAddress,
      },
    };
    return msg;
  }, []);
  return construct;
}
