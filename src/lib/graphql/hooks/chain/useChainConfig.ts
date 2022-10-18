import {
  QueryChainConfig as Query,
  QUERY_CHAIN_CONFIG as QueryText,
  QueryChainConfigResponse as QueryResponse
} from "@andromedaprotocol/andromeda.js";
import { gql, QueryResult, useQuery } from "@apollo/client";

export interface IQueryResult
  extends Pick<QueryResult<QueryResponse>, "loading" | "error"> {
  data: QueryResponse['chainConfigs']['config'] | undefined
}

export default function useQueryChain(
  chainId: string,
): IQueryResult {
  const { data, loading, error } = useQuery<QueryResponse, Query>(
    gql`
    ${QueryText}
    `,
    { variables: { 'identifier': chainId } },
  );

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.chainConfigs?.config
  };
}
