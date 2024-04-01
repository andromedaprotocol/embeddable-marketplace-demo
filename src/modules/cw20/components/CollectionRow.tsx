import { LINKS } from "@/utils/links";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import { useAppUtils } from "@/lib/app/hooks";
import { useGetSaleAssets } from "@/lib/graphql/hooks/exchange";
import { IExchangeCollection } from "@/lib/app/types";
import { useGetCw20, useGetCw20MarketingInfo } from "@/lib/graphql/hooks/cw20";
import FallbackImage from "@/modules/common/ui/Image/FallbackImage";
import { CopyButton } from "@/modules/common/ui";

interface Cw20CollectionRowProps {
  collectionId: string;
}
const Cw20CollectionRow: FC<Cw20CollectionRowProps> = (props) => {
  const { collectionId } = props;
  const { getCollection } = useAppUtils();
  const collection = getCollection(collectionId) as IExchangeCollection;

  const { data: token } = useGetCw20(collection.cw20);
  const { data: tokenInfo } = useGetCw20MarketingInfo(collection.cw20);
  const { data: exchange } = useGetSaleAssets(collection.exchange);

  return (
    <Box p="12" rounded="2xl" bg="gray.100">
      <SimpleGrid columns={4} spacing="6">
        <GridItem>
          <FallbackImage src={tokenInfo?.marketingInfo?.logo?.url} alt="Image" borderRadius="lg" cursor='pointer' _hover={{
            scale: "110%"
          }} transform='auto' transition='ease-in' transitionProperty='all' transitionDuration='150ms' />
        </GridItem>
        <GridItem colSpan={3}>
          <Flex direction="column" gap="4" alignItems="stretch">
            <HStack w='full'>
              <Text fontSize="xl" fontWeight="bold" flex={1}>
                {collection.name}
              </Text>
              <Link href={LINKS.cw20Token(collectionId)} passHref>
                <Button as="a" w="full" ml='auto'>
                  Buy Token
                </Button>
              </Link>
            </HStack>
            <Box border="1px" borderColor="gray.300" borderRadius="lg" px="4" py='6' my='2' alignSelf="stretch">
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize="sm">
                  Token Name
                </Text>
                <Text fontWeight="light" fontSize="sm">
                  {token?.tokenInfo?.name}
                </Text>
              </Flex>
              <Divider orientation="horizontal" my="4" />
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize="sm">
                  Symbol
                </Text>
                <Text fontWeight="light" fontSize="sm">
                  {token?.tokenInfo?.symbol}
                </Text>
              </Flex>
              <Divider orientation="horizontal" my="4" />
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize="sm">
                  You can buy this token with
                </Text>
                <HStack spacing={3}>
                  {exchange?.saleAssets?.map(asset => (
                    <Badge key={asset} variant="subtle" colorScheme={asset.startsWith('native') ? "green" : "yellow"}>{asset.split(':').slice(1).join(':')}</Badge>
                  ))}
                </HStack>
              </Flex>
            </Box>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
export default Cw20CollectionRow;
