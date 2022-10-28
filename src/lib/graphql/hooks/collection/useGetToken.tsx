import { useAppUtils } from "@/lib/app/hooks";
import {
  QueryCW721NFTInfo as Query,
  QUERY_CW721_NFT_INFO as QueryText,
  QueryCW721NftInfoResponse as QueryResponse,
} from "@andromedaprotocol/andromeda.js/dist/andr-js/graphql/queries/cw721";
import { gql, QueryResult, useQuery } from "@apollo/client";
import { useMemo } from "react";

export interface IQueryResult
  extends Pick<QueryResult<QueryResponse>, "loading" | "error"> {
  data: QueryResponse["cw721"]["nftInfo"] | undefined;
}

export function useGetToken(
  contractAddress: string,
  tokenId: string
): IQueryResult {
  const { loading, error, data } = useQuery<QueryResponse, Query>(
    gql`
      ${QueryText}
    `,
    {
      variables: { contractAddress, tokenId },
    }
  );

  return {
    loading,
    error,
    data: data?.cw721?.nftInfo,
  };
}

export function useGetTokenFromColId(
  collectionId: string,
  tokenId: string
): IQueryResult {
  const { getCollection } = useAppUtils();

  const colConfig = useMemo(() => {
    return getCollection(collectionId);
  }, [getCollection, collectionId]);

  const result = useGetToken(
    colConfig?.contractAddress ?? "",
    tokenId
  );
  return result;
}
