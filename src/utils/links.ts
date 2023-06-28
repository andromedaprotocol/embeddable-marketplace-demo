import { SESSION_KEYS, getSessionStorage } from "./storage";

export const LINKS = {
    home: () => wrapInConfig(`/`),
    collection: (collectionId: string) => wrapInConfig(`/${collectionId}`),
    cw721Token: (collectionId: string, tokenId: string) => wrapInConfig(`/${collectionId}/cw721/${tokenId}`)
} as const;

const wrapInConfig = (url: string, noWrap = false) => {
    if (noWrap) return url;
    const configUri = getSessionStorage(SESSION_KEYS.CONFIG_URI);
    if (!configUri) return url;
    if (!url.includes('?'))
        url = url + '?';
    else
        url = url + '&';
    return url + `config=${configUri}`;
}