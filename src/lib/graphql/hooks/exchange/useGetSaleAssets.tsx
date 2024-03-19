import { QueryResult, gql, useQuery } from "@apollo/client";

interface QueryResponse extends Pick<QueryResult<SaleAssetsResponse>, "loading" | "error"> {
  data: SaleAssetsResponse["ADO"]["cw20_exchange"] | undefined;
}

type SaleAssetsResponse = {
  ADO: {
    cw20_exchange: {
      tokenAddress: string
      saleAssets: [string]
    }
  }
}

const queryText = gql`
  query QUERY_EXCHANGE($contractAddress: String!) {
    ADO {
      cw20_exchange (address: $contractAddress) {
        tokenAddress
        saleAssets
      }
    }
  }
`

export function useGetSaleAssets(address: string): QueryResponse {

  const { data, loading, error } = useQuery(
    queryText,
    { variables: { contractAddress: address } }
  );

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library
  
  return {
    loading,
    error,
    data: data?.ADO?.cw20_exchange,
  };
}
