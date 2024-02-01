import { gql, QueryResult, useQuery } from "@apollo/client";

interface QueryResponse extends Pick<QueryResult<SaleAssetsResponse>, "loading" | "error"> {
  data: SaleAssetsResponse["ADO"] | undefined;
}

type SaleAssetsResponse = {
  ADO: {
    cw20_exchange: {
      sale: {
        amount: number
        exchange_rate: number
        recipient: string
      }
    }
    cw20: {
      tokenInfo: {
        symbol: string
        total_supply: number
        name: string
        decimals: number
      }
      marketingInfo: {
        logo: string
      }
    }
  }
}

const queryText = gql`
  query QUERY_EXCHANGE($contractAddress: String!, $cw20Address: String!, $native: String) {
    ADO {
      cw20_exchange (address: $contractAddress) {
        sale(native: $native, cw20: "") {
          amount
          exchange_rate
          recipient
        }
      }
      cw20(address: $cw20Address) {
        tokenInfo {
          symbol
          total_supply
          name
          decimals
        }
        marketingInfo {
          logo
        }
      }
    }
  }
`
  
export function useGetSaleInfo(address: string, cw20: string, native: string): QueryResponse {

  const { data, loading, error } = useQuery(
    queryText,
    { variables: { contractAddress: address, cw20Address: cw20.toLocaleLowerCase(), native: native.toLocaleLowerCase() } }
  );

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library
  
  return {
    loading,
    error,
    data: data?.ADO,
  };
}
