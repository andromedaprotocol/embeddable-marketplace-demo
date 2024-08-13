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
    <Box data-testid="cw721-tokens-list">
      <HStack>
        <Button
          onClick={() => setFilterOpen((prev) => !prev)}
          leftIcon={<SlidersHorizontal height={16} />}
          variant="outline"
          data-testid="filter-button"
        >
          Filter
        </Button>
        <InputGroup>
          <InputLeftElement pointerEvents="none" data-testid="search-icon">
            <SearchIcon width={16} />
          </InputLeftElement>
          <Input placeholder="Collection, item or user" w="full" data-testid="search-input" />
        </InputGroup>
        <Menu placement="bottom-end">
          <MenuButton as={Button} variant="outline" minW="max-content" data-testid="sort-menu-button">
            Price: low to high
          </MenuButton>
          <MenuList data-testid="sort-menu-list">
            <MenuItem data-testid="sort-low-to-high">Price: low to high</MenuItem>
            <MenuItem data-testid="sort-high-to-low">Price: high to low</MenuItem>
            <MenuItem data-testid="sort-recently-listed">Recently listed</MenuItem>
            <MenuItem data-testid="sort-auction-ending-soon">Auction ending soon</MenuItem>
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
              data-testid="filter-container"
            >
              Filter
            </Box>
          )}
          <SimpleGrid columns={filterOpen ? 3 : 4} spacing={4} w="full">
            {allTokens?.map((tokenId) => (
              <GridItem key={tokenId} data-testid={`token-card-${tokenId}`}>
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
