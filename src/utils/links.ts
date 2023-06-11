import { SESSION_KEYS, getSessionStorage } from "./storage";

export const LINKS = {
    home: () => wrapInConfig(`/`),
    collection: (slug: string) => wrapInConfig(`/collection/${slug}`),
    token: (collectionSlug: string, tokenId: string) => wrapInConfig(`/collection/${collectionSlug}/${tokenId}`)
} as const;

const wrapInConfig = (url: string) => {
    const configUri = getSessionStorage(SESSION_KEYS.CONFIG_URI);
    if (!configUri) return url;
    return `/${configUri}` + url;
}