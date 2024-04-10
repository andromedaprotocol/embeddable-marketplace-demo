"use client";
import { APP_ENV } from "@/appEnv";
import { IConfig } from "@/lib/app";
import { getClient, getConfig } from "@/lib/database/get";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { create } from "zustand";


export interface IDatabaseStore {
    client?: CosmWasmClient;
    cache: {
        [key: string]: IConfig | undefined;
    }
}

export const useDatabaseStore = create<IDatabaseStore>((set, get) => ({
    cache: {
        [APP_ENV.DEFAULT_CONFIG.id]: APP_ENV.DEFAULT_CONFIG,
    }
}))

export const resetDatabaseStore = () => {
    useDatabaseStore.setState({
        cache: {
            [APP_ENV.DEFAULT_CONFIG.id]: APP_ENV.DEFAULT_CONFIG,
        }
    })
}

export const addDatabaseCacheConfig = async (key: string) => {
    try {
        let client = useDatabaseStore.getState().client!;
        const config = await getConfig(client, key);
        useDatabaseStore.setState((prev) => ({
            ...prev,
            cache: {
                ...prev.cache,
                [key]: config
            }
        }));
        return config;
    } catch (err) {
        return undefined;
    }
}