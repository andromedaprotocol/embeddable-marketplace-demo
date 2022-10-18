export const LINKS = {
    home: () => ``,
    collection: (slug: string) => `/collection/${slug}`,
    token: (collectionSlug: string, tokenId: string) => `/collection/${collectionSlug}/${tokenId}`
} as const;