import { useGetTokenFromColId, useGetTokens, useGetTokenUriObject, useGetCollection } from "@/lib/graphql/hooks/collection";
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
import React, { FC, useState } from "react";
import Card from "./Card";
import AuctionInfo from "./AuctionInfo";
import Overview from "./Overview";
import Bids from "./Bids";
import { ITokenUriObject } from "@/lib/graphql/hooks/collection/useGetTokenUriObject";
import { NFTInfo } from "@andromedaprotocol/andromeda.js";
import Properties from "./Properties";
import useApp from "@/lib/app/hooks/useApp";
import MarketplaceInfo from "./MarketplaceInfo";
import AuctionCard from "./AuctionCard";
import MarketplaceCard from "./MarketplaceCard";
import CrowdfundInfo from "./CrowdfundInfo";
interface TokenPageProps {
  tokenId: string;
  collectionId: string;
}
const TokenPage: FC<TokenPageProps> = (props) => {
  const { tokenId, collectionId } = props;
  const { data } = useGetTokenFromColId(collectionId, tokenId);
  const {data: cw721Data, error: cw721Error} = useGetCollection(collectionId);
  const token: NFTInfo = data as NFTInfo;
  const { data: allTokens } = useGetTokens(collectionId);
  const [tokenUri, setTokenUri] = useState(token?.token_uri || "");
  
  // from app address and collectionId ( from url ) go and get the cw721 address and name of the collection.
  let cw721Obj = {};
  if (cw721Data){
    cw721Obj = {
      name: cw721Data.contractInfo.name,
      symbol: cw721Data.contractInfo.symbol,
      address: cw721Data.address,
      id: collectionId
    }
  }

  //determine if token is any of the following state:
  // 1. Auction
  // 2. Market
  // 3. Crowdfund
  interface Collection {
    auctionAddress?: string;
    marketplaceAddress?: string;
    crowdfundAddress?: string;
  }
  const {
    config,
  } = useApp();

  const currentCollection: Collection | {} =  config.collections.find(collection => collection.id === collectionId) || {};
  
  // type of ADO for token page commerce functionality. 
  // depending on which type: auction, marketplace, crowdfund, etc...
  // will determine functionality.
  let adoType = "";
  let adoAddress = "";


  if ('auctionAddress' in currentCollection && currentCollection.auctionAddress && currentCollection.auctionAddress.length > 0) {
    adoType = "auction";
    adoAddress = currentCollection.auctionAddress;
  } else if ('marketplaceAddress' in currentCollection && currentCollection.marketplaceAddress && currentCollection.marketplaceAddress.length > 0) {
    adoType = "marketplace";
    adoAddress = currentCollection.marketplaceAddress;
  } else if ('crowdfundAddress' in currentCollection && currentCollection.crowdfundAddress && currentCollection.crowdfundAddress.length > 0) {
    adoType = "crowdfund";
    adoAddress = currentCollection.crowdfundAddress;
  }

  

  const { data: tokenUriObject } = useGetTokenUriObject(tokenUri);

  
  //Once token and tokenUriObject are present, then modify token object to incorporate all info 
  // parent canonical data supercedes the equivalent data in Uri Object for this display purpose.
  
  let updatedToken: NFTInfo | null = null;

  if (token && tokenUriObject){
     updatedToken = { ...token };
    // check for description
   
    const uriObjectDescription = tokenUriObject?.description;

    if ( uriObjectDescription?.length) {
      updatedToken.extension = { ...updatedToken.extension, description: uriObjectDescription }; 
    }

    // check for name
    const uriObjectName = tokenUriObject?.name;

    if (uriObjectName) {
      updatedToken.extension = { ...updatedToken.extension, name: uriObjectName }; 
    }

    // check for image
    const uriObjectImage = tokenUriObject?.image;

    if (uriObjectImage) {
      updatedToken.extension = { ...updatedToken.extension, image: uriObjectImage }; 
    }

    // check for image_data
    const uriObjectImageData = tokenUriObject?.image_data;

    if (uriObjectImageData) {
      updatedToken.extension = { ...updatedToken.extension, image_data: uriObjectImageData }; 
    }

    // check for external_url/ 'token source url'
    const uriObjectExternalUrl = tokenUriObject?.external_url;

    if (uriObjectExternalUrl) {
      updatedToken.extension = { ...updatedToken.extension, external_url: uriObjectExternalUrl }; 
    }

    // check for animation_url/ 'token media url'
   const uriObjectAnimationUrl = tokenUriObject?.animation_url;

    if (uriObjectAnimationUrl) {
      updatedToken.extension = { ...updatedToken.extension, animation_url: uriObjectAnimationUrl }; 
    }

    // check for youtube_url
    const uriObjectYoutubeUrl = tokenUriObject?.youtube_url;

    if (uriObjectYoutubeUrl) {
      updatedToken.extension = { ...updatedToken.extension, youtube_url: uriObjectYoutubeUrl }; 
    }

    const combinedAttributes = tokenUriObject?.attributes; 
    if (combinedAttributes){
      updatedToken.extension = {...updatedToken.extension, attributes: combinedAttributes};
    }
  }
  const displayToken = updatedToken || token;
  
  console.log('Display Token:', displayToken)

  return (
    <Box>
      <SimpleGrid columns={2}>
        <GridItem>
          <Box>
            <Image
              src={displayToken?.extension.image}
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
                {adoType==="auction" &&
                  <Tab>Bids</Tab>
                }
                {adoType==="marketplace" &&
                  <Tab>History</Tab>
                }
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Overview adoType={adoType} token={displayToken || {}} cw721={cw721Obj || {}} tokenId={tokenId} tokenUriObject={tokenUriObject|| {}}/>
                </TabPanel>
                <TabPanel>
                  <Properties token={displayToken || {}}/>
                </TabPanel>
                {adoType==="auction" && 
                  <TabPanel>
                    <Bids adoType={adoType} adoAddress={adoAddress} token={displayToken || {}} cw721={cw721Obj || {}} tokenId={tokenId} tokenUriObject={tokenUriObject|| {}}/>
                  </TabPanel>}
                {adoType==="marketplace" && <TabPanel>History</TabPanel>}
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
        <GridItem>
          <Box maxW="sm" ml="auto" position="sticky" top="4">
            {adoType === "auction" &&
            <AuctionInfo tokenId={tokenId} collectionId={collectionId}  />
            }
            {adoType==="marketplace" &&
            <MarketplaceInfo tokenId={tokenId} collectionId={collectionId} adoAddress={adoAddress} cw721Address={cw721Data?.address||""} />
            }
            {adoType==="crowdfund" &&
              <CrowdfundInfo tokenId={tokenId} collectionId={collectionId} adoAddress={adoAddress} cw721Address={cw721Data?.address||""} />
            }

          </Box>
        </GridItem>
      </SimpleGrid>
      <Box mt="24">
        <Text fontWeight="bold" fontSize="xl">
          More from this collection
        </Text>
        <SimpleGrid mt="8" columns={4} spacing="4">
          {allTokens?.slice(0, 4).map((tokenId) => (
            <>
              {adoType === "auction" && (
                <AuctionCard key={tokenId} tokenId={tokenId} collectionId={collectionId} />
              )}

              {adoType === "marketplace" && (
                <MarketplaceCard key={tokenId} tokenId={tokenId} collectionId={collectionId} />
              )}
            </>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
export default TokenPage;
