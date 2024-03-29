import { useGetCw721, useGetCw721Token, useGetCw721Tokens } from "@/lib/graphql/hooks/cw721";
import { Box, GridItem, Image, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React, { FC } from "react"
import Cw721TokenCard from "../components/Cw721TokenCard";
import Overview from "./Overview";
import Properties from "./Properties";
import { ICollection, ICollectionType } from "@/lib/app/types";
import Cw721AuctionBids from "@/modules/auction/Cw721Bids";
import AuctionInfo from "@/modules/auction/AuctionInfo";
import MarketplaceInfo from "@/modules/marketplace/MarketplaceInfo";
import Cw721TokenAction from "./TokenAction";

interface Props {
    contractAddress: string;
    collection: ICollection;
    tokenId: string;
}

const Cw721TokenPage: FC<Props> = (props) => {
    const { contractAddress, tokenId, collection } = props;
    const { data: cw721 } = useGetCw721(contractAddress);
    const { data: token } = useGetCw721Token(contractAddress, tokenId)
    const { data: allTokens } = useGetCw721Tokens(contractAddress)
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
                                {collection.type === ICollectionType.AUCTION &&
                                    <Tab>Bids</Tab>
                                }
                                {collection.type === ICollectionType.MARKETPLACE &&
                                    <Tab>History</Tab>
                                }
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Overview tokenId={tokenId} contractAddress={contractAddress} collection={props.collection} />
                                </TabPanel>
                                <TabPanel>
                                    {token && (
                                        <Properties token={token} />
                                    )}
                                </TabPanel>
                                {collection.type === ICollectionType.AUCTION &&
                                    <TabPanel>
                                        <Cw721AuctionBids auctionAddress={collection.auction} tokenAddress={contractAddress} tokenId={tokenId} />
                                    </TabPanel>
                                }
                                {collection.type === ICollectionType.MARKETPLACE &&
                                    <TabPanel>History</TabPanel>
                                }
                            </TabPanels>
                        </Tabs>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box maxW="sm" ml="auto" position="sticky" top="4">
                        <Cw721TokenAction
                            collection={collection}
                            tokenId={tokenId}
                        />
                    </Box>
                </GridItem>
            </SimpleGrid>
            <Box mt="24">
                <Text fontWeight="bold" fontSize="xl">
                    More from this collection
                </Text>
                <SimpleGrid mt="8" columns={4} spacing="4">
                    {allTokens?.slice(0, 4).map((tokenId) => (
                        <Cw721TokenCard
                            key={tokenId}
                            tokenId={tokenId}
                            collectionId={props.collection.id}
                            contractAddress={contractAddress}
                        />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    )
}

export default Cw721TokenPage