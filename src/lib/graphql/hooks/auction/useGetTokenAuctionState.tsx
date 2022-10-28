import { useAppUtils } from "@/lib/app/hooks";
import {
  QueryAuctionLatestAuctionState as Query,
  QUERY_AUCTION_LATEST_AUCTION_STATE as QueryText,
  QueryAuctionLatestAuctionStateResponse as QueryResponse,
} from "@andromedaprotocol/andromeda.js/dist/andr-js/graphql/queries/auction";
import { gql, QueryResult, useQuery } from "@apollo/client";
import { useMemo } from "react";

export interface IQueryResult
  extends Pick<QueryResult<QueryResponse>, "loading" | "error"> {
  data: QueryResponse["auction"]["latestAuctionState"] | undefined;
}

export function useGetTokenAuctionState(
  tokenAddress: string,
  auctionAddress: string,
  tokenId: string
): IQueryResult {
  const { loading, error, data } = useQuery<QueryResponse, Query>(
    gql`
      ${QueryText}
    `,
    {
      variables: {
        contractAddress: auctionAddress ?? "",
        tokenAddress: tokenAddress ?? "",
        tokenId,
      },
    }
  );

  return {
    loading,
    error,
    data: data?.auction?.latestAuctionState,
  };
}

export function useGetTokenAuctionStateFromColId(
  collectionId: string,
  tokenId: string
): IQueryResult {
  const { getCollection } = useAppUtils();

  const colConfig = useMemo(() => {
    return getCollection(collectionId);
  }, [getCollection, collectionId]);

  const result = useGetTokenAuctionState(
    colConfig?.contractAddress ?? "",
    colConfig?.auctionAddress ?? "",
    tokenId
  );
  return result;
}
