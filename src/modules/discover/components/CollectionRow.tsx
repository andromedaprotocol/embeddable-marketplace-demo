import React, { FC, useMemo } from "react";
import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import { ICollectionType } from "@/lib/app/types";
import Cw721CollectionRow from "@/modules/cw721/components/CollectionRow";

interface CollectionRowProps {
  collectionId: string;
}
const CollectionRow: FC<CollectionRowProps> = (props) => {
  const { collectionId } = props;
  const collection = useGetCollection(collectionId);

  if (collection?.type === ICollectionType.AUCTION) {
    return <Cw721CollectionRow collectionId={collectionId} />
  }

  if (collection?.type === ICollectionType.MARKETPLACE) {
    return <Cw721CollectionRow collectionId={collectionId} />
  }
  if (collection?.type === ICollectionType.CROWDFUND) {
    return <Cw721CollectionRow collectionId={collectionId} />
  }

  return null;
};
export default CollectionRow;
