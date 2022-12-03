import { useAppUtils } from "@/lib/app/hooks";
import {
  QueryAuctionBids as Query,
  QUERY_AUCTION_BIDS as QueryText,
  QueryAuctionBidsResponse as QueryResponse,
} from "@andromedaprotocol/andromeda.js/dist/andr-js/graphql/queries/auction";
import { gql, QueryResult, useQuery } from "@apollo/client";
import { useMemo } from "react";

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

export function useGetBidsFromColId(
  collectionId: string,
  auctionId: number
): IQueryResult {
  const { getCollection } = useAppUtils();

  const colConfig = useMemo(() => {
    return getCollection(collectionId);
  }, [getCollection, collectionId]);

  const result = useGetBids(colConfig?.auctionAddress ?? "", auctionId);
  return result;
}
