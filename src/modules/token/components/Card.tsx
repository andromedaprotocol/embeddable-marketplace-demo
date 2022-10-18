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
} from "@chakra-ui/react";
import Link from "next/link";
import { MoreHorizontalIcon } from "@/theme/icons";
import { LINKS } from "@/utils/links";
import useQueryCW721Token from "@/lib/graphql/hooks/cw721/useQueryCw721Token";
import { useQueryCW721Info } from "@/lib/graphql";

interface CardProps {
  tokenId: string;
  contractAddress: string;
}
const Card: FC<CardProps> = ({ tokenId, contractAddress }) => {
  const { data: collection } = useQueryCW721Info(contractAddress);
  const { data: token } = useQueryCW721Token(contractAddress, tokenId);

  
  return (
    <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="lg">
      <Link href={LINKS.token(contractAddress, tokenId)} passHref>
        <a>
          <Image src={token?.extension.image} alt="Image" borderRadius="lg" />
        </a>
      </Link>
      <Flex direction="column" mt="3" gap="0">
        <Text fontSize="xs" fontWeight="light" textStyle="light">
          {collection?.contractInfo?.name}
        </Text>
        <Text fontSize="sm" fontWeight="medium">
          {token?.extension.name}
        </Text>
      </Flex>

      <Flex justify="space-between" align="start" mt="3" gap="2">
        <Box>
          <Text fontSize="xs" textStyle="light">
            Floor price
          </Text>
          <Text fontWeight="medium" fontSize="xs">
            10 STARS
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs" textStyle="light">
            Highest Bid
          </Text>
          <Text fontWeight="medium" fontSize="xs">
            13.65 STARS
          </Text>
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

export default Card;
