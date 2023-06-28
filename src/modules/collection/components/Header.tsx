import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import { Box, Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface HeaderProps {
  collectionId: string;
}
const Header: FC<HeaderProps> = (props) => {
  const { collectionId } = props;
  const collection = useGetCollection(collectionId);

  return (
    <Grid templateColumns="repeat(2,1fr)" gap="4" py="2">
      <GridItem colSpan={1}>
        <Flex direction="column" gap="2" align="start" maxW="md">
          <Text fontSize="2xl" fontWeight="bold">
            {collection.name}
          </Text>
          <Text textStyle="light" fontSize="sm">
            Created by <b>0x64fe0...fec9</b>
          </Text>
          <Text fontWeight="light" fontSize="sm" mt="2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, orci sit amet eleifend facilisis,
             arcu eros gravida massa, id pharetra dui nisi a leo. Integer a tellus elit. Proin quis venenatis magna... <b>Read more</b>
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={1}>
        {/* <Box>
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
            {STATS.map((stat) => (
              <Stat key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </HStack>
        </Box> */}
      </GridItem>
    </Grid>
  );
};

interface StatProps {
  label: string;
  value: string;
}
const Stat: FC<StatProps> = (props) => {
  const { label, value } = props;

  return (
    <Box>
      <Text fontSize="xs" textStyle="light">
        {label}
      </Text>
      <Text fontWeight="medium" fontSize="md">
        {value}
      </Text>
    </Box>
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
