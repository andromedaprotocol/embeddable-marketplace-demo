import useAndromedaClient from "@/lib/andrjs/hooks/useAndromedaClient";
import { useQuery } from "@tanstack/react-query";

export interface Rate {
    "local": {
        "rate_type": "additive" | "deductive",
        "value": {
            "flat"?: {
                "denom": string,
                "amount": string
            },
            "percent"?: {
                "percent": string
            }
        },
        "decription": string
    }
}

export function useGetRate(address: string, action: string) {

    const client = useAndromedaClient();

    return useQuery({
        queryKey: ["ado", "rate", address, action, client?.isConnected],
        queryFn: async () => {
            const rate = await client?.chainClient?.queryClient?.queryContractSmart(address, {
                "rates": {
                    "action": action
                }
            }).then(res => res as Rate)
            return rate;
        }
    })


}