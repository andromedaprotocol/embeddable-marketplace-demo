import { useAppStore } from "@/zustand/app";

export const LINKS = {
    home: (key?: string, chainId?: string) => wrapPrefix('', key, chainId),
    collection: (id: string) => wrapPrefix(`/${id}`),
    cw721Token: (collectionId: string, tokenId: string) => wrapPrefix(`/${collectionId}/cw721/${tokenId}`),
    cw20Token: (collectionId: string) => wrapPrefix(`/${collectionId}`)
} as const;

const wrapPrefix = (path: string, appId?: string, chainId?: string) => {
    const { config, isPreview } = useAppStore.getState();
    const { chainId: configChainId, id } = config ?? {};
    if (isPreview) {
        const params = new URLSearchParams(window.location.search)
        return `/preview${path}?${params}`
    }
    return `/${chainId || configChainId}/${appId || id}${path}`
}