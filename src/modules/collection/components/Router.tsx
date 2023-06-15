import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import { ICollectionType } from "@/lib/app/types";
import Cw721Page from "@/modules/cw721/components";
import React, { FC, ReactNode, useMemo } from "react"

interface Props {
    collectionId: string;
}

const CollectionRouter: FC<Props> = (props) => {
    const { collectionId } = props;
    const collection = useGetCollection(collectionId);

    if (collection?.type === ICollectionType.AUCTION || ICollectionType.MARKETPLACE || ICollectionType.CROWDFUND) {
        return <Cw721Page collection={collection} contractAddress={collection.cw721} />
    }

    return null;
}

export default CollectionRouter