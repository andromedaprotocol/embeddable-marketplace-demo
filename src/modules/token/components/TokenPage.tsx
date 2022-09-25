import { NFT_TRENDING } from "@/utils/seed";
import {
  Box,
  Flex,
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
import { TokenCard } from ".";
import { IToken } from "../types";
import Info from "./Info";
import Overview from "./Overview";

interface TokenPageProps {
  token: IToken;
}
const TokenPage: FC<TokenPageProps> = (props) => {
  const { token } = props;

  return (
    <Box>
      <SimpleGrid columns={2} mt="10">
        <GridItem>
          <Box>
            <Image src={token.image} alt="Image" borderRadius="lg" maxW="md" />
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
                  <Overview token={token} />
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
            <Info token={token} />
          </Box>
        </GridItem>
      </SimpleGrid>
      <Box mt='24'>
        <Text fontWeight="bold" fontSize="xl">
          More from this collection
        </Text>
        <SimpleGrid mt='8' columns={4} spacing='4'>
          {NFT_TRENDING.slice(0, 4).map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
export default TokenPage;
