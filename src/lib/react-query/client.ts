import { shortenString } from "@/utils/string";
import { useToast } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";


const reactQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000
        },
        mutations: {


            onError: (err) => {
                const toast = useToast({
                    position: "top-right",
                    duration: 3000,
                    isClosable: true,
                });
                if ("error" in err) {
                    err = err.error as Error
                }
                let message: string = err?.message ?? "No Description"
                toast({
                    description: shortenString(message, 100),
                    status: "error",
                }

                )

            }

        }
    }
})
export default reactQueryClient