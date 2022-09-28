import { ChainInfo, Currency, Keplr } from "@keplr-wallet/types";

const junoX: Currency = {
  coinDenom: "JUNOX",
  coinMinimalDenom: "ujunox",
  coinDecimals: 6,
  coinGeckoId: "JUNOX",
};

//Chain Info config requred by Keplr for Beta chains
const config: ChainInfo = {
  chainId: "uni-3",
  chainName: "juno testnet",
  rpc: "https://rpc.uni.junonetwork.io",
  rest: "https://api.uni.junonetwork.io",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "juno",
    bech32PrefixAccPub: "junopub",
    bech32PrefixValAddr: "junovaloper",
    bech32PrefixValPub: "junovaloperpub",
    bech32PrefixConsAddr: "junovalcons",
    bech32PrefixConsPub: "junovalconspub",
  },
  currencies: [junoX],
  feeCurrencies: [junoX],
  stakeCurrency: junoX,
  coinType: 118,
  gasPriceStep: {
    low: 0.01,
    average: 0.025,
    high: 0.03,
  },
};

export default async function connect(keplr: Keplr) {
  await keplr.experimentalSuggestChain(config);
}
