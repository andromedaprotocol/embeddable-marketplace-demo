import { useCodegenGeneratedAdoAuctionBidsBidsQuery } from "@andromedaprotocol/gql/dist/__generated/react";

export function useGetBids(
  auctionAddress: string,
  auctionId: number
) {
  const { loading, error, data } = useCodegenGeneratedAdoAuctionBidsBidsQuery({
    variables: {
      'ADO_auction_address': auctionAddress,
      'ADO_auction_auction_bids_auctionId': auctionId
    },
    pollInterval: 1000
  })

  return {
    loading,
    error,
    data: data?.ADO?.auction?.bids?.bids,
  };
}
