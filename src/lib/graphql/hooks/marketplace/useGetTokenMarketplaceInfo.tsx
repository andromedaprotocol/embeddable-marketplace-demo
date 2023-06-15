import { gql, QueryResult, useQuery } from "@apollo/client";

export interface IQueryResult
  extends Pick<QueryResult<newQueryResponse>, "loading" | "error"> {
  data: newQueryResponse["ADO"]["marketplace"] | undefined;
}
/*
Temporary GQL query variables until we find or add these in the andr library
*/



interface newQuery  {
  adoAddress:string;
  tokenAddress: string;
  tokenId: string;
}

const newQueryText = gql`
query QUERY_MARKETPLACE($adoAddress:String!, $tokenAddress: String!, $tokenId: String!){
  ADO{
  marketplace(address:$adoAddress){
    latestSaleState(tokenAddress:$tokenAddress, tokenId:$tokenId ){
      coin_denom,
      price,
      sale_id,
      status
  },
  address,
  type
}}
}
`

type newQueryResponse = {
  ADO: {
    marketplace: {
      latestSaleState: {
        coin_denom: string;
        price: string;
        sale_id: string;
        status: string;
      },
      address: string;
      type: string;
    }
  }
}

export function useGetTokenMarketplaceInfo(
  adoAddress: string,
  tokenAddress: string,
  tokenId: string
): IQueryResult {
  
  const { loading, error, data } = useQuery<newQueryResponse, newQuery>(
    newQueryText,
    {
      variables: {
        adoAddress: adoAddress ?? "",
        tokenAddress: tokenAddress ?? "",
        tokenId,
      },
    }
  );

  return {
    loading,
    error,
    data: data?.ADO.marketplace ,
  };
}
