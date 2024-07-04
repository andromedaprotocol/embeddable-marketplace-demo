import { useCodegenGeneratedAdoCw721NftinfoQuery } from "@andromedaprotocol/gql/dist/__generated/react";



export default function useGetToken(contractAddress: string, tokenId: string) {
  const { loading, error, data } = useCodegenGeneratedAdoCw721NftinfoQuery({
    variables: {
      'ADO_cw721_address': contractAddress,
      ADO_cw721_cw721_nftInfo_tokenId: tokenId
    },
  })
  return {
    loading,
    error,
    data: data?.ADO.cw721.nftInfo,
  };
}
