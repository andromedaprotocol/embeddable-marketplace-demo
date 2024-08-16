import { IAuctionCollection } from "@/lib/app/types";
import { useGetTokenAuctionState } from "@/lib/graphql/hooks/auction";
import { formatTime, getTime } from "@/utils/time";
import { Badge, Flex, Text } from "@chakra-ui/react";
import { Flame } from "lucide-react";
import React, { FC } from "react"

interface Props {
    collection: IAuctionCollection;
    tokenId: string;
}

const AuctionStartStat: FC<Props> = (props) => {
    const { collection, tokenId } = props;
    // Auction variables:
    const { data: auctionState } = useGetTokenAuctionState(
        collection.cw721,
        collection.auction,
        tokenId
    );

    const startTime = getTime(auctionState?.start_time ?? {});
    const endTime = getTime(auctionState?.end_time ?? {});
    const isStarted = startTime.isBefore(new Date());
    const isEnded = endTime.isBefore(new Date());

    return (
        <Flex gap="1" align="center" data-testid="auction-start-stat">
            <Flame color="orange" width={14} />
            {!isStarted && (
                <Text fontSize="xs" fontWeight="bold" data-testid="auction-start-time">
                    Sale starts on {""}
                    {formatTime(startTime)}
                </Text>
            )}
            {isEnded ? (
                <Badge colorScheme="red" fontSize='2xs' data-testid="auction-ended-badge">
                    Sale Ended
                </Badge>
            ) : isStarted ? (
                <Badge colorScheme="green" fontSize='2xs' data-testid="auction-live-badge">
                    Sale is Live!
                </Badge>
            ) : null}
        </Flex>
    )
}

export default AuctionStartStat;
