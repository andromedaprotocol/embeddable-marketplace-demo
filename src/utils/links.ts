import { useAppStore } from "@/zustand/app";
import { SESSION_KEYS, getSessionStorage } from "./storage";

export const LINKS = {
    home: (key?: string) => `/${key || useAppStore.getState().config.id}`,
    collection: (id: string) => `/${useAppStore.getState().config.id}/${id}`,
    cw721Token: (collectionId: string, tokenId: string) => `/${useAppStore.getState().config.id}/${collectionId}/cw721/${tokenId}`
} as const;