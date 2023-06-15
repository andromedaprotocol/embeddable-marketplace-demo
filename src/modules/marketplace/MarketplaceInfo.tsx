import { IMarketplaceCollection } from "@/lib/app/types";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Flame, Share } from "lucide-react";
import React, { FC, useEffect, useMemo, useState } from "react";
import { BuyNowButton } from "../common/cta/components/buynow";
import { useGetTokenMarketplaceInfo } from "@/lib/graphql/hooks/marketplace";

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
        mt="4"
        p="4"
        minW="xs"
        w="full"
      >
        <SimpleGrid columns={2} spacing="2">

          {marketplaceState?.latestSaleState.status === "open" ? (
            <Box>
              <Text fontSize="xs" textStyle="light">
                Current Price
              </Text>
              <Flex gap="2">
                <Text fontWeight="bold" fontSize="sm">
                  {marketplaceState?.latestSaleState.price} - {marketplaceState?.latestSaleState.coin_denom}
                </Text>
              </Flex>
            </Box>
          ) : (
            <Box>
              <Text fontSize="xs" textStyle="light">
                Currently Not For Sale
              </Text>
              <Flex gap="2">
                <Text fontWeight="bold" fontSize="sm">
                  {marketplaceState?.latestSaleState.price} - {marketplaceState?.latestSaleState.coin_denom}
                </Text>
              </Flex>
            </Box>

          )}
          <Box>
            <Text fontSize="xs" textStyle="light">
              &nbsp;
            </Text>

          </Box>
        </SimpleGrid>
        <Divider my="4" />
        <BuyNowButton
          disabled={marketplaceState?.latestSaleState.status !== "open"}
          contractAddress={collection.cw721}
          marketplaceAddress={marketplaceState?.address ?? ""}
          tokenId={tokenId}
          mt="4"
        >

        </BuyNowButton>
      </Box>
    </Box>
  );
};
export default MarketplaceInfo;
