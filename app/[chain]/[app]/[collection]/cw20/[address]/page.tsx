"use client";
import { IExchangeCollection, useAppUtils } from "@/lib/app";
import { useCodegenGeneratedAdoCw20AndrQuery } from "@andromedaprotocol/gql/dist/__generated/react";
import { notFound } from 'next/navigation'
import React, { FC } from "react"
import ExchangePage from "@/modules/exchange/ExchangePage"

interface Props {
    params: {
        collection: string;
        token: string;
    }
}

const Page: FC<Props> = (props) => {
    const { params: { collection: collectionId, token: tokenId } } = props;
    const { getCollection } = useAppUtils();
    const collection = getCollection(collectionId) as IExchangeCollection;
    const { error } = useCodegenGeneratedAdoCw20AndrQuery({
        variables: {
            'ADO_cw20_address': collection.cw20
        }
    });
    console.log(error, "Error");
    if (error) {
        return notFound()
    }

    return (
        <ExchangePage
            collection={collection}
        />
    )
}

export default Page