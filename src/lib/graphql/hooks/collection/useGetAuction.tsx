import {
    QueryCW721ContractInfo as Query,
    QUERY_AUCTION_LATEST_AUCTION_STATE as QueryText,
    QueryCW721ContractInfoResponse as QueryResponse,
  } from "@andromedaprotocol/andromeda.js/dist/andr-js/graphql/queries/cw721";
  import { gql, QueryResult, useQuery } from "@apollo/client";
  import { useMemo, useCallback } from "react";
  
  export interface IQueryResult
    extends Pick<QueryResult<QueryResponse>, "loading" | "error"> {
    data: QueryResponse["cw721"] | undefined;
  }
  
  export default function useGetAuction(auctionAddress: string, tokenAddress: string, tokenId: string ): IQueryResult {
   
    const { data, loading, error } = 
    
    useQuery<QueryResponse, Query>(
      gql`
        query QUERY_AUCTION_LATEST_AUCTION_STATE($contractAddress: String!, $tokenAddress: String!, $tokenId: String!) {
            auction(address: $contractAddress) {
                latestAuctionState(tokenAddress: $tokenAddress, tokenId: $tokenId) {
                ...AuctionStateInfo
                __typename
                }
                __typename
            }
        }
      `, 
      { variables: { contractAddress: auctionAddress ?? "", tokenAddress: tokenAddress ?? "", tokenId: tokenId ?? ""  } }
    );
  
    // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library
  
    const memoizedResult = useMemo(
      () => ({
        loading,
        error,
        data: data?.auction,
      }),
      [loading, error, data]
    );
  
    const fetchData = useCallback(() => {
        useQuery<QueryResponse, Query>(
            gql`
              query QUERY_AUCTION_LATEST_AUCTION_STATE($contractAddress: String!, $tokenAddress: String!, $tokenId: String!) {
                  auction(address: $contractAddress) {
                      latestAuctionState(tokenAddress: $tokenAddress, tokenId: $tokenId) {
                      ...AuctionStateInfo
                      __typename
                      }
                      __typename
                  }
              }
            `, 
            { variables: { contractAddress: auctionAddress ?? "", tokenAddress: tokenAddress ?? "", tokenId: tokenId ?? ""  } }
          );
    }, [auctionAddress, tokenAddress, tokenId]);
  
    return {
      ...memoizedResult,
      fetchData,
    };
  }
  