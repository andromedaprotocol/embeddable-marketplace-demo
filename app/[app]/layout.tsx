import React, { FC, ReactNode } from "react"
import Providers from "./providers";
import { Metadata, ResolvingMetadata } from "next";
import { Layout } from "@/modules/common/layout";
import { getClient, getConfig } from "@/lib/database/get";
import { APP_ENV } from "@/appEnv";

const client = await getClient(APP_ENV.DATABASE.chainId);
interface Props {
    children?: ReactNode;
    params: {
        app: string;
    };
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const config = await getConfig(client, params.app);
    return {
        title: config.name,
        openGraph: {
            images: ['/logo.png'],
        },
    }
}

const RootLayout = async (props: Props) => {
    const { children, params } = props;
    const config = await getConfig(client, params.app);
    return (
        <Providers config={config}>
            <Layout>
                {children}
            </Layout>
        </Providers>
    )
}

export default RootLayout