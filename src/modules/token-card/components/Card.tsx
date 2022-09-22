import React, { FC } from "react";
import {
  Box,
  Image,
  Text,
  HStack,
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { IToken } from "../types";
import { MoreHorizontalIcon } from "@/theme/icons";

interface CardProps {
  token: IToken;
}
const Card: FC<CardProps> = ({ token }) => {
  return (
    <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="lg">
      <Link href={`/collections/generic/4037`} passHref>
        <a>
          <Image src={token.image} alt="Image" borderRadius="lg" />
        </a>
      </Link>
      <Flex direction="column" mt="3" gap="0">
        <Text fontSize="xs" fontWeight="light" textStyle="light">
          AUSTIN
        </Text>
        <Text fontSize="sm" fontWeight="medium">
          AUSTIN #6048
        </Text>
      </Flex>

      <Flex justify="space-between" align="start" mt='3' gap='2'>
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
            alignSelf='end'
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
