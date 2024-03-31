import { ICollectionType, IConfig } from "./lib/app/types";

const CONFIG: IConfig = {
    "id": "andromeda",
    "coinDenom": "ANDR",
    "name": "Embeddable Collection",
    "chainId": "pisco-1",
    "createdDate": "2023-10-13T15:02:23.861Z",
    "modifiedDate": "2023-10-13T15:02:23.861Z",
    "collections": [
        {
            "marketplace": "terra19wye26rk6deywsqha58ju2qhp4atx8jagz5mwyrtsdtgh47c3c6swlw30l",
            "cw721": "terra1sa4lhgak9epws9p5v4lz38vksvwyj5f25upn7c6v7dwkcnkum86ssc2rq4",
            "name": "Collection 1",
            "type": ICollectionType.MARKETPLACE,
            "featured": "1",
            "id": "embeddables-auction-1"
        }
    ],
}

export default CONFIG