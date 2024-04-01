

import { useCodegenGeneratedAdoCw20MarketinginfoQuery } from "@andromedaprotocol/gql/dist/__generated/react";

export default function useGetCW20MarketingInfo(address: string) {

  const { data, loading, error } = useCodegenGeneratedAdoCw20MarketinginfoQuery({
    variables: {
      'ADO_cw20_address': address
    }
  })
  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.ADO?.cw20,
  };
}
