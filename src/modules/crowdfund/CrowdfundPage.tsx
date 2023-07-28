import { IBaseCollection, ICrowdfundCollection } from "@/lib/app/types";
import { Box, Divider, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"
import Header from "./Header";
import CrowdfundTokensList from "./CrowdfundTokensList";

interface Props {
    collection: ICrowdfundCollection;
}

const CrowdfundPage: FC<Props> = (props) => {
    const { collection } = props;
    return (
        <Flex direction="column">
            <Box>{/* <Banner image={collection.contractInfo} /> */}</Box>
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
                            <CrowdfundTokensList collectionId={collection.id} contractAddress={collection.crowdfund} />
                        </TabPanel>
                        <TabPanel>Activity</TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Flex>
    )
}

export default CrowdfundPage