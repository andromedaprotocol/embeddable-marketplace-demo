import { gql, QueryResult, useQuery } from "@apollo/client";
export interface IQueryResult
    extends Pick<QueryResult<newQueryResponse>, "loading" | "error"> {
    data: newQueryResponse["ADO"]["crowdfund"] | undefined;
}
/*
Temporary GQL query variables until we find or add these in the andr library
*/



interface newQuery {
    adoAddress: string;

}

const newQueryText = gql`
query QUERY_CROWDFUND($adoAddress:String!) {
  ADO{
    crowdfund(address: $adoAddress)
    {
      address,
      availableTokens,
      config{
        token_address,
        can_mint_after_sale
      },
      state{
      amount_sold,
      amount_to_send,
      amount_transferred,
      expiration,
      max_amount_per_wallet,
      min_tokens_sold,
      price{
        amount,
        denom
      },
      recipient
      },
      type
    }
  }
}`;


type newQueryResponse = {
    ADO: {
        crowdfund: {
            address: string;
            availableTokens: [string];
            config: {
                token_address: {
                    identifier: string;
                }
                can_mint_after_sale: string;
            };
            state: {
                amount_sold: number;
                amount_to_send: number;
                amount_transferred: number;
                expiration: {
                    at_time: string;
                };
                max_amount_per_wallet: number;
                min_tokens_sold: number;
                price: {
                    amount: string;
                    denom: string;
                }
                recipient: {
                    addr: string;
                }
            };
            type: string;
        }
    }
};




export function useGetCrowdfund(
    adoAddress: string,
): IQueryResult {

    const { loading, error, data } = useQuery<newQueryResponse, newQuery>(
        newQueryText,
        {
            variables: {
                adoAddress: adoAddress ?? "",
            },
        }
    );

    return {
        loading,
        error,
        data: data?.ADO.crowdfund,
    };
}
