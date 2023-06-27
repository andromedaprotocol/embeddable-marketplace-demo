export interface IConfig extends IShareUrls {
    name: string;
    chainId: string;
    coinDenom: string;
    collections: ICollection[];
}

export interface IBaseCollection extends IShareUrls {
    id: string;
    name: string;
}

export enum ICollectionType {
    AUCTION = 'embeddables-auction',
    MARKETPLACE = 'embeddables-marketplace',
    CROWDFUND = 'embeddables-crowdfund',
}

export interface IAuctionCollection extends IBaseCollection {
    auction: string;
    cw721: string;
    featured: string;
    type: ICollectionType.AUCTION;
}

export interface IMarketplaceCollection extends IBaseCollection {
    marketplace: string;
    cw721: string;
    featured: string;
    type: ICollectionType.MARKETPLACE;
}

export interface ICrowdfundCollection extends IBaseCollection {
    crowdfund: string;
    cw721: string;
    featured: string;
    type: ICollectionType.CROWDFUND;
}

export type ICollection = IAuctionCollection | IMarketplaceCollection | ICrowdfundCollection;


export interface IShareUrls {
    twitter?: string;
}