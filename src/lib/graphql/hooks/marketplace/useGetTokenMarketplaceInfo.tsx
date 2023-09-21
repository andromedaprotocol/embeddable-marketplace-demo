import { useCodegenGeneratedAdoMarketplaceLatestsalestateQuery } from "@andromedaprotocol/gql/dist/__generated/react";

export function useGetTokenMarketplaceInfo(
  adoAddress: string,
  tokenAddress: string,
  tokenId: string
) {

  const { loading, error, data } = useCodegenGeneratedAdoMarketplaceLatestsalestateQuery({
    variables: {
      'ADO_marketplace_address': adoAddress,
      'ADO_marketplace_marketplace_latestSaleState_tokenAddress': tokenAddress,
      'ADO_marketplace_marketplace_latestSaleState_tokenId': tokenId
    }
  })

  return {
    loading,
    error,
    data: data?.ADO.marketplace,
  };
}
