import { coin, Coin } from "@cosmjs/proto-signing";
import { useEffect, useState } from "react";
import useAndromedaContext from "./useAndromedaContext";

/**
 * Queries the balance for a given address/denom asyncrhonously. If no address is provided the current Andromeda Client signer address is used.
 * @param denom
 * @param address
 * @returns
 */
export default function useGetBalance(denom: string, address?: string) {
  const { connected, client } = useAndromedaContext();
  const [balance, setBalance] = useState<Coin>(coin(0, denom));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      const balance = await client.getBalance(denom, address);
      if (balance) setBalance(balance);
      setLoading(false);
    };
    if (connected) fetchBalance();
  }, [connected, client, denom, address]);

  return { loading, balance };
}
