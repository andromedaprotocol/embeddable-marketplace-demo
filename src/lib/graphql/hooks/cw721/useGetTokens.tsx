import { useCodegenGeneratedAdoCw721AlltokensQuery } from "@andromedaprotocol/gql/dist/__generated/react";


export default function useGetTokens(address: string) {

  const { data, loading, error } = useCodegenGeneratedAdoCw721AlltokensQuery({
    variables: {
      'ADO_cw721_address': address
    }
  })

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.ADO.cw721.allTokens,
  };
}
