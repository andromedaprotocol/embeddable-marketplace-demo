import { useCodegenGeneratedAdoCw20BalanceQuery } from "@andromedaprotocol/gql/dist/__generated/react"

export default function useGetCw20Balance(contractAddress: string, accountAddress: string) {
  const { data, loading, error } = useCodegenGeneratedAdoCw20BalanceQuery({
    variables: {
        'ADO_cw20_address': contractAddress,
        "ADO_cw20_cw20_balance_address": accountAddress
    }
  });

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.ADO.cw20.balance
  };
}
