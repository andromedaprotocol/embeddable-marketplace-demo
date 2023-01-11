import { Keplr } from "@keplr-wallet/types";
import { queryKeplrConfig } from "@andromedaprotocol/andromeda.js"

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
      const keplrConfig = await queryKeplrConfig(chainId)
      await keplr.experimentalSuggestChain(keplrConfig);
    } catch (err) {
      console.log(err)
      throw new Error(`Chain ${chainId} is not supported`);
    }
  }
}
