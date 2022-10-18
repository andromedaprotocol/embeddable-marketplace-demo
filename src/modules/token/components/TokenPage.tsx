import { useGetToken, useGetTokens } from "@/lib/graphql/hooks/collection";
import {
  Box,
  GridItem,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";
import Card from "./Card";
import Info from "./Info";
import Overview from "./Overview";

interface TokenPageProps {
  tokenId: string;
  collectionId: string;
}
const TokenPage: FC<TokenPageProps> = (props) => {
  const { tokenId, collectionId } = props;
  const { data: token } = useGetToken(collectionId, tokenId);
  const { data: allTokens } = useGetTokens(collectionId);

  return (
    <Box>
      <SimpleGrid columns={2}>
        <GridItem>
          <Box>
            <Image
              src={token?.extension.image}
              alt="Image"
              borderRadius="lg"
              maxW="md"
            />
          </Box>
          <Box py="2" mt="12">
            <Tabs colorScheme="purple">
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Properties</Tab>
                <Tab>Bids</Tab>
                <Tab>History</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Overview />
                </TabPanel>
                <TabPanel>Properties</TabPanel>
                <TabPanel>Bids</TabPanel>
                <TabPanel>History</TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
        <GridItem>
          <Box maxW="sm" ml="auto" position="sticky" top="4">
            <Info tokenId={tokenId} collectionId={collectionId} />
          </Box>
        </GridItem>
      </SimpleGrid>
      <Box mt="24">
        <Text fontWeight="bold" fontSize="xl">
          More from this collection
        </Text>
        <SimpleGrid mt="8" columns={4} spacing="4">
          {allTokens?.slice(0, 4).map((tokenId) => (
            <Card key={tokenId} tokenId={tokenId} collectionId={collectionId} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
export default TokenPage;
