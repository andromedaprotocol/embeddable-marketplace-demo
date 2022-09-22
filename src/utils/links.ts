export const LINKS = {
    home: () => ``,
    collection: (slug: string) => `/collection/${slug}`,
    token: (slug: string) => `collection/token/${slug}`
} as const;