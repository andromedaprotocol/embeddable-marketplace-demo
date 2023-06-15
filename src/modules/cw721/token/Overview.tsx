import { TwitterIcon, ExternalLinkIcon, FolderOpenIcon } from "@/modules/common/icons";
import { Box, Divider, Flex, Link, Text, Image, Button, Heading, Textarea } from "@chakra-ui/react";
import { Share } from "lucide-react";
import React, { FC, useMemo, useState } from "react";
import useApp from "@/lib/app/hooks/useApp";
import { useChainConfig } from "@/lib/graphql/hooks/chain";
import { IBaseCollection } from "@/lib/app/types";
import { useGetCw721Token, useGetCw721 } from "@/lib/graphql/hooks/cw721";
import { LINKS } from "@/utils/links";


interface OverviewProps {
  contractAddress: string;
  tokenId: string;
  collection: IBaseCollection;
}
const Overview: FC<OverviewProps> = (props) => {
  const { tokenId, contractAddress, collection } = props;
  const { data: token } = useGetCw721Token(contractAddress, tokenId);
  const { data: cw721 } = useGetCw721(contractAddress);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const metadata = useMemo(()=>token?.extension, [token?.extension]);

  const { config } = useApp();
  const { data: chainConfig } = useChainConfig(config.chainId ?? "");


  const handleViewMetadataClick = () => {
    setIsModalOpen(true);
  };
  const handleCopyContentsClick = () => {
    // Copy the metadata object to the clipboard
    navigator.clipboard.writeText(JSON.stringify(metadata));
  };

  function embededYTLink(youTubeUrl: string) {
    const videoId = youTubeUrl.includes("youtu.be/")
      ? youTubeUrl.substring(youTubeUrl.lastIndexOf("/") + 1)
      : youTubeUrl.split("v=")[1];
    const embedYTLink = `https://www.youtube.com/embed/${videoId}`;
    return embedYTLink;

  }

  let explorerUrl = "";
  if (chainConfig?.blockExplorerAddressPages[0]) {
    explorerUrl += chainConfig?.blockExplorerAddressPages[0].replace('${address}', '');
    if (cw721?.address) {
      explorerUrl += cw721.address;
    }
  }

  return (
    <>
      <Box>
        <Text fontWeight="bold" fontSize="xl">
          Description
        </Text>
        <Text mt="4" fontWeight="light" fontSize="sm">
          {token?.extension?.description}
        </Text>
        <Text fontWeight="bold" fontSize="xl" mt="8">
          Details
        </Text>
        <Box mt="4" p="10" rounded="2xl" border="1px" borderColor="gray.300">
          <Box display="flex" justifyContent="space-between" alignItems="center" pl={2}>
            <Link href={LINKS.collection(collection.id)}>{cw721?.contractInfo?.name}</Link>
            <Flex justifyContent="flex-end">
              <Box display="inline-block" border="1px" borderColor="gray.300" borderRadius="md" px="9px" py="8px" ml="5px">
                <Link href={collection.twitter} target={"_blank"}>
                  <TwitterIcon w={5} h={5} />
                </Link>
              </Box>
              <Box display="inline-block" border="1px" borderColor="gray.300" borderRadius="md" px="9px" py="8px" ml="5px">
                <Share />
              </Box>
            </Flex>
          </Box>
          <Divider orientation='horizontal' mt="7" />
          <Box display="flex" flexDirection="column">

            <Link href={chainConfig?.chainUrl} target="_blank">
              <Box px="9px" mt="10px" display="inline-flex" alignItems="center">
                <Image src={chainConfig?.iconUrls?.sm} alt={chainConfig?.chainName + " icon"} mr="10px" width="22px" />
                <Text>{chainConfig?.chainName}</Text>{chainConfig?.chainType === "testnet" ? <Text ml="5px" fontSize={"small"}>(testnet)</Text> : null}
              </Box>
            </Link>
            <Link href={explorerUrl} target="_blank">
              <Box px="9px" mt="10px" display="inline-flex" alignItems="center">
                <ExternalLinkIcon mr="10px" />
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

        {token?.extension.youtube_url && token.extension.youtube_url.length > 10 && (
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
