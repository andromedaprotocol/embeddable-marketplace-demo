import { ChainInfo, Currency, Keplr } from "@keplr-wallet/types";

const stars: Currency = {
    coinDenom: "STARS",
    coinMinimalDenom: "ustars",
    coinDecimals: 6,
    coinGeckoId: "STARS",
};

//Chain Info config requred by Keplr for Beta chains
const config: ChainInfo = {
    chainId: "elgafar-1",
    chainName: "Elgafar-1",
    rpc: "https://rpc.elgafar-1.stargaze-apis.com/",
    rest: "https://rest.elgafar-1.stargaze-apis.com/",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "stars",
        bech32PrefixAccPub: "starspub",
        bech32PrefixValAddr: "starsvaloper",
        bech32PrefixValPub: "starsvaloperpub",
        bech32PrefixConsAddr: "starsvalcons",
        bech32PrefixConsPub: "starsvalconspub",
    },
    currencies: [stars],
    feeCurrencies: [stars],
    stakeCurrency: stars,
    coinType: 118,
    gasPriceStep: {
        low: 0.15,
        average: 0.25,
        high: 0.5,
    },
};

export default async function connect(keplr: Keplr) {
    await keplr.experimentalSuggestChain(config);
}
