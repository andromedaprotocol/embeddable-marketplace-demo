import { useGetCollection } from "@/lib/graphql/hooks/collection";
import { Box, Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface HeaderProps {
  collectionId: string;
}
const Header: FC<HeaderProps> = (props) => {
  const { collectionId } = props;
  const { data: collection } = useGetCollection(collectionId);

  return (
    <Grid templateColumns="repeat(2,1fr)" gap="4" py="2">
      <GridItem colSpan={1}>
        <Flex direction="column" gap="2" align="start" maxW="md">
          <Text fontSize="2xl" fontWeight="bold">
            {collection?.contractInfo.name}
          </Text>
          <Text textStyle="light" fontSize="sm">
            Created by <b>0x64fe0...fec9</b>
          </Text>
          <Text fontWeight="light" fontSize="sm" mt="2">
            To demonstrate how “location based NFTs” can drive utility, we went
            ahead and created unique collection we affectionately refer to as
            Banded Armadillo Rock Club ™... <b>Learn more</b>
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={1}>
        <Box>
          <HStack
            align="start"
            border="1px"
            borderColor="gray.300"
            rounded="2xl"
            p="4"
            gap="2"
            ml="auto"
            maxW="max-content"
          >
            {STATS.map((s) => (
              <Box key={s.label}>
                <Text fontSize="xs" textStyle="light">
                  {s.label}
                </Text>
                <Text fontWeight="medium" fontSize="md">
                  {s.value}
                </Text>
              </Box>
            ))}
          </HStack>
        </Box>
      </GridItem>
    </Grid>
  );
};

const STATS = [
  {
    label: "Highest Sale",
    value: "459.3K UST",
  },
  {
    label: "Floor Price",
    value: "67.1K UST",
  },
  {
    label: "Market Cap",
    value: "891.4M UST",
  },
  {
    label: "Items",
    value: "10K",
  },
  {
    label: "Owners",
    value: "5,992",
  },
  {
    label: "Total Volume",
    value: "267.9 UST",
  },
];

export default Header;
