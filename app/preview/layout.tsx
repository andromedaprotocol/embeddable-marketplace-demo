"use client";
import React, { FC, ReactNode, useEffect, useLayoutEffect, useState } from "react"
import { resetAppStore, useAppStore } from "@/zustand/app";
import Providers from "./providers";
import { Layout } from "@/modules/common/layout";
import { resetDatabaseStore, useDatabaseStore } from "@/zustand/database";
import { resetAndromedaStore } from "@/zustand/andromeda";

interface Props {
    children?: ReactNode;
}

const RootLayout = async (props: Props) => {
    const { children } = props;
    useLayoutEffect(() => {
        useAppStore.setState(prev => ({
            ...prev,
            isPreview: true
        }))
        return () => {
            resetAndromedaStore();
            resetAppStore();
            resetDatabaseStore();
        }
    }, [])
    return (
        <Providers>
            <Layout>
                {children}
            </Layout>
        </Providers>
    )
}

export default RootLayout