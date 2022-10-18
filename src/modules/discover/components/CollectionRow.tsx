import { useQueryCW721Info } from "@/lib/graphql";
import useQueryCW721Tokens from "@/lib/graphql/hooks/cw721/useQueryCw721Tokens";
import { LINKS } from "@/utils/links";
import {
  Box,
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Flame } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import CollectionRowToken from "./CollectionRowToken";

interface CollectionRowProps {
  contractAddress: string;
}
const CollectionRow: FC<CollectionRowProps> = (props) => {
  const { contractAddress } = props;
  const { data: collection } = useQueryCW721Info(contractAddress);
  const { data: allTokens } = useQueryCW721Tokens(contractAddress);

  return (
    <Box p="12" rounded="2xl" bg="gray.100">
      <SimpleGrid columns={4} spacing="4">
        <GridItem>
          <Flex direction="column" gap="4" alignItems="start">
            {/* <Image
              rounded="2xl"
              bottom="4"
              left="4"
              border="2px solid white"
              alt="Image"
              h="24"
              fit="contain"
            /> */}
            <Text fontSize="xl" fontWeight="bold">
              {collection?.contractInfo.name}
            </Text>
            <Box>
              <Text fontSize="xs" textStyle="light">
                Highest Bid
              </Text>
              <Text fontWeight="bold" fontSize="sm">
                13.65 STARS
              </Text>
            </Box>
            <Flex gap="1" align="center">
              <Flame color="orange" width={14} />
              <Text fontSize="xs" fontWeight="bold">
                Ends 3 Days
              </Text>
            </Flex>
            <Link href={LINKS.collection(contractAddress)} passHref>
              <Button as="a" w="full" mb="10">
                Explore Collection
              </Button>
            </Link>
          </Flex>
        </GridItem>
        {allTokens?.slice(0, 3).map((tokenId) => (
          <GridItem key={tokenId}>
            <CollectionRowToken
              tokenId={tokenId}
              contractAddress={contractAddress}
            />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default CollectionRow;
