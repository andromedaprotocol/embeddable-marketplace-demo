import { ICollection } from "@/modules/collection/types";
import { LINKS } from "@/utils/links";
import { NFT_TRENDING } from "@/utils/seed";
import {
  Box,
  Button,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Flame } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface CollectionRowProps {
  collection: ICollection;
}
const CollectionRow: FC<CollectionRowProps> = (props) => {
  const { collection } = props;

  return (
    <Box p="12" rounded="2xl" bg="gray.100">
      <SimpleGrid columns={4} spacing="4">
        <GridItem>
          <Flex direction="column" gap="4" alignItems="start">
            <Image
              rounded="2xl"
              bottom="4"
              left="4"
              border="2px solid white"
              src={collection.image}
              alt="Image"
              h="24"
              fit="contain"
            />
            <Text fontSize="xl" fontWeight="bold">
              {collection.name}
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
            <Link href={LINKS.collection(collection.slug)} passHref>
              <Button as="a" w="full" mb="10">
                Explore Collection
              </Button>
            </Link>
          </Flex>
        </GridItem>
        {NFT_TRENDING.sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((token) => (
            <GridItem key={token.id}>
              <Link href={LINKS.token(token.id)}>
                <Flex
                  cursor="pointer"
                  direction="column"
                  justifyContent="end"
                  bg={`url(${token.image}), linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 60%)`}
                  bgBlendMode="darken"
                  w="full"
                  h="full"
                  rounded="2xl"
                  bgPos="center"
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  p="6"
                >
                  <Text fontWeight="bold" color="white">
                    {token.name}
                  </Text>
                </Flex>
              </Link>
            </GridItem>
          ))}
      </SimpleGrid>
    </Box>
  );
};
export default CollectionRow;
