import {
  QueryCW721ContractInfo as Query,
  QUERY_CW721_CONTRACT_INFO as QueryText,
  QueryCW721ContractInfoResponse,
} from "@andromedaprotocol/andromeda.js/dist/graphql/queries/cw721";
import { gql, QueryResult, useQuery } from "@apollo/client";

export interface QueryResponse extends QueryCW721ContractInfoResponse {
  cw721: QueryCW721ContractInfoResponse['cw721'] & {
    address: string
  }
}

export interface IQueryResult
  extends Pick<QueryResult<QueryResponse>, "loading" | "error"> {
  data: QueryResponse["cw721"] | undefined;
}

export default function useGetCW721(address: string): IQueryResult {

  const { data, loading, error } = useQuery<QueryResponse, Query>(
    gql`
      query QUERY_CW721_CONTRACT_INFO($contractAddress: String!) {
        cw721(address: $contractAddress) {
          contractInfo {
            name
            symbol
          }
          address
          numTokens,
          minter
        }
      }
    `,
    { variables: { contractAddress: address } }
  );

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.cw721,
  };
}
