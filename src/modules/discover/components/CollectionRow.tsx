import React, { FC, useMemo } from "react";
import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import { ICollectionType } from "@/lib/app/types";
import Cw721CollectionRow from "@/modules/cw721/components/CollectionRow";
import Cw20CollectionRow from "@/modules/cw20/components/CollectionRow";

interface CollectionRowProps {
  collectionId: string;
}
const CollectionRow: FC<CollectionRowProps> = (props) => {
  const { collectionId } = props;
  const collection = useGetCollection(collectionId);

  if (collection?.type === ICollectionType["embeddables-auction"]) {
    return <Cw721CollectionRow collectionId={collectionId} />
  }

  if (collection?.type === ICollectionType["embeddables-marketplace"]) {
    return <Cw721CollectionRow collectionId={collectionId} />
  }
  if (collection?.type === ICollectionType["embeddables-crowdfund"]) {
    return <Cw721CollectionRow collectionId={collectionId} />
  }
  if (collection?.type === ICollectionType["embeddables-exchange"]) {
    return <Cw20CollectionRow collectionId={collectionId} />
  }

  return null;
};
export default CollectionRow;
