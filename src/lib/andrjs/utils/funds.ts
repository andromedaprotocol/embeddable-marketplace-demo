import { addCoins } from "@cosmjs/amino";
import { Coin } from "@cosmjs/proto-signing";

export const sumCoins = (coins: Coin[]) => {
    if (coins.length === 0) return undefined;
    return coins.reduce((res, cur) => addCoins(res, cur));
};