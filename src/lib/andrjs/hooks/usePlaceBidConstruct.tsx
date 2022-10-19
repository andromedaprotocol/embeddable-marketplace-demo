import { Msg } from "@andromedaprotocol/andromeda.js";
import { useCallback } from "react";

interface IConstuctData {
  tokenAddress: string;
  tokenId: string;
}

export default function usePlaceBidConstruct() {
  // Contruction reference: https://docs.andromedaprotocol.io/andromeda/andromeda-digital-objects/auction#placebid
  const construct = useCallback((data: IConstuctData) => {
    const msg: Msg = {
      place_bid: {
        token_id: data.tokenId,
        token_address: data.tokenAddress,
      },
    };
    return msg;
  }, []);
  return construct;
}
