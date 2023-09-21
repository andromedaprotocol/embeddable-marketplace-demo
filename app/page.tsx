import React, { FC } from "react"
import { getAllApps, getClient } from "@/lib/database/get";
import { APP_ENV } from "@/appEnv";
import { HomePage } from "@/modules/home";

const client = await getClient(APP_ENV.DATABASE.chainId);

interface Props {
}

const Page = async (props: Props) => {
    const { } = props;
    const apps = await getAllApps(client);
    return (
        <HomePage apps={apps} />
    )
}

export default Page