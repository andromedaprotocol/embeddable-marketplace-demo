import React, { FC } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { MoreHorizontalIcon } from "@/theme/icons";
import { LINKS } from "@/utils/links";
import {
  useGetCollection,
  useGetTokenFromColId,
} from "@/lib/graphql/hooks/collection";
import dayjs from "dayjs";
import { formatTime, getTime } from "@/utils/time";
import { useGetTokenMarketplaceInfoFromColId } from "@/lib/graphql/hooks/marketplace";

interface MarketplaceCardProps {
  tokenId: string;
  collectionId: string;
}
const MarketplaceCard: FC<MarketplaceCardProps> = ({ tokenId, collectionId }) => {
  const { data: collection } = useGetCollection(collectionId);
  const { data: token } = useGetTokenFromColId(collectionId, tokenId);
  const { data: marketplace } = useGetTokenMarketplaceInfoFromColId(
    collectionId,
    tokenId
  );

 
  const isForSale = marketplace?.latestSaleState.status;
  const price = marketplace?.latestSaleState.price;
  const coin_denom = marketplace?.latestSaleState.coin_denom;
  const sale_id = marketplace?.latestSaleState.sale_id;

  return (
    <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="lg">
      <Link href={LINKS.token(collectionId, tokenId)} passHref>
        <a>
          <Image src={token?.extension.image} alt="Image" borderRadius="lg" />
        </a>
      </Link>
      <HStack justifyContent="space-between" mt="3">
        <Flex direction="column" gap="0">
          <Text fontSize="xs" fontWeight="light" textStyle="light">
            {collection?.contractInfo?.name}
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            {token?.extension.name}
          </Text>
        </Flex>
        <Flex fontSize="xs" direction="column">
         
      
          <Text>Sale Status:</Text>
          <Text fontWeight="bold">
            {isForSale}
          </Text>
      
        </Flex>
      </HStack>
      <Flex justify="space-between" align="start" mt="3" gap="2">
        <Box>
          <Text fontSize="xs" textStyle="light">
            Price
          </Text>
          <Text fontWeight="medium" fontSize="xs">
            {marketplace?.latestSaleState.price ?? 0} {marketplace?.latestSaleState.coin_denom}
          </Text>
        </Box>
        <Box>
          <>&nbsp;</>
        </Box>
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            icon={<MoreHorizontalIcon width={16} />}
            variant="link"
            alignSelf="end"
          />
          <MenuList>
            <MenuItem>Burn</MenuItem>
            <MenuItem>Archive</MenuItem>
            <MenuItem>Sell</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default MarketplaceCard;
