import { useChainConfigQuery } from "@andromedaprotocol/gql/dist/__generated/react";

export default function useQueryChain(
  chainId: string,
) {
  const { data, loading, error } = useChainConfigQuery({ variables: { identifier: chainId } })

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.chainConfigs?.config
  };
}
