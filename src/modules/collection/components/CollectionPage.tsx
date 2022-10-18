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
import Header from "./Header";
import TokensList from "./TokensList";

interface CollectionPageProps {
  collectionId: string;
}
const CollectionPage: FC<CollectionPageProps> = (props) => {
  const { collectionId } = props;

  return (
    <Flex direction="column">
      <Box>{/* <Banner image={collection.contractInfo} /> */}</Box>
      <Box py="2">
        <Header collectionId={collectionId} />
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
              <TokensList collectionId={collectionId} />
            </TabPanel>
            <TabPanel>Activity</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};
export default CollectionPage;
