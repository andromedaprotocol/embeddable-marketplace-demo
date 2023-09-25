"use client"
import { IConfig } from "@/lib/app";
import { parseEmbeddableUrl } from "@/utils/config";
import { KEPLR_AUTOCONNECT_KEY, connectAndromedaClient, initiateKeplr, useAndromedaStore } from "@/zustand/andromeda";
import { updateConfig } from "@/zustand/app";
import { useSearchParams } from "next/navigation";
import React, { FC, ReactNode, useEffect, useLayoutEffect, useState } from "react"

interface Props {
    children?: ReactNode;
}

const Providers: FC<Props> = (props) => {
    const { children } = props;
    const searchParams = useSearchParams();
    const chainId = searchParams.get('chain');
    const rawConfig = searchParams.get('config') as string;
    const [loaded, setLoaded] = useState(false);

    useLayoutEffect(() => {
        const config: IConfig = parseEmbeddableUrl(rawConfig);
        updateConfig(config);
        setLoaded(true)
    }, [rawConfig])

    const isConnected = useAndromedaStore(state => state.isConnected)
    const isLoading = useAndromedaStore(state => state.isLoading)
    const keplr = useAndromedaStore(state => state.keplr)
    const connectedChainId = useAndromedaStore(state => state.chainId)

    useLayoutEffect(() => {
        initiateKeplr();
    }, []);

    useLayoutEffect(() => {
        const autoconnect = localStorage.getItem(KEPLR_AUTOCONNECT_KEY);
        if (!isLoading && typeof keplr !== "undefined" && autoconnect === keplr?.mode) {
            if (!isConnected || (isConnected && (connectedChainId !== chainId))) {
                connectAndromedaClient(chainId);
            }
        }
    }, [keplr, isConnected, isLoading, chainId]);

    if (!loaded) return null;

    return (
        <>
            {children}
        </>
    )
}

export default Providers