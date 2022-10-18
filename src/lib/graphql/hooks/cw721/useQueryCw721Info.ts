import {
  QueryCW721ContractInfo as Query,
  QUERY_CW721_CONTRACT_INFO as QueryText,
  QueryCW721ContractInfoResponse as QueryResponse
} from "@andromedaprotocol/andromeda.js/dist/andr-js/graphql/queries/cw721";
import { gql, QueryResult, useQuery } from "@apollo/client";
export interface IQueryResult
  extends Pick<QueryResult<QueryResponse>, "loading" | "error"> {
  data: QueryResponse['cw721'] | undefined;
}

/**
 * 
 * @param contractAddress
 * @returns
 */
export default function useQueryCW721Info(
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
    data: data?.cw721
  };
}
