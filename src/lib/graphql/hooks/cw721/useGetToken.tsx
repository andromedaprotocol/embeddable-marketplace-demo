import { Exact, Scalars } from "@andromedaprotocol/gql";
import { gql, useQuery } from "@apollo/client";

const Cw721NftinfoDocument = /*#__PURE__*/ gql`
  query CODEGEN_GENERATED_ADO_CW721_NFTINFO(
    $ADO_cw721_address: String!
    $ADO_cw721_cw721_nftInfo_tokenId: String!
  ) {
    ADO {
      cw721(address: $ADO_cw721_address) {
        nftInfo(tokenId: $ADO_cw721_cw721_nftInfo_tokenId) {
          extension {
            publisher
          }
          token_uri
        }
      }
    }
  }
`;

export type Cw721NftinfoQuery = {
  __typename?: "Query";
  ADO: {
    __typename?: "AdoQuery";
    cw721: {
      __typename?: "CW721Ado";
      nftInfo: {
        __typename?: "NftInfo";
        token_uri: string;
        extension: {
          __typename?: "TokenExtension";
          publisher: string;
        };
      };
    };
  };
};
type Cw721NftinfoQueryVariables = Exact<{
  ADO_cw721_address: Scalars["String"]["input"];
  ADO_cw721_cw721_nftInfo_tokenId: Scalars["String"]["input"];
}>;

export default function useGetToken(contractAddress: string, tokenId: string) {
  const { loading, error, data } = useQuery<
    Cw721NftinfoQuery,
    Cw721NftinfoQueryVariables
  >(Cw721NftinfoDocument, {
    variables: {
      ADO_cw721_address: contractAddress,
      ADO_cw721_cw721_nftInfo_tokenId: tokenId,
    },
  });

  return {
    loading,
    error,
    data: data?.ADO.cw721.nftInfo,
  };
}
