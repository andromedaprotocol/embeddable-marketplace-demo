"use client"
import { IConfig } from "@/lib/app/types";
import { WalletProvider } from "@/lib/wallet";
import { GlobalModalProvider } from "@/modules/modals";
import { KEPLR_AUTOCONNECT_KEY, connectAndromedaClient, initiateKeplr, useAndromedaStore } from "@/zustand/andromeda";
import { updateConfig } from "@/zustand/app";
import React, { FC, ReactNode, useEffect } from "react"

interface Props {
    children?: ReactNode;
    config: IConfig;
}

const Providers: FC<Props> = (props) => {
    const { children, config } = props;
    const isConnected = useAndromedaStore(state => state.isConnected)
    const isLoading = useAndromedaStore(state => state.isLoading)
    const keplr = useAndromedaStore(state => state.keplr)

    useEffect(() => {
        updateConfig(config);
    }, [config])

    useEffect(() => {
        initiateKeplr();
    }, []);

    useEffect(() => {
        const autoconnect = localStorage.getItem(KEPLR_AUTOCONNECT_KEY);
        if (!isLoading || !isConnected && typeof keplr !== "undefined" && autoconnect === keplr?.mode) {
            connectAndromedaClient(config.chainId);
        }
    }, [keplr, isConnected, isLoading]);
    return (
        <WalletProvider>
            <GlobalModalProvider>
                {children}
            </GlobalModalProvider>
        </WalletProvider>
    )
}

export default Providers