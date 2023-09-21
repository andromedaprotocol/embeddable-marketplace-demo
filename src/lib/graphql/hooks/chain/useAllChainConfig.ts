import { useAllChainConfigQuery } from "@andromedaprotocol/gql/dist/__generated/react"

export default function useQueryAllChainInfo(
) {
  const { data, loading, error } = useAllChainConfigQuery();

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.chainConfigs?.allConfigs
  };
}
