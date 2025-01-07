import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import { ICollectionType } from "@/lib/app/types";
import CrowdfundPage from "@/modules/crowdfund/CrowdfundPage";
import ExchangePage from "@/modules/exchange/ExchangePage";
import Cw721Page from "@/modules/cw721/components";
import React, { FC, ReactNode, useMemo } from "react"

interface Props {
    collectionId: string;
}

const CollectionRouter: FC<Props> = (props) => {
    const { collectionId } = props;
    const collection = useGetCollection(collectionId);
    switch (collection.type) {
        case ICollectionType["embeddables-auction"]:
        case ICollectionType["embeddables-marketplace"]:
            return <Cw721Page collection={collection} contractAddress={collection.cw721} />
        case ICollectionType["embeddables-crowdfund"]:
            return <CrowdfundPage collection={collection} />
        case ICollectionType["embeddables-exchange"]:
            return <ExchangePage collection={collection} />
    }
    return null;
}

export default CollectionRouter