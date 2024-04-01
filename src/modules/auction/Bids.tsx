import { ProfileIcon } from "@/modules/common/icons";
import { Box, Divider, Flex, Link, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import useApp from "@/lib/app/hooks/useApp";
import { useChainConfig } from "@/lib/graphql/hooks/chain";
import { useGetBids } from "@/lib/graphql/hooks/auction/useGetBids";
import { truncateAddress } from "@/utils/text";
import { IAuctionStateResponse } from "@andromedaprotocol/gql";

interface AuctionBidsProps {
  auctionState: IAuctionStateResponse;
  auctionAddress: string;
}
const AuctionBids: FC<AuctionBidsProps> = (props) => {
  const { auctionState, auctionAddress } = props;
  const { config } = useApp()
  const { data: chainConfig } = useChainConfig(config.chainId);
  const { data: bids } = useGetBids(
    auctionAddress, Number(auctionState?.auction_id)
  )

  return (
    <Box border="1px" borderColor="gray.300" borderRadius="15" p="10">
      {bids && [...bids].reverse().map((bid, index) => (
        <Box key={index} mt="4" >
          <Flex justifyContent="space-between">
            <Link href={chainConfig?.blockExplorerAddressPages[0].replace('${address}', '') + bid.bidder} target="_blank">
              <ProfileIcon boxSize={"2em"} mr="15px"></ProfileIcon>
              {truncateAddress(bid.bidder)}
            </Link>

            <Text fontWeight="light" fontSize="sm">{bid.amount}<span> - {auctionState?.coin_denom?.toUpperCase()}</span></Text>

          </Flex>
          <Divider orientation="horizontal" mt="7" />
        </Box>
      ))}
    </Box>
  );
};
export default AuctionBids;
