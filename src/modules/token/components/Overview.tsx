import { DiscordIcon, DownloadIcon, ShareIcon, TwitterIcon, ExternalLinkIcon, FolderOpenIcon } from "@/modules/common/icons";
import { NFTInfo } from "@andromedaprotocol/andromeda.js";
import { Box, Divider, Flex, Icon, Link, Text, Image, Modal, Button, Heading, Textarea } from "@chakra-ui/react";
import { Share } from "lucide-react";
import React, { FC, useState } from "react";
import useApp from "@/lib/app/hooks/useApp";
import { useChainConfig } from "@/lib/graphql/hooks/chain";
import { ITokenUriObject } from "@/lib/graphql/hooks/collection/useGetTokenUriObject";


interface OverviewProps {
   token:NFTInfo;
   cw721:{
    name?: string;
    symbol?: string;
    address?: string;
    id?: string;
   };
   tokenId: string;
   tokenUriObject: ITokenUriObject;
   adoType: string;
}
const Overview: FC<OverviewProps> = (props) => {
  const  token  = props.token;
  const cw721 = props.cw721;
  const domain = window.location.hostname;
  const tokenId = props.tokenId;
  const tokenUriObject = props.tokenUriObject;
  const adoType = props.adoType;
  const encodedName = encodeURIComponent(token.extension.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metadata, setMetadata] = useState(null);
  let encodedImage = "";
  if (token.extension.image){
    encodedImage = token.extension.image;
  }

  const twitterUrl = `https://twitter.com/intent/tweet?url=https://${domain}/collection/${cw721.id}/${tokenId}&text=${encodedName}&media=${encodedImage}`;
 
  const {
    config,
  } = useApp();
  const { data: chainConfig } = useChainConfig(config.chainId ?? "");

  console.log("Overview Token:", token);
  console.log("cw721", cw721.address);
  console.log("domain", domain);
  console.log("tokenId", tokenId);
  console.log("config?", config);

  const handleViewMetadataClick = () => {
    // Set the metadata object to be displayed in the modal
    setMetadata(tokenUriObject? tokenUriObject:{});
    setIsModalOpen(true);
  };
  const handleCopyContentsClick = () => {
    // Copy the metadata object to the clipboard
    navigator.clipboard.writeText(JSON.stringify(metadata));
  };

  function embededYTLink (youTubeUrl: string) {
    const videoId = youTubeUrl.includes("youtu.be/")
    ? youTubeUrl.substring(youTubeUrl.lastIndexOf("/") + 1)
    : youTubeUrl.split("v=")[1];
    const embedYTLink = `https://www.youtube.com/embed/${videoId}`;
    return embedYTLink;

  }

  return (
<>
    <Box>
      <Text fontWeight="bold" fontSize="xl">
        Description
      </Text>
      <Text mt="4" fontWeight="light" fontSize="sm">
        {token.extension?.description}
      </Text>
      <Text fontWeight="bold" fontSize="xl" mt="8">
        Details
      </Text>
      <Box mt="4" p="10" rounded="2xl" border="1px" borderColor="gray.300">
      <Box display="flex" justifyContent="space-between" alignItems="center" pl={2}>
        <Link href={"/collection/"+cw721.id}>{cw721.name}</Link> 
        <Flex justifyContent="flex-end">
          <Box display="inline-block" border="1px" borderColor="gray.300" borderRadius="md" px="9px" py="8px" ml="5px">
          <Link href={twitterUrl} target={"_blank"}>
              <TwitterIcon w={5} h={5}/>
              </Link>
          </Box>
           <Box display="inline-block" border="1px" borderColor="gray.300" borderRadius="md" px="9px" py="8px" ml="5px">
              <Share w={5} h={5}/>
          </Box>
        </Flex>
        </Box>
          <Divider orientation='horizontal' mt="7" />
          <Box display="flex" flexDirection="column">

            <Link href={chainConfig?.chainUrl} target="_blank">
              <Box px="9px" mt="10px" display="inline-flex" alignItems="center">
                <Image src={chainConfig?.iconUrls?.sm} alt={chainConfig?.chainName+" icon"} mr="10px" width="22px" />
                <Text>{chainConfig?.chainName}</Text>{chainConfig?.chainType === "testnet" ? <Text ml="5px" fontSize={"small"}>(testnet)</Text> : null}
              </Box>
            </Link>
            <Link href={chainConfig?.blockExplorerAddressPages[0].replace('${address}', '') + cw721.address} target="_blank">
              <Box px="9px" mt="10px" display="inline-flex" alignItems="center">
                <ExternalLinkIcon mr="10px"  />
                <Text>View on Explorer</Text>
              </Box>
            </Link>
            <Link href="#" onClick={handleViewMetadataClick}>
              <Box px="9px" mt="10px" display="inline-flex" alignItems="center">
                <FolderOpenIcon mr="10px" />
                <Text>View Metadata</Text>
              </Box>
            </Link>
     
          </Box>
        
      </Box>

    { token.extension.youtube_url && token.extension.youtube_url.length > 10 && (
    <>
      <Text fontWeight="bold" fontSize="xl" mt="8">
       Video:
      </Text>
      <Box mt="4" p="10" rounded="2xl" border="1px" borderColor="gray.300" display="flex" alignItems="center" justifyContent="center">
        <iframe width="640" height="360"
        src={embededYTLink(token.extension.youtube_url)}>
        </iframe>
      </Box>
    </>
    )}
</Box>
{isModalOpen && (
   <Box
   pos="fixed"
   top="0"
   left="0"
   right="0"
   bottom="0"
   bg="rgba(0,0,0,0.8)"
   display="flex"
   alignItems="center"
   justifyContent="center"
>
<Box
                p="4"
                bg="white"
                maxW="800px"
                w="100%"
                borderRadius="md"
                boxShadow="lg"
            >
               <Heading as="h3" size="md" mb="4">
                Metadata Object
                </Heading>
                <Box position="relative">
                <Textarea
                        rows={10}
                        value={JSON.stringify(metadata, null, 2)}
                        readOnly
                        
                        resize="none"
                        
                    />
                    <Button mr="10px" onClick={() => setIsModalOpen(false)}>Close</Button>
               <Button onClick={handleCopyContentsClick}>Copy Contents</Button>
                </Box>
  
      </Box>
    </Box>
      )}
      </>
  );
};
export default Overview;
