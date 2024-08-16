import { IMarketplaceCollection } from "@/lib/app/types";
import { useGetTokenMarketplaceInfo } from "@/lib/graphql/hooks/marketplace";
import MarketplaceStartStat from "@/modules/marketplace/MarketplaceStartStat";
import { MoreHorizontalIcon } from "@/theme/icons";
import { Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface Props {
    collection: IMarketplaceCollection;
    tokenId: string;
}

const Cw721MarketplaceState: FC<Props> = (props) => {
    const { collection, tokenId } = props;
    const { data: marketplace } = useGetTokenMarketplaceInfo(
        collection.marketplace,
        collection.cw721,
        tokenId
    );

    return (
        <Box data-testid="marketplace-state">
            <Box mb='1' data-testid="marketplace-start-stat">
                <MarketplaceStartStat
                    collection={collection}
                    tokenId={tokenId}
                />
            </Box>
            <Flex justify="space-between" align="start" gap="2">
                <Box data-testid="price-info">
                    <Text fontSize="xs" textStyle="light">
                        Price
                    </Text>
                    <Text fontWeight="medium" fontSize="xs">
                        {marketplace?.latestSaleState.price} {marketplace?.latestSaleState.coin_denom}
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
                        data-testid="menu-button"
                    />
                    <MenuList data-testid="menu-list">
                        <MenuItem data-testid="menu-item-burn">Burn</MenuItem>
                        <MenuItem data-testid="menu-item-archive">Archive</MenuItem>
                        <MenuItem data-testid="menu-item-sell">Sell</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Box>
    );
}

export default Cw721MarketplaceState;
