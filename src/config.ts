import { ICollectionType, IConfig } from "./lib/app/types";

const CONFIG: IConfig = {
    coinDenom: "ustars",
    name: "Embeddable House",
    chainId: "elgafar-1",
    createdDate: "2024-03-31T19:01:01.148Z",
    modifiedDate: "2024-03-31T19:01:01.148Z",
    id: "andromeda",
    collections: [
        {
            auction:
                "stars1vq94sxvpw3cr4y67z8egragv3quakshs9dfh9mpzaukt66ml2fwst7yp23",
            cw721: "stars1qtllkquvzczy27rfm5dl05x4a3e57f07t4t6kvlxq39x5el6n0ws45f3vs",
            name: "Auction Collection",
            type: ICollectionType.AUCTION,
            id: "embeddables-auction-1",
            featured: "TOKEN-1"
        },
    ],
};

export default CONFIG;
