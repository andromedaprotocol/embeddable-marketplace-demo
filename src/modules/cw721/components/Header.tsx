import { IBaseCollection } from "@/lib/app/types";
import { useGetCw721 } from "@/lib/graphql/hooks/cw721";
import { Box, Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface HeaderProps {
  contractAddress: string;
  collection: IBaseCollection;
}
const Header: FC<HeaderProps> = (props) => {
  const { contractAddress, collection } = props;
  const { data: cw721 } = useGetCw721(contractAddress);

  return (
    <Grid templateColumns="repeat(2,1fr)" gap="4" py="2">
      <GridItem colSpan={1}>
        <Flex direction="column" gap="2" align="start" maxW="md">
          <Text fontSize="2xl" fontWeight="bold">
            {cw721?.contractInfo.name}
          </Text>
          <Text textStyle="light" fontSize="sm">
            Minter - <b>{cw721?.minter}</b>
          </Text>
          <Text fontWeight="light" fontSize="sm" mt="2">
            {collection?.description}
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
