import { LINKS } from "@/utils/links";
import {
  Box,
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC, useMemo } from "react";
import CollectionRowToken from "./CollectionRowToken";
import { useAppUtils } from "@/lib/app/hooks";
import { useGetCw721, useGetCw721Tokens } from "@/lib/graphql/hooks/cw721";
import { IAuctionCollection } from "@/lib/app/types";

interface Cw721CollectionRowProps {
  collectionId: string;
}
const Cw721CollectionRow: FC<Cw721CollectionRowProps> = (props) => {
  const { collectionId } = props;
  const {getCollection} = useAppUtils()
  const collection = getCollection(collectionId) as IAuctionCollection;

  const { data: cw721} = useGetCw721(collection.cw721);
  const { data: allTokens } = useGetCw721Tokens(collection.cw721);

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
              {collection.name}
            </Text>
            {/* Replacing text with &nbsp; (space) to maintain height structures for displays */}
            <Box>
              <Text fontSize="xs" textStyle="light">
                &nbsp;
              </Text>
              <Text fontWeight="bold" fontSize="sm">
                &nbsp;
              </Text>
            </Box>
            <Flex gap="1" align="center">
              {/* <Flame color="orange" width={14} /> */}
              <Text>&nbsp;</Text>
              <Text fontSize="xs" fontWeight="bold">
                &nbsp;
              </Text>
            </Flex>
            <Link href={LINKS.collection(collectionId)} passHref>
              <Button as="a" w="full" mb="10">
                Explore Collection
              </Button>
            </Link>
          </Flex>
        </GridItem>
        {allTokens?.slice(0, 3).map((tokenId) => (
          <GridItem key={tokenId} alignSelf='center'>
            <CollectionRowToken tokenId={tokenId} collection={collection} contractAddress={collection.cw721} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default Cw721CollectionRow;
