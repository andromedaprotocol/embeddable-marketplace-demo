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
            onError: (err: unknown) => {
                let error: Error;
                if (typeof err === 'object' && err !== null && 'error' in err) {
                    error = (err as { error: Error }).error;
                } else if (err instanceof Error) {
                    error = err;
                } else {
                    error = new Error('Unknown error occurred');
                }
                
                const message = error.message ?? "No Description";
                toast({
                    description: shortenString(message, 100),
                    status: "error",
                    position: "top-right",
                    duration: 3000,
                    isClosable: true
                });
            }
        }
    }
})
export default reactQueryClient