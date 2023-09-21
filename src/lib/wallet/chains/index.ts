import { Keplr } from "@keplr-wallet/types";
import { refetchKeplrConfigQuery } from "@andromedaprotocol/gql/dist/__generated/react"
import { apolloClient } from "@/lib/graphql";
import { IKeplrConfig } from "@andromedaprotocol/gql";

/**
 * Adds chain info or enables a chain in Keplr by a given chain ID and Keplr instance
 * @param chainId
 * @param keplr
 */
export async function connectByChainId(chainId: string, keplr: Keplr) {
  try {
    await keplr.enable(chainId);
  } catch (err) {
    console.log(err)
    try {
      const keplrConfig = await apolloClient.query<IKeplrConfig>(refetchKeplrConfigQuery({
        'identifier': chainId
      }))
      await keplr.experimentalSuggestChain(keplrConfig.data);
    } catch (err) {
      console.log(err)
      throw new Error(`Chain ${chainId} is not supported`);
    }
  }
}
