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
import React, { FC, useEffect, useMemo, useState } from "react";
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
  )

  return (
    <Box w="full">
      <HStack justify="space-between">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="xs" fontWeight="thin" fontStyle="light">
            Collection: <b>{props.collectionName}</b>
          </Text>
        </Box>
        <Button leftIcon={<Share width={16} />} variant="outline">
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
      >
        <SimpleGrid columns={2} spacing="2">
          <GridItem>
            <MarketplaceStartStat
              collection={collection}
              tokenId={tokenId}
            />
          </GridItem>
        </SimpleGrid>
        <Divider my="4" />
        <BuyNowButton
          disabled={marketplaceState?.latestSaleState.status !== "open"}
          contractAddress={collection.cw721}
          marketplaceAddress={collection.marketplace}
          tokenId={tokenId}
        >
        </BuyNowButton>
      </Box>
    </Box>
  );
};
export default MarketplaceInfo;
