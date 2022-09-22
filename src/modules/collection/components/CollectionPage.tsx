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
import Banner from "./Banner";
import Header from "./Header";
import TokensList from "./TokensList";

interface CollectionPageProps {
  collection: ICollection;
}
const CollectionPage: FC<CollectionPageProps> = (props) => {
  const { collection } = props;

  return (
    <Flex direction="column">
      <Box>
        <Banner image={collection.image} />
      </Box>
      <Box py="2">
        <Header collection={collection} />
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
              <TokensList collection={collection} />
            </TabPanel>
            <TabPanel>Activity</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};
export default CollectionPage;
