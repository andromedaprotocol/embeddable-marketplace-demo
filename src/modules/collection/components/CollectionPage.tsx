import { useQueryCW721Info } from "@/lib/graphql";
import {
  Box,
  Divider,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { ICollection } from "../types";
import Header from "./Header";
import TokensList from "./TokensList";

interface CollectionPageProps {
  contractAddress: string;
}
const CollectionPage: FC<CollectionPageProps> = (props) => {
  const { contractAddress } = props;

  return (
    <Flex direction="column">
      <Box>{/* <Banner image={collection.contractInfo} /> */}</Box>
      <Box py="2">
        <Header contractAddress={contractAddress} />
      </Box>
      <Divider my="4" />
      <Box py="2">
        <Tabs colorScheme="purple">
          <TabList>
            <Tab>Items</Tab>
            <Tab>Activity</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TokensList contractAddress={contractAddress} />
            </TabPanel>
            <TabPanel>Activity</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};
export default CollectionPage;
