import { ChainInfo, Currency, Keplr } from "@keplr-wallet/types";

const andr: Currency = {
    coinDenom: "ANDR",
    coinMinimalDenom: "uandr",
    coinDecimals: 6,
    coinGeckoId: "ANDR",
};

//Chain Info config requred by Keplr for Beta chains
const config: ChainInfo = {
    chainId: "galileo-2",
    chainName: "Galileo-2",
    rpc: "https://rpc-andromeda-testnet.cereslabs.io/",
    rest: "https://lcd-andromeda-testnet.cereslabs.io/",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "andr",
        bech32PrefixAccPub: "andrpub",
        bech32PrefixValAddr: "andrvaloper",
        bech32PrefixValPub: "andrvaloperpub",
        bech32PrefixConsAddr: "andrvalcons",
        bech32PrefixConsPub: "andrvalconspub",
    },
    currencies: [andr],
    feeCurrencies: [andr],
    stakeCurrency: andr,
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
