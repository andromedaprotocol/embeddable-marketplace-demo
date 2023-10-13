import { addTokenUriCache, useTokenUriStore } from "@/zustand/tokenUri";
import { Attributes, useCallback, useEffect, useState } from "react";

export const useGetTokenUri = (tokenUri?: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const cacheUri = useTokenUriStore(state => state[tokenUri ?? '']);


    const update = useCallback(async () => {
        setLoading(true);
        if (!cacheUri && tokenUri) {
            await addTokenUriCache(tokenUri).then(res => {
                setError(undefined);
                return res;
            }).catch(err => {
                setError(err?.message || "Error")
            });
        }
        setLoading(false);
    }, [tokenUri])

    useEffect(() => {
        const tId = setTimeout(update, 500);
        return () => clearTimeout(tId);
    }, [tokenUri])

    return {
        tokenUri: cacheUri,
        loading,
        error
    }

}