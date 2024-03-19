import { coin, Coin } from "@cosmjs/proto-signing";
import { useEffect, useState } from "react";
import useAndromedaClient from "./useAndromedaClient";

/**
 * Queries the balance for a given address/denom asyncrhonously. If no address is provided the current Andromeda Client signer address is used.
 * @param denom
 * @param address
 * @returns
 */
export default function useGetBalance(denom: string, address?: string) {
  const client = useAndromedaClient();

  const [balance, setBalance] = useState<Coin>(coin(0, denom));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!client) return;
      setLoading(true);
      const balance = await client!.getBalance(denom, address);

      if (balance) setBalance(balance);
      setLoading(false);
    };
    fetchBalance();
  }, [client, denom, address]);

  return { loading, balance };
}
