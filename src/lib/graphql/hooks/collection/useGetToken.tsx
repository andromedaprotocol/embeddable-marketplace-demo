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

export default function useGetToken(
  collectionId: string,
  tokenId: string
): IQueryResult {
  const { getCollection } = useAppUtils();

  const colConfig = useMemo(() => {
    return getCollection(collectionId);
  }, [getCollection, collectionId]);

  const { loading, error, data } = useQuery<QueryResponse, Query>(
    gql`
      ${QueryText}
    `,
    {
      variables: { contractAddress: colConfig?.contractAddress ?? "", tokenId },
    }
  );

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.cw721?.nftInfo,
  };
}
