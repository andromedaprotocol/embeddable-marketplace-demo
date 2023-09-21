"use client";
import { Box, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import AppRow from "./AppRow";
import Featured from "./Featured";

interface HomePageProps {
  apps: string[]
}
const HomePage: FC<HomePageProps> = (props) => {
  const { apps } = props;
  return (
    <Box>
      <Box mt="4">
        <Featured />
      </Box>
      <Text fontSize="xl" fontWeight="bold" mt="16">
        Explore Apps created by community
      </Text>
      <SimpleGrid mt="10" columns={3} spacing="4">
        {apps.map((app) => (
          <GridItem key={app}>
            <AppRow appId={app} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default HomePage;
