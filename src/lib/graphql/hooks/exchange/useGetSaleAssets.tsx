import { useCodegenGeneratedAdoCw20ExchangeSaleassetsQuery } from "@andromedaprotocol/gql/dist/__generated/react";

export function useGetSaleAssets(address: string) {

  const { data, loading, error } = useCodegenGeneratedAdoCw20ExchangeSaleassetsQuery(
    { variables: { ADO_cw20_exchange_address: address } }
  );
  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.ADO?.cw20_exchange,
  };
}
