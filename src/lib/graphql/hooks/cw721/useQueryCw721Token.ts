import {
  QueryCW721NFTInfo as Query,
  QUERY_CW721_NFT_INFO as QueryText,
  QueryCW721NftInfoResponse as QueryResponse,
} from "@andromedaprotocol/andromeda.js/dist/andr-js/graphql/queries/cw721";
import { gql, QueryResult, useQuery } from "@apollo/client";

export interface IQueryResult
  extends Pick<QueryResult<QueryResponse>, "loading" | "error"> {
  data: QueryResponse['cw721']['nftInfo'] | undefined;
}

/**
 * 
 * @param contractAddress
 * @returns
 */
export default function useQueryCW721Token(
  contractAddress: string,
  tokenId: string
): IQueryResult {
  const { loading, error, data } = useQuery<QueryResponse, Query>(
    gql`
    ${QueryText}
    `,
    { variables: { contractAddress, tokenId } },
  );

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.cw721?.nftInfo
  };
}
