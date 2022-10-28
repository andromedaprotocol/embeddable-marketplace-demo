import {
  QueryAllChainConfigs as Query,
  QUERY_ALL_CHAIN_CONFIGS as QueryText,
  QueryAllChainConfigsResponse as QueryResponse
} from "@andromedaprotocol/andromeda.js";
import { gql, QueryResult, useQuery } from "@apollo/client";

export interface IQueryResult
  extends Pick<QueryResult<QueryResponse>, "loading" | "error"> {
  data: QueryResponse['chainConfigs']['allConfigs'] | undefined;
}

export default function useQueryAllChainInfo(
): IQueryResult {
  const { data, loading, error } = useQuery<QueryResponse, Query>(
    gql`
    ${QueryText}
    `,
    { variables: {} },
  );

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.chainConfigs?.allConfigs
  };
}
