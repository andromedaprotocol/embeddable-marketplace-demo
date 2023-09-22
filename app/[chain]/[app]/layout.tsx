import React, { ReactNode } from "react"
import Providers from "./providers";
import { Metadata } from "next";
import { getClient, getConfig } from "@/lib/database/get";
import { Layout } from "@/modules/common/layout";

interface Props {
    children?: ReactNode;
    params: {
        app: string;
        chain: string;
    };
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const client = await getClient(params.chain);
    const config = await getConfig(client, params.app);
    return {
        title: config.name,
        openGraph: {
            images: ['/logo.png'],
            'title': config.name,
            'releaseDate': config.modifiedDate,
            'creators': config.twitter
        },
    }
}

const RootLayout = async (props: Props) => {
    const { children, params } = props;
    const client = await getClient(params.chain);
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