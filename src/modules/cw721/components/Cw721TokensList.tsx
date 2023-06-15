import { useGetCw721Tokens } from "@/lib/graphql/hooks/cw721";
import { SearchIcon } from "@/theme/icons";
import {
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
} from "@chakra-ui/react";
import { SlidersHorizontal } from "lucide-react";
import React, { FC, useState } from "react";
import Cw721TokenCard from "./Cw721TokenCard";

interface Cw721TokensListProps {
  collectionId: string;
  contractAddress: string;
}
const Cw721TokensList: FC<Cw721TokensListProps> = (props) => {
  const { collectionId, contractAddress } = props;
  const { data: allTokens } = useGetCw721Tokens(contractAddress);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <Box>
      <HStack>
        <Button
          onClick={() => setFilterOpen((prev) => !prev)}
          leftIcon={<SlidersHorizontal height={16} />}
          variant="outline"
        >
          Filter
        </Button>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon width={16} />
          </InputLeftElement>
          <Input placeholder="Collection, item or user" w="full" />
        </InputGroup>
        <Menu placement="bottom-end">
          <MenuButton as={Button} variant="outline" minW="max-content">
            Price: low to high
          </MenuButton>
          <MenuList>
            <MenuItem>Price: low to high</MenuItem>
            <MenuItem>Price: high to low</MenuItem>
            <MenuItem>Recently listed</MenuItem>
            <MenuItem>Auction ending soon</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <Box mt="4">
        <Flex direction="row" gap="4">
          {filterOpen && (
            <Box
              w="full"
              maxW="64"
              border="1px"
              borderColor="gray.300"
              rounded="2xl"
              top="4"
              position="sticky"
              alignSelf="start"
              p="10"
            >
              Filter
            </Box>
          )}
          <SimpleGrid columns={filterOpen ? 3 : 4} spacing={4} w="full">
            {allTokens?.map((tokenId) => (
              <GridItem key={tokenId}>
                <Cw721TokenCard contractAddress={contractAddress} tokenId={tokenId} collectionId={collectionId} />
              </GridItem>
            ))}
          </SimpleGrid>
        </Flex>
      </Box>
    </Box>
  );
};
export default Cw721TokensList;
