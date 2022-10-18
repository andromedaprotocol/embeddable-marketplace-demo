import {
  QueryCW721AllTokens as Query,
  QUERY_CW721_ALL_TOKENS as QueryText,
  QueryCW721AllTokensResponse as QueryResponse
} from "@andromedaprotocol/andromeda.js/dist/andr-js/graphql/queries/cw721";
import { gql, QueryResult, useQuery } from "@apollo/client";

export interface IQueryResult
  extends Pick<QueryResult<QueryResponse>, "loading" | "error"> {
  data: QueryResponse['cw721']['allTokens'] | undefined;
}

/**
 * 
 * @param contractAddress
 * @returns
 */
export default function useQueryCW721Tokens(
  contractAddress: string,
): IQueryResult {
  const { data, loading, error } = useQuery<QueryResponse, Query>(
    gql`
    ${QueryText}
    `,
    { variables: { contractAddress } },
  );

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library


  return {
    loading,
    error,
    data: data?.cw721?.allTokens
  };
}
