import React, { FC, ReactNode } from "react";
import {
  HStack,
  Box,
} from "@chakra-ui/react";
import { LINKS } from "@/utils/links";

import { useGetCw721, useGetCw721Token } from "@/lib/graphql/hooks/cw721";
import CardOutline from "@/modules/common/ui/Card/Outline";
import CardStats from "@/modules/common/ui/Card/Stats";
import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import { ICollectionType } from "@/lib/app/types";
import Cw721AuctionState from "./Cw721AuctionState";
import Cw721MarketplaceState from "./Cw721MarketplaceState";

interface Cw721TokenCardProps {
  tokenId: string;
  contractAddress: string;
  collectionId: string;
}
const Cw721TokenCard: FC<Cw721TokenCardProps> = ({ tokenId, collectionId, contractAddress }) => {
  const { data: cw721 } = useGetCw721(contractAddress);
  const { data: token } = useGetCw721Token(contractAddress, tokenId);
  const collection = useGetCollection(collectionId);


  return (
    <CardOutline
      link={LINKS.cw721Token(collectionId, tokenId)}
      img={token?.metadata?.image}
    >
      <HStack justifyContent="space-between" mt="3">
        <CardStats
          title={cw721?.contractInfo?.name ?? ""}
          body={token?.metadata?.name ?? ''}
        />
      </HStack>
      <Box mt="1">
        {collection?.type === ICollectionType.AUCTION && (
          <Cw721AuctionState collection={collection} tokenId={tokenId} />
        )}
        {collection?.type === ICollectionType.MARKETPLACE && (
          <Cw721MarketplaceState collection={collection} tokenId={tokenId} />
        )}
      </Box>
    </CardOutline>
  );
};

export default Cw721TokenCard;
