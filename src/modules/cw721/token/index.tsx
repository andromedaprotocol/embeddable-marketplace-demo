import { useGetCw721, useGetCw721Token, useGetCw721Tokens } from "@/lib/graphql/hooks/cw721";
import { Box, GridItem, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import Cw721TokenCard from "../components/Cw721TokenCard";
import Overview from "./Overview";
import Properties from "./Properties";
import { ICollectionCw721, ICollectionType } from "@/lib/app/types";
import Cw721AuctionBids from "@/modules/auction/Cw721Bids";
import Cw721TokenAction from "./TokenAction";
import FallbackImage from "@/modules/common/ui/Image/FallbackImage";

interface Props {
    contractAddress: string;
    collection: ICollectionCw721;
    tokenId: string;
}

const Cw721TokenPage: FC<Props> = (props) => {
    const { contractAddress, tokenId, collection } = props;
    const { data: token } = useGetCw721Token(contractAddress, tokenId);
    const { data: allTokens } = useGetCw721Tokens(contractAddress);

    return (
        <Box data-testid="cw721-token-page">
            <SimpleGrid columns={2}>
                <GridItem>
                    <Box data-testid="token-image">
                        <FallbackImage
                            src={token?.metadata?.image}
                            alt="Image"
                            borderRadius="lg"
                            maxW="md"
                        />
                    </Box>
                    <Box py="2" mt="12" data-testid="token-details-tabs">
                        <Tabs colorScheme="purple">
                            <TabList>
                                <Tab data-testid="tab-overview">Overview</Tab>
                                <Tab data-testid="tab-properties">Properties</Tab>
                                {collection.type === ICollectionType.AUCTION &&
                                    <Tab data-testid="tab-bids">Bids</Tab>
                                }
                                {collection.type === ICollectionType.MARKETPLACE &&
                                    <Tab data-testid="tab-history">History</Tab>
                                }
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Overview tokenId={tokenId} contractAddress={contractAddress} collection={props.collection} />
                                </TabPanel>
                                <TabPanel>
                                    {token?.metadata && (
                                        <Properties metadata={token.metadata} />
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
                    <Box maxW="sm" ml="auto" position="sticky" top="4" data-testid="token-action">
                        <Cw721TokenAction
                            collection={collection}
                            tokenId={tokenId}
                        />
                    </Box>
                </GridItem>
            </SimpleGrid>
            <Box mt="24" data-testid="more-from-collection">
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
                            data-testid={`more-token-${tokenId}`}
                        />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default Cw721TokenPage;
