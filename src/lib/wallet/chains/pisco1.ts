import { ChainInfo, Currency, Keplr } from "@keplr-wallet/types";

const luna: Currency = {
    coinDenom: "LUNA",
    coinMinimalDenom: "uluna",
    coinDecimals: 6,
    coinGeckoId: "LUNA",
};

//Chain Info config requred by Keplr for Beta chains
const config: ChainInfo = {
    chainId: "pisco-1",
    chainName: "terra2 testnet",
    rpc: "https://pisco-rpc.dalnim.finance/",
    rest: "https://pisco-api.dalnim.finance/",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "terra",
        bech32PrefixAccPub: "lunapub",
        bech32PrefixValAddr: "lunavaloper",
        bech32PrefixValPub: "lunavaloperpub",
        bech32PrefixConsAddr: "lunavalcons",
        bech32PrefixConsPub: "lunavalconspub",
    },
    currencies: [luna],
    feeCurrencies: [luna],
    stakeCurrency: luna,
    coinType: 118,
    gasPriceStep: {
        low: 0.15,
        average: 0.2,
        high: 0.3,
    },
};

export default async function connect(keplr: Keplr) {
    await keplr.experimentalSuggestChain(config);
}
