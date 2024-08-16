import { IMarketplaceCollection } from "@/lib/app/types";
import { useGetTokenMarketplaceInfo } from "@/lib/graphql/hooks/marketplace";
import { Badge, Flex } from "@chakra-ui/react";
import React, { FC } from "react";

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
    );

    const isOpen = marketplaceState?.latestSaleState?.status === 'open';
    const isClosed = marketplaceState?.latestSaleState?.status === 'executed';

    return (
        <Flex gap="1" align="center" data-testid="marketplace-start-stat">
            {isClosed ? (
                <Badge colorScheme="red" fontSize='2xs' data-testid="status-sold-out">
                    Sold Out
                </Badge>
            ) : isOpen ? (
                <Badge colorScheme="green" fontSize='2xs' data-testid="status-for-sale">
                    For Sale
                </Badge>
            ) : (
                <Badge colorScheme="purple" fontSize='2xs' data-testid="status-not-for-sale">
                    Not for sale
                </Badge>
            )}
        </Flex>
    );
}

export default MarketplaceStartStat;
