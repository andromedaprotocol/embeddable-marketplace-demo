import React, { FC } from "react";
import { useGetTokenAuctionState } from "@/lib/graphql/hooks/auction";
import AuctionBids from "./Bids";


interface Cw721AuctionBidsProps {
    auctionAddress: string;
    tokenId: string;
    tokenAddress: string;
}
const Cw721AuctionBids: FC<Cw721AuctionBidsProps> = (props) => {
    const { auctionAddress, tokenId, tokenAddress } = props;
    const { data: auctionState } = useGetTokenAuctionState(
        tokenAddress,
        auctionAddress,
        tokenId
    );

    if (!auctionState) return null;

    return (
        <AuctionBids auctionState={auctionState} auctionAddress={auctionAddress} />
    );
};
export default Cw721AuctionBids;
