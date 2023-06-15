import { SESSION_KEYS, getSessionStorage } from "./storage";

export const LINKS = {
    home: () => wrapInConfig(`/`),
    collection: (collectionId: string) => wrapInConfig(`/${collectionId}`),
    cw721Token: (collectionId: string, tokenId: string) => wrapInConfig(LINKS.collection(collectionId) + `/cw721/${tokenId}`, true)
} as const;

const wrapInConfig = (url: string, noWrap = false) => {
    if(noWrap) return url;
    const configUri = getSessionStorage(SESSION_KEYS.CONFIG_URI);
    if (!configUri) return url;
    return `/${configUri}` + url;
}