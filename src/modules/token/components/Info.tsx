import { useGetTokenAuctionState } from "@/lib/graphql/hooks/auction";
import { useGetToken, useGetCollection } from "@/lib/graphql/hooks/collection";
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
import React, { FC } from "react";

interface InfoProps {
  tokenId: string;
  collectionId: string;
}
const Info: FC<InfoProps> = (props) => {
  const { tokenId, collectionId } = props;
  const { data: collection } = useGetCollection(collectionId);
  const { data: token } = useGetToken(collectionId, tokenId);
  const { data: auctionState } = useGetTokenAuctionState(collectionId, tokenId);

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
                {auctionState?.min_bid ?? 0} {auctionState?.coin_denom?.toUpperCase()}
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
                {auctionState?.high_bidder_amount} {auctionState?.coin_denom?.toUpperCase()}
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
        <Button mt="4" w="full" variant="solid">
          Place a bid
        </Button>
      </Box>
    </Box>
  );
};
export default Info;
