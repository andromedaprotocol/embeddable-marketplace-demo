import { useCw721InfoQuery } from "@andromedaprotocol/gql/dist/__generated/react";


export default function useGetCW721(address: string) {

  const { data, loading, error } = useCw721InfoQuery({
    variables: {
      'contractAddress': address
    }
  })

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.ADO?.cw721,
  };
}
