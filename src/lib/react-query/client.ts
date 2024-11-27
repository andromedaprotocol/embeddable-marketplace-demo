import { shortenString } from "@/utils/string";
import { createStandaloneToast } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";


const { toast } = createStandaloneToast()
const reactQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1 * 60 * 1000
        },
        mutations: {
            onError: (err) => {
                if ("error" in err) {
                    err = err.error as Error
                }
                let message: string = err?.message ?? "No Description"
                toast({
                    description: shortenString(message, 100),
                    status: "error",
                    position: "top-right",
                    duration: 3000,
                    isClosable: true
                }

                )

            }

        }
    }
})
export default reactQueryClient