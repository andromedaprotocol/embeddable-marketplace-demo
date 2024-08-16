import React, { FC } from "react";
import { HStack, Box } from "@chakra-ui/react";
import { LINKS } from "@/utils/links";
import { useGetCw721, useGetCw721Token } from "@/lib/graphql/hooks/cw721";
import CardOutline from "@/modules/common/ui/Card/Outline";
import CardStats from "@/modules/common/ui/Card/Stats";
import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import { ICollectionType } from "@/lib/app/types";
import Cw721AuctionState from "./Cw721AuctionState";
import Cw721MarketplaceState from "./Cw721MarketplaceState";
import { useCodegenGeneratedAdoCw721ContractinfoQuery } from "@andromedaprotocol/gql/dist/__generated/react";

interface Cw721TokenCardProps {
  tokenId: string;
  contractAddress: string;
  collectionId: string;
}

const Cw721TokenCard: FC<Cw721TokenCardProps> = ({ tokenId, collectionId, contractAddress }) => {
  const { data: cw721 } = useCodegenGeneratedAdoCw721ContractinfoQuery({
    variables: {
      'ADO_cw721_address': contractAddress
    }
  });
  const { data: token } = useGetCw721Token(contractAddress, tokenId);
  const collection = useGetCollection(collectionId);

  return (
    <CardOutline
      link={LINKS.cw721Token(collectionId, tokenId)}
      img={token?.metadata?.image}
      data-testid="cw721-token-card"
    >
      <HStack justifyContent="space-between" mt="3" data-testid="card-stats">
        <CardStats
          title={cw721?.ADO.cw721.contractInfo?.name ?? ""}
          body={token?.metadata?.name ?? ''}
          data-testid="card-stats-details"
        />
      </HStack>
      <Box mt="1" data-testid="card-status">
        {collection?.type === ICollectionType.AUCTION && (
          <Cw721AuctionState collection={collection} tokenId={tokenId} data-testid="auction-state" />
        )}
        {collection?.type === ICollectionType.MARKETPLACE && (
          <Cw721MarketplaceState collection={collection} tokenId={tokenId} data-testid="marketplace-state" />
        )}
      </Box>
    </CardOutline>
  );
};

export default Cw721TokenCard;
