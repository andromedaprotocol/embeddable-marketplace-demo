"use client";
import { APP_ENV } from "@/appEnv";
import { IConfig } from "@/lib/app";
import { create } from "zustand";


export interface IAppStore {
    config: IConfig;
}

export const useAppStore = create<IAppStore>((set, get) => ({
    config: APP_ENV.DEFAULT_CONFIG,
}))

export const updateConfig = (config: IConfig) => {
    useAppStore.setState((prev) => ({
        ...prev,
        config: config
    }))
}