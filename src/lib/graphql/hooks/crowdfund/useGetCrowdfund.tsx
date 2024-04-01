import { useCodegenGeneratedAdoCrowdfundQuery } from "@andromedaprotocol/gql/dist/__generated/react";


export function useGetCrowdfund(
    adoAddress: string,
) {
    const { loading, error, data } = useCodegenGeneratedAdoCrowdfundQuery({
        variables: {
            'ADO_crowdfund_address': adoAddress
        }
    })
    console.log(data);
    return {
        loading,
        error,
        data: data?.ADO.crowdfund,
    };
}
