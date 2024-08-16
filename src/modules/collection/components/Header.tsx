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
    <Grid templateColumns="repeat(2,1fr)" gap="4" py="2" data-testid="header">
      <GridItem colSpan={1}>
        <Flex direction="column" gap="2" align="start" maxW="md" data-testid="header-left">
          <Text fontSize="2xl" fontWeight="bold" data-testid="collection-name">
            {collection.name}
          </Text>
          <Text textStyle="light" fontSize="sm" data-testid="collection-creator">
            Created by <b>0x64fe0...fec9</b>
          </Text>
          <Text fontWeight="light" fontSize="sm" mt="2" data-testid="collection-description">
            {collection.description}
          </Text>
        </Flex>
      </GridItem>
      <GridItem colSpan={1} data-testid="header-right">
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
    <Box data-testid="stat">
      <Text fontSize="xs" textStyle="light" data-testid="stat-label">
        {label}
      </Text>
      <Text fontWeight="medium" fontSize="md" data-testid="stat-value">
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
