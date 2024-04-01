import { IAuctionCollection } from "@/lib/app/types";
import { useGetTokenAuctionState } from "@/lib/graphql/hooks/auction";
import AuctionStartStat from "@/modules/auction/AuctionStartStat";
import { MoreHorizontalIcon } from "@/theme/icons";
import { Box, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"

interface Props {
    collection: IAuctionCollection;
    tokenId: string;
}

const Cw721AuctionState: FC<Props> = (props) => {
    const { collection, tokenId } = props;
    const { data: auction } = useGetTokenAuctionState(
        collection.cw721,
        collection.auction,
        tokenId
    );

    if (!auction) {
        return (
            <Box>
                <Flex justify="space-between" align="start" gap="2">
                    <Text fontSize="xs" textStyle="light">
                        Token not for sale
                    </Text>
                </Flex>
            </Box>
        )
    }

    return (
        <Box>
            <Box mb='1'>
                <AuctionStartStat
                    collection={collection}
                    tokenId={tokenId}
                />
            </Box>
            <Flex justify="space-between" align="start" gap="2">
                <Box>
                    <Text fontSize="xs" textStyle="light">
                        Floor price
                    </Text>
                    <Text fontWeight="medium" fontSize="xs">
                        {auction?.min_bid ?? 0} {auction?.coin_denom}
                    </Text>
                </Box>
                <Box>
                    <Text fontSize="xs" textStyle="light">
                        Highest Bid
                    </Text>
                    <Text fontWeight="medium" fontSize="xs">
                        {auction?.high_bidder_amount} {auction?.coin_denom}
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
    )
}

export default Cw721AuctionState