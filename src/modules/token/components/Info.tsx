import { useAppUtils } from "@/lib/app/hooks";
import {
  useGetTokenAuctionStateFromColId,
} from "@/lib/graphql/hooks/auction";
import { useGetTokenFromColId, useGetCollection } from "@/lib/graphql/hooks/collection";
import { PlaceBidButton } from "@/modules/common/cta";
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
import React, { FC, useMemo } from "react";

interface InfoProps {
  tokenId: string;
  collectionId: string;
}
const Info: FC<InfoProps> = (props) => {
  const { tokenId, collectionId } = props;
  const { getCollection } = useAppUtils();

  const colConfig = useMemo(() => {
    return getCollection(collectionId);
  }, [collectionId, getCollection]);

  const { data: collection } = useGetCollection(collectionId);
  const { data: token } = useGetTokenFromColId(collectionId, tokenId);
  const { data: auctionState } = useGetTokenAuctionStateFromColId(
    collectionId,
    tokenId
  );

  return (
    <Box w="full">
      <HStack justify="space-between">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {token?.extension.name}
          </Text>
          <Text fontSize="xs" fontWeight="thin" fontStyle="light">
            Collection: <b>{collection?.contractInfo.name}</b>
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
          <Box>
            <Text fontSize="xs" textStyle="light">
              Floor price
            </Text>
            <Flex gap="2">
              <Text fontWeight="bold" fontSize="sm">
                {auctionState?.min_bid ?? 0}{" "}
                {auctionState?.coin_denom?.toUpperCase()}
              </Text>
              <Text fontSize="xs" textStyle="light">
                &asymp;$286
              </Text>
            </Flex>
          </Box>
          <Box>
            <Text fontSize="xs" textStyle="light">
              Highest Bid
            </Text>
            <Flex gap="2">
              <Text fontWeight="bold" fontSize="sm">
                {auctionState?.high_bidder_amount}{" "}
                {auctionState?.coin_denom?.toUpperCase()}
              </Text>
              <Text fontSize="xs" textStyle="light">
                &asymp;$286
              </Text>
            </Flex>
          </Box>
        </SimpleGrid>
        <Divider my="4" />
        <Flex gap="1" align="center">
          <Flame color="orange" width={14} />
          <Text fontSize="xs" fontWeight="bold">
            Sale ends 9 Oct 2022 at 05:00 am (GMT +05:30)
          </Text>
        </Flex>
        <SimpleGrid
          spacing="4"
          columns={3}
          mt="4"
          alignSelf="start"
          maxW="max-content"
          ml="1"
        >
          <Box>
            <Text fontWeight="bold" fontSize="md" ml="0.5">
              20
            </Text>
            <Text fontSize="xs" textStyle="light">
              Hours
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="md" ml="0.5">
              41
            </Text>
            <Text fontSize="xs" textStyle="light">
              Minutes
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="md" ml="0.5">
              55
            </Text>
            <Text fontSize="xs" textStyle="light">
              Seconds
            </Text>
          </Box>
        </SimpleGrid>
        <PlaceBidButton
          contractAddress={colConfig?.contractAddress ?? ""}
          auctionAddress={colConfig?.auctionAddress ?? ""}
          tokenId={tokenId}
          mt="4"
        >
          Place a bid
        </PlaceBidButton>
      </Box>
    </Box>
  );
};
export default Info;
