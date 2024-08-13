import { IAuctionCollection } from "@/lib/app/types";
import { useGetTokenAuctionState } from "@/lib/graphql/hooks/auction";
import { PlaceBidButton } from "@/modules/common/cta";
import { formatTime, getTime } from "@/utils/time";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Flame, Share } from "lucide-react";
import React, { FC, useEffect, useMemo, useState } from "react";
import AuctionStartStat from "./AuctionStartStat";

interface AuctionInfoProps {
  tokenId: string;
  collection: IAuctionCollection;
  name: string;
  collectionName: string;
}

const AuctionInfo: FC<AuctionInfoProps> = (props) => {
  const { tokenId, collection, name } = props;

  // Auction variables:
  const { data: auctionState } = useGetTokenAuctionState(
    collection.cw721,
    collection.auction,
    tokenId
  );

  const startTime = getTime(auctionState?.start_time ?? {});
  const endTime = getTime(auctionState?.end_time ?? {});

  const isStarted = startTime.isBefore(new Date());
  const isEnded = endTime.isBefore(new Date());

  const [duration, setDuration] = useState(dayjs.duration(0));

  useEffect(() => {
    if (!auctionState) return;
    const tId = setInterval(() => {
      if (isEnded) {
        setDuration(dayjs.duration(0));
        clearInterval(tId);
        return;
      }
      const today = new Date();
      if (isStarted) {
        setDuration(dayjs.duration(endTime.diff(today)));
      } else {
        setDuration(dayjs.duration(startTime.diff(today)));
      }
    }, 1000);
    return () => clearInterval(tId);
  }, [auctionState, isStarted, isEnded]);

  return (
    <Box w="full" data-testid="auction-info">
      <HStack justify="space-between" data-testid="auction-header">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" data-testid="auction-name">
            {name}
          </Text>
          <Text fontSize="xs" fontWeight="thin" fontStyle="light">
            Collection: <b data-testid="auction-collection">{props.collectionName}</b>
          </Text>
        </Box>
        <Button leftIcon={<Share width={16} />} variant="outline" data-testid="auction-share-button">
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
        data-testid="auction-details"
      >
        <SimpleGrid columns={2} spacing="2">
          <Box>
            <Text fontSize="xs" textStyle="light">
              Floor price
            </Text>
            <Flex gap="2">
              <Text fontWeight="bold" fontSize="sm" data-testid="auction-floor-price">
                {auctionState?.min_bid ?? 0} {auctionState?.coin_denom?.toUpperCase()}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Text fontSize="xs" textStyle="light">
              Highest Bid
            </Text>
            <Flex gap="2">
              <Text fontWeight="bold" fontSize="sm" data-testid="auction-highest-bid">
                {auctionState?.high_bidder_amount} {auctionState?.coin_denom?.toUpperCase()}
              </Text>
            </Flex>
          </Box>
        </SimpleGrid>
        <Divider my="4" />
        <AuctionStartStat
          collection={collection}
          tokenId={tokenId}
          data-testid="auction-start-stat"
        />
        <SimpleGrid
          spacing="4"
          columns={3}
          mt="4"
          alignSelf="start"
          maxW="max-content"
          ml="1"
        >
          <Box>
            <Text fontWeight="bold" fontSize="md" ml="0.5" data-testid="auction-hours">
              {duration.asHours().toFixed(0)}
            </Text>
            <Text fontSize="xs" textStyle="light">
              Hours
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="md" ml="0.5" data-testid="auction-minutes">
              {duration.minutes()}
            </Text>
            <Text fontSize="xs" textStyle="light">
              Minutes
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="md" ml="0.5" data-testid="auction-seconds">
              {duration.seconds()}
            </Text>
            <Text fontSize="xs" textStyle="light">
              Seconds
            </Text>
          </Box>
        </SimpleGrid>
        <PlaceBidButton
          isDisabled={!auctionState || !isStarted || isEnded}
          contractAddress={collection.cw721}
          auctionAddress={collection.auction}
          tokenId={tokenId}
          mt="4"
          data-testid="place-bid-button"
        >
          {isEnded ? "Sale ended" : !isStarted ? "Sale starting soon" : "Place a bid"}
        </PlaceBidButton>
      </Box>
    </Box>
  );
};

export default AuctionInfo;
