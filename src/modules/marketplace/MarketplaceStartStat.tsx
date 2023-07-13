import { IAuctionCollection, IMarketplaceCollection } from "@/lib/app/types";
import { useGetTokenMarketplaceInfo } from "@/lib/graphql/hooks/marketplace";
import { Badge, Flex, Text } from "@chakra-ui/react";
import { Flame } from "lucide-react";
import React, { FC, ReactNode } from "react"

interface Props {
    collection: IMarketplaceCollection;
    tokenId: string;
}

const MarketplaceStartStat: FC<Props> = (props) => {
    const { collection, tokenId } = props;
    const { data: marketplaceState } = useGetTokenMarketplaceInfo(
        collection.marketplace,
        collection.cw721,
        tokenId
    )

    const isOpen = marketplaceState?.latestSaleState?.status === 'open'
    const isClosed = marketplaceState?.latestSaleState?.status === 'executed'

    return (
        <Flex gap="1" align="center">
            {isClosed ? (
                <Badge colorScheme="red" fontSize='2xs'>
                    Sold Out
                </Badge>
            ) : isOpen ? (
                <Badge colorScheme="green" fontSize='2xs'>
                    For Sale
                </Badge>
            ) : (
                <Badge colorScheme="purple" fontSize='2xs'>
                    Not for sale
                </Badge>
            )}
        </Flex>
    )
}

export default MarketplaceStartStat