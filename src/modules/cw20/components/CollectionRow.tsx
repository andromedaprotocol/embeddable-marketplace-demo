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
import React, { FC } from "react";
import CollectionRowItem from "./CollectionRowItem";
import { useAppUtils } from "@/lib/app/hooks";
import { useGetSaleAssets } from "@/lib/graphql/hooks/exchange";
import { IExchangeCollection } from "@/lib/app/types";
import useApp from "@/lib/app/hooks/useApp";

interface Cw20CollectionRowProps {
  collectionId: string;
}
const Cw20CollectionRow: FC<Cw20CollectionRowProps> = (props) => {
  const { collectionId } = props;
  const {getCollection} = useAppUtils();
  const collection = getCollection(collectionId) as IExchangeCollection;


  const { data } = useGetSaleAssets(collection.exchange);

  return (
    <Box p="12" rounded="2xl" bg="gray.100">
      <SimpleGrid columns={4} spacing="4">
        <GridItem>
          <Flex direction="column" gap="4" alignItems="start">
            <Text fontSize="xl" fontWeight="bold">
              {collection.name}
            </Text>
            <Box>
              <Text fontSize="xs" textStyle="light">
                &nbsp;
              </Text>
              <Text fontWeight="bold" fontSize="sm">
                &nbsp;
              </Text>
            </Box>
            <Flex gap="1" align="center">
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
        {data?.saleAssets?.slice(0, 3).map((asset) => (
          <GridItem key={asset} alignSelf='center'>
            <CollectionRowItem collection={collection} contractAddress={collection.exchange} cw20={data.tokenAddress} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default Cw20CollectionRow;
