import { useGetTokenFromColId, useGetTokens, useGetTokenUriObject } from "@/lib/graphql/hooks/collection";
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
import Info from "./Info";
import Overview from "./Overview";
import { ITokenUriObject } from "@/lib/graphql/hooks/collection/useGetTokenUriObject";
import { NFTInfo } from "@andromedaprotocol/andromeda.js";
interface TokenPageProps {
  tokenId: string;
  collectionId: string;
}
const TokenPage: FC<TokenPageProps> = (props) => {
  const { tokenId, collectionId } = props;
  const { data } = useGetTokenFromColId(collectionId, tokenId);
  const token: NFTInfo = data as NFTInfo;
  const { data: allTokens } = useGetTokens(collectionId);
  const [tokenUri, setTokenUri] = useState(token?.token_uri || "");
  //const [tokenUri, setTokenUri] = useState("https://api.npoint.io/2bcd2237db0af7620944");

  const { data: tokenUriObject } = useGetTokenUriObject(tokenUri);

  console.log(token);
  console.log("UriObj:");
  console.log(tokenUriObject);

  //Once token and tokenUriObject are present, then modify token object to incorporate all info 
  // parent canonical data supercedes the equivalent data in Uri Object for this display purpose.
  
  let updatedToken: NFTInfo | null = null;

  if (token && tokenUriObject){
     updatedToken = { ...token };
    // check for description
    const tokenDescription = token?.extension?.description;
    const uriObjectDescription = tokenUriObject?.description;

    if (!tokenDescription && uriObjectDescription?.length) {
      updatedToken.extension = { ...updatedToken.extension, description: uriObjectDescription }; 
    }

    // check for name
    const tokenName = token?.extension?.name;
    const uriObjectName = tokenUriObject?.name;

    if (!tokenName && uriObjectName) {
      updatedToken.extension = { ...updatedToken.extension, name: uriObjectName }; 
    }

    // check for image
    const tokenImage = token?.extension?.image;
    const uriObjectImage = tokenUriObject?.image;

    if (!tokenImage && uriObjectImage) {
      updatedToken.extension = { ...updatedToken.extension, image: uriObjectImage }; 
    }

    // check for image_data
    const tokenImageData = token?.extension?.image_data;
    const uriObjectImageData = tokenUriObject?.image_data;

    if (!tokenImageData && uriObjectImageData) {
      updatedToken.extension = { ...updatedToken.extension, image_data: uriObjectImageData }; 
    }

    // check for external_url/ 'token source url'
    const tokenExternalUrl = token?.extension?.external_url;
    const uriObjectExternalUrl = tokenUriObject?.external_url;

    if (!tokenExternalUrl && uriObjectExternalUrl) {
      updatedToken.extension = { ...updatedToken.extension, external_url: uriObjectExternalUrl }; 
    }

    // check for animation_url/ 'token media url'
    const tokenAnimationUrl = token?.extension?.animation_url;
    const uriObjectAnimationUrl = tokenUriObject?.animation_url;

    if (!tokenAnimationUrl && uriObjectAnimationUrl) {
      updatedToken.extension = { ...updatedToken.extension, animation_url: uriObjectAnimationUrl }; 
    }

    // check for youtube_url
    const tokenYoutubeUrl = token?.extension?.youtube_url;
    const uriObjectYoutubeUrl = tokenUriObject?.youtube_url;

    if (!tokenYoutubeUrl && uriObjectYoutubeUrl) {
      updatedToken.extension = { ...updatedToken.extension, youtube_url: uriObjectYoutubeUrl }; 
    }

    const combinedAttributes = [...token.extension.attributes]; 
    
    // if UriObject contains attributes, lets make sure 
    if (tokenUriObject.attributes){

      // Loop through the attributes of tokenUriObject
      tokenUriObject.attributes.forEach((attribute) => {
        
        // Check if there's a collision with an existing trait_type in combinedAttributes
        const existingIndex = combinedAttributes.findIndex((existingAttribute) => existingAttribute.trait_type === attribute.trait_type);
        if (existingIndex !== -1) {
          // If there's a collision, replace the existing attribute with the new one
          combinedAttributes[existingIndex] = attribute;
        } else {
          // If there's no collision, add the new attribute to the end of the array
          combinedAttributes.push(attribute);
        }
      });
    }

    updatedToken.extension = {...updatedToken.extension, attributes: combinedAttributes};
    
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
                <Tab>Bids</Tab>
                <Tab>History</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Overview token={displayToken || {}}/>
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
