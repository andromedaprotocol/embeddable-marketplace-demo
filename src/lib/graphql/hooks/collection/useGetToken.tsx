import { useAppUtils } from "@/lib/app/hooks";
import {
  QueryCW721NFTInfo as Query,
  QUERY_CW721_NFT_INFO as QueryText,
  QueryCW721NftInfoResponse as QueryResponse,
  TOKEN_EXTENSION_FRAGMENT,
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
    // need temporary workaround until tokenUri is changed to token_uri in andromeda.js source library
    // Original source:
    // gql`
    //   ${QueryText}
    // `,
    //
    // Workaround:

    gql`
        query QUERY_CW721_NFT_INFO($contractAddress: String!, $tokenId: String!) {
        cw721(address: $contractAddress) {
          nftInfo(tokenId: $tokenId) {
            extension {
              ...TokenExtensionInfo
            }
            token_uri
          }
        }
      }
      ${TOKEN_EXTENSION_FRAGMENT}
    `,
  // End Workaround.
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
