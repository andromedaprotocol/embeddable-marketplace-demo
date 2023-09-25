"use client";
import { Box, GridItem, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import EmbeddableList from "./List";
import NoClientLayout from "@/modules/common/layout/components/NoClientLayout";

interface HomePageProps {
  apps: string[]
}
const HomePage: FC<HomePageProps> = (props) => {
  const { apps } = props;
  return (
    <NoClientLayout>
      <Box>
        <Heading textAlign={'start'} fontWeight='600' fontSize={'24px'}>
          Explore Apps created by community
        </Heading>
        <EmbeddableList apps={apps} />
      </Box>
    </NoClientLayout>
  );
};
export default HomePage;
