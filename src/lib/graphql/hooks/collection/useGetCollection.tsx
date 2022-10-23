import { useAppUtils } from "@/lib/app/hooks";
import {
  QueryCW721ContractInfo as Query,
  QUERY_CW721_CONTRACT_INFO as QueryText,
  QueryCW721ContractInfoResponse as QueryResponse,
} from "@andromedaprotocol/andromeda.js/dist/andr-js/graphql/queries/cw721";
import { gql, QueryResult, useQuery } from "@apollo/client";
import { useMemo } from "react";

export interface IQueryResult
  extends Pick<QueryResult<QueryResponse>, "loading" | "error"> {
  data: QueryResponse["cw721"] | undefined;
}

export default function useGetCollection(collectionId: string): IQueryResult {
  const { getCollection } = useAppUtils();

  const colConfig = useMemo(() => {
    return getCollection(collectionId);
  }, [getCollection, collectionId]);

  const { data, loading, error } = useQuery<QueryResponse, Query>(
    gql`
      query QUERY_CW721_CONTRACT_INFO($contractAddress: String!) {
        cw721(address: $contractAddress) {
          contractInfo {
            name
            symbol
          }
          numTokens
        }
      }
    `,
    { variables: { contractAddress: colConfig?.contractAddress ?? "" } }
  );

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.cw721,
  };
}
