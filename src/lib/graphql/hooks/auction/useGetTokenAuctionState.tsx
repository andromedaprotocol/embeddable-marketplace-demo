import { useCodegenGeneratedAdoAuctionLatestauctionstateQuery } from "@andromedaprotocol/gql/dist/__generated/react";

export function useGetTokenAuctionState(
  tokenAddress: string,
  auctionAddress: string,
  tokenId: string
) {
  const { loading, error, data } = useCodegenGeneratedAdoAuctionLatestauctionstateQuery({
    variables: {
      'ADO_auction_address': auctionAddress,
      'ADO_auction_auction_latestAuctionState_tokenAddress': tokenAddress,
      'ADO_auction_auction_latestAuctionState_tokenId': tokenId
    }
  })

  return {
    loading,
    error,
    data: data?.ADO?.auction?.latestAuctionState,
  };
}
