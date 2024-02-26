import { ICollectionCw721, ICollectionType } from "@/lib/app/types";
import { useGetCw721, useGetCw721Token } from "@/lib/graphql/hooks/cw721";
import { useGetTokenUri } from "@/lib/graphql/hooks/cw721/useGetTokenUri";
import AuctionInfo from "@/modules/auction/AuctionInfo";
import CrowdfundInfo from "@/modules/crowdfund/CrowdfundInfo";
import MarketplaceInfo from "@/modules/marketplace/MarketplaceInfo";
import React, { FC } from "react"

interface Props {
    collection: ICollectionCw721;
    tokenId: string;
}

const Cw721TokenAction: FC<Props> = (props) => {
    const { collection, tokenId } = props;
    const { data: cw721 } = useGetCw721(collection.cw721);
    const { data: token } = useGetCw721Token(collection.cw721, tokenId)
    const { tokenUri } = useGetTokenUri(token?.token_uri);

    if (collection.type === ICollectionType.AUCTION) return (
        <AuctionInfo
            collection={collection}
            collectionName={cw721?.contractInfo.name ?? 'Loading...'}
            tokenId={tokenId}
            name={tokenUri?.name ?? tokenId}
        />
    )
    if (collection.type === ICollectionType.MARKETPLACE) return (
        <MarketplaceInfo
            collection={collection}
            collectionName={cw721?.contractInfo.name ?? 'Loading...'}
            tokenId={tokenId}
            name={tokenUri?.name ?? tokenId}
        />
    )
    if (collection.type === ICollectionType.CROWDFUND) return (
        <CrowdfundInfo
            collection={collection}
            collectionName={cw721?.contractInfo.name ?? 'Loading...'}
        />
    )
    return null;
}

export default Cw721TokenAction