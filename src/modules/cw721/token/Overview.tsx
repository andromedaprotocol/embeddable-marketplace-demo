import { TwitterIcon, ExternalLinkIcon, FolderOpenIcon } from "@/modules/common/icons";
import { Box, Divider, Flex, Link, Text, Image, Button, Heading, Textarea, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ButtonGroup } from "@chakra-ui/react";
import { Share } from "lucide-react";
import React, { FC } from "react";
import useApp from "@/lib/app/hooks/useApp";
import { useChainConfig } from "@/lib/graphql/hooks/chain";
import { IBaseCollection } from "@/lib/app/types";
import { useGetCw721Token, useGetCw721 } from "@/lib/graphql/hooks/cw721";
import { LINKS } from "@/utils/links";
import { CopyButton } from "@/modules/common/ui";
import { truncate, truncateAddress } from "@/utils/text";

interface OverviewProps {
  contractAddress: string;
  tokenId: string;
  collection: IBaseCollection;
}

const Overview: FC<OverviewProps> = (props) => {
  const { tokenId, contractAddress, collection } = props;
  const { data: token } = useGetCw721Token(contractAddress, tokenId);
  const { data: cw721 } = useGetCw721(contractAddress);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { config } = useApp();
  const { data: chainConfig } = useChainConfig(config.chainId ?? "");

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
      <Box data-testid="overview">
        <Text fontWeight="bold" fontSize="xl">
          Description
        </Text>
        <Text mt="4" fontWeight="light" fontSize="sm" data-testid="token-description">
          {token?.metadata?.description}
        </Text>
        <Text fontWeight="bold" fontSize="xl" mt="8">
          Details
        </Text>
        <Box mt="4" p="10" rounded="2xl" border="1px" borderColor="gray.300" data-testid="details-box">
          <Box display="flex" justifyContent="space-between" alignItems="center" pl={2} data-testid="collection-link">
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
              <Box px="9px" mt="10px" display="inline-flex" alignItems="center" data-testid="chain-info">
                <Image src={chainConfig?.iconUrls?.sm} alt={chainConfig?.chainName + " icon"} mr="10px" width="22px" />
                <Text>{chainConfig?.chainName}</Text>{chainConfig?.chainType === "testnet" ? <Text ml="5px" fontSize={"small"}>(testnet)</Text> : null}
              </Box>
            </Link>
            <Box border="1px" borderColor="gray.300" borderRadius="lg" px="4" py='6' my='6' data-testid="token-details">
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize="sm">
                  Token Collection Address
                </Text>
                <CopyButton variant="unstyled" text={contractAddress} as={Text} height="auto" fontWeight="light" fontSize="sm">
                  {truncateAddress(contractAddress)}
                </CopyButton>
              </Flex>
              <Divider orientation="horizontal" my="4" />
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize="sm">
                  Token Id
                </Text>
                <Text fontWeight="light" fontSize="sm">
                  {token?.tokenId}
                </Text>
              </Flex>
              <Divider orientation="horizontal" my="4" />
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize="sm">
                  Publisher
                </Text>
                <Text fontWeight="light" fontSize="sm">
                  {token?.extension.publisher}
                </Text>
              </Flex>
              <Divider orientation="horizontal" my="4" />
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize="sm">
                  Token URI
                </Text>
                <Link isExternal href={token?.token_uri} fontWeight="light" fontSize="sm">
                  {truncate(token?.token_uri, [30, 12])}
                </Link>
              </Flex>
            </Box>
            <ButtonGroup mt='2' size='sm' w='full' data-testid="view-buttons">
              <Button as={Link} isExternal href={explorerUrl} flex={1} variant="outline">
                <ExternalLinkIcon mr="10px" />
                <Text>View on Explorer</Text>
              </Button>
              {token?.metadata && (
                <Button onClick={onOpen} flex={1} variant="outline" data-testid="view-metadata-button">
                  <FolderOpenIcon mr="10px" />
                  <Text>View Metadata</Text>
                </Button>
              )}
            </ButtonGroup>
          </Box>
        </Box>

        {token?.metadata?.youtube_url && token?.metadata.youtube_url.length > 10 && (
          <>
            <Text fontWeight="bold" fontSize="xl" mt="8">
              Video:
            </Text>
            <Box mt="4" p="10" rounded="2xl" border="1px" borderColor="gray.300" display="flex" alignItems="center" justifyContent="center" data-testid="video-box">
              <iframe width="640" height="360" src={embededYTLink(token?.metadata.youtube_url)} title="YouTube video"></iframe>
            </Box>
          </>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} data-testid="metadata-modal">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Metadata Object
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box position="relative">
              <Textarea
                rows={10}
                value={JSON.stringify(token?.metadata, null, 2)}
                readOnly
                resize="none"
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <CopyButton text={JSON.stringify(token?.metadata || "{}")} variant='ghost'>Copy</CopyButton>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Overview;
