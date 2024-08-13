import { IMarketplaceCollection } from "@/lib/app/types";
import {
  Box,
  Button,
  Divider,
  Flex,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Flame, Share } from "lucide-react";
import React, { FC } from "react";
import { BuyNowButton } from "../common/cta/components/buynow";
import { useGetTokenMarketplaceInfo } from "@/lib/graphql/hooks/marketplace";
import MarketplaceStartStat from "./MarketplaceStartStat";

interface MarketplaceInfoProps {
  tokenId: string;
  collection: IMarketplaceCollection;
  name: string;
  collectionName: string;
}

const MarketplaceInfo: FC<MarketplaceInfoProps> = (props) => {
  const { tokenId, collection, name } = props;

  const { data: marketplaceState } = useGetTokenMarketplaceInfo(
    collection.marketplace,
    collection.cw721,
    tokenId
  );

  return (
    <Box w="full" data-testid="marketplace-info">
      <HStack justify="space-between">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" data-testid="token-name">
            {name}
          </Text>
          <Text fontSize="xs" fontWeight="thin" fontStyle="light" data-testid="collection-name">
            Collection: <b>{props.collectionName}</b>
          </Text>
        </Box>
        <Button leftIcon={<Share width={16} />} variant="outline" data-testid="share-button">
          Share
        </Button>
      </HStack>
      <Box
        border="1px"
        borderColor="gray.300"
        rounded="lg"
        p="4"
        minW="xs"
        w="full"
        data-testid="marketplace-details"
      >
        <SimpleGrid columns={2} spacing="2">
          <GridItem>
            <MarketplaceStartStat
              collection={collection}
              tokenId={tokenId}
              data-testid="marketplace-start-stat"
            />
          </GridItem>
        </SimpleGrid>
        <Divider my="4" />
        <BuyNowButton
          disabled={marketplaceState?.latestSaleState.status !== "open"}
          contractAddress={collection.cw721}
          marketplaceAddress={collection.marketplace}
          tokenId={tokenId}
          data-testid="buy-now-button"
        >
        </BuyNowButton>
      </Box>
    </Box>
  );
};

export default MarketplaceInfo;
