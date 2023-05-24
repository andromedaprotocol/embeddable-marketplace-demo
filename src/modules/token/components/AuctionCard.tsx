import React, { FC } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { MoreHorizontalIcon } from "@/theme/icons";
import { LINKS } from "@/utils/links";
import {
  useGetCollection,
  useGetTokenFromColId,
} from "@/lib/graphql/hooks/collection";
import { useGetTokenAuctionStateFromColId } from "@/lib/graphql/hooks/auction";
import dayjs from "dayjs";
import { formatTime, getTime } from "@/utils/time";

interface AuctionCardProps {
  tokenId: string;
  collectionId: string;
}
const AuctionCard: FC<AuctionCardProps> = ({ tokenId, collectionId }) => {
  const { data: collection } = useGetCollection(collectionId);
  const { data: token } = useGetTokenFromColId(collectionId, tokenId);
  const { data: auction } = useGetTokenAuctionStateFromColId(
    collectionId,
    tokenId
  );

  const startTime = getTime(auction?.start_time ?? {});
  const endTime = getTime(auction?.end_time ?? {});

  const isStarted = startTime.isBefore(new Date());
  const isEnded = endTime.isBefore(new Date());

  return (
    <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="lg">
      <Link href={LINKS.token(collectionId, tokenId)} passHref>
        <a>
          <Image src={token?.extension.image} alt="Image" borderRadius="lg" />
        </a>
      </Link>
      <HStack justifyContent="space-between" mt="3">
        <Flex direction="column" gap="0">
          <Text fontSize="xs" fontWeight="light" textStyle="light">
            {collection?.contractInfo?.name}
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            {token?.extension.name}
          </Text>
        </Flex>
        <Flex fontSize="xs" direction="column">
          {!isEnded ? (
            <>
              <Text>Sale {isStarted ? "ends" : "starts"}</Text>
              <Text fontWeight="bold">
                {formatTime(isStarted ? endTime : startTime)}
              </Text>
            </>
          ) : (
            <Text>Sale Ended!</Text>
          )}
        </Flex>
      </HStack>
      <Flex justify="space-between" align="start" mt="3" gap="2">
        <Box>
          <Text fontSize="xs" textStyle="light">
            Floor price
          </Text>
          <Text fontWeight="medium" fontSize="xs">
            {auction?.min_bid ?? 0} {auction?.coin_denom}
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs" textStyle="light">
            Highest Bid
          </Text>
          <Text fontWeight="medium" fontSize="xs">
            {auction?.high_bidder_amount} {auction?.coin_denom}
          </Text>
        </Box>
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            icon={<MoreHorizontalIcon width={16} />}
            variant="link"
            alignSelf="end"
          />
          <MenuList>
            <MenuItem>Burn</MenuItem>
            <MenuItem>Archive</MenuItem>
            <MenuItem>Sell</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default AuctionCard;
