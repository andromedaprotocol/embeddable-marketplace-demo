import { useAppStore } from "@/zustand/app";

export const LINKS = {
    home: (key?: string) => wrapPrefix('', key),
    collection: (id: string) => wrapPrefix(`/${id}`),
    cw721Token: (collectionId: string, tokenId: string) => wrapPrefix(`/${collectionId}/cw721/${tokenId}`)
} as const;

const wrapPrefix = (path: string, appId?: string) => {
    const { config, isPreview } = useAppStore.getState();
    const { chainId, id } = config ?? {};
    if (isPreview) {
        const params = new URLSearchParams(window.location.search)
        return `/preview${path}?${params}`
    }
    return `/${chainId}/${appId || id}${path}`
}