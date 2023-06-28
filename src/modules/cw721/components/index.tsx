import { Box, Divider, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { FC } from "react"
import Header from "./Header";
import { IBaseCollection } from "@/lib/app/types";
import Cw721TokensList from "./Cw721TokensList";

interface Props {
    collection: IBaseCollection;
    contractAddress: string;
}

const Cw721Page: FC<Props> = (props) => {
    const { collection, contractAddress } = props;
    return (
        <Flex direction="column">
            <Box>{/* <Banner image={collection.contractInfo} /> */}</Box>
            <Box py="2">
                <Header collection={collection} contractAddress={contractAddress} />
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
                            <Cw721TokensList collectionId={collection.id} contractAddress={contractAddress} />
                        </TabPanel>
                        <TabPanel>Activity</TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Flex>
    )
}

export default Cw721Page