import { z } from "zod"

export type IShareUrls = z.infer<typeof ShareUrlsSchema>
export const ShareUrlsSchema = z.object({
    twitter: z.string().optional()
})

export type IBaseCollection = z.infer<typeof BaseCollectionSchema>
export const BaseCollectionSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),

}).merge(ShareUrlsSchema)


export const CollectionTypeSchema = z.enum([
    "embeddables-auction",
    "embeddables-marketplace",
    "embeddables-crowdfund",
    "embeddables-exchange"
])
export const ICollectionType = CollectionTypeSchema.enum


export type IAuctionCollection = z.infer<typeof AuctionCollectionSchema>;
export const AuctionCollectionSchema = z.object({
    auction: z.string(),
    cw721: z.string(),
    featured: z.string().optional(),
    type: z.literal(CollectionTypeSchema.enum["embeddables-auction"])
}).merge(BaseCollectionSchema)


export type IMarketplaceCollection = z.infer<typeof MarketplaceCollectionSchema>;
export const MarketplaceCollectionSchema = z.object({
    marketplace: z.string(),
    cw721: z.string(),
    featured: z.string().optional(),
    type: z.literal(CollectionTypeSchema.enum["embeddables-marketplace"])
}).merge(BaseCollectionSchema)


export type ICrowdfundCollection = z.infer<typeof CrowdfundCollectionSchema>;

export const CrowdfundCollectionSchema = z.object({
    crowdfund: z.string(),
    cw721: z.string(),
    featured: z.string().optional(),
    type: z.literal(CollectionTypeSchema.enum["embeddables-crowdfund"]),
}).merge(BaseCollectionSchema)


export type IExchangeCollection = z.infer<typeof ExchangeCollectionSchema>;
export const ExchangeCollectionSchema = z.object({
    exchange: z.string(),
    cw20: z.string(),
    type: z.literal(CollectionTypeSchema.enum["embeddables-exchange"]),
}).merge(BaseCollectionSchema)


export type ICollectionCw20 = IExchangeCollection;
export type ICollectionCw721 = IAuctionCollection | IMarketplaceCollection | ICrowdfundCollection;

export const CollectionSchema = z.union([AuctionCollectionSchema, MarketplaceCollectionSchema, CrowdfundCollectionSchema, ExchangeCollectionSchema]);

export type ICollection = z.infer<typeof CollectionSchema>;


export type IConfig = z.infer<typeof ConfigSchema>
export const ConfigSchema = z.object({
    name: z.string(),
    chainId: z.string(),
    coinDenom: z.string(),
    collections: z.array(CollectionSchema),
    id: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    banner: z.string().optional(),
    description: z.string().optional(),
}).merge(ShareUrlsSchema)