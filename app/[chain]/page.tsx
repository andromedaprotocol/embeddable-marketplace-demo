import React, { FC } from "react"
import { getAllApps, getClient } from "@/lib/database/get";
import { HomePage } from "@/modules/home";


interface Props {
    params: {
        chain: string;
    }
}

const Page = async (props: Props) => {
    const { params: { chain } } = props;
    const client = await getClient(chain);
    const apps = await getAllApps(client);
    return (
        <HomePage apps={apps} chainId={chain} />
    )
}

export default Page