import {
  QueryAuctionBids as Query,
  QUERY_AUCTION_BIDS as QueryText,
  QueryAuctionBidsResponse as QueryResponse,
} from "@andromedaprotocol/andromeda.js/dist/graphql/queries/auction";
import { gql, QueryResult, useQuery } from "@apollo/client";

export interface IQueryResult
  extends Pick<QueryResult<QueryResponse>, "loading" | "error"> {
  data: QueryResponse["auction"]["bids"]["bids"] | undefined;
}

export function useGetBids(
  auctionAddress: string,
  auctionId: number
): IQueryResult {
  const { loading, error, data } = useQuery<QueryResponse, Query>(
    gql`
      ${QueryText}
    `,
    {
      variables: {
        contractAddress: auctionAddress ?? "",
        auctionId,
      },
    }
  );

  return {
    loading,
    error,
    data: data?.auction?.bids?.bids,
  };
}
