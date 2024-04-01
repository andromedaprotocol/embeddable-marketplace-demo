"use client";
import { IExchangeCollection, useAppUtils } from "@/lib/app";
import { useMiniBaseAdoQuery } from "@andromedaprotocol/gql/dist/__generated/react";
import { notFound } from 'next/navigation'
import React, { FC } from "react"
import ExchangePage from "@/modules/exchange/ExchangePage"

interface Props {
    params: {
        collection: string;
    }
}

const Page: FC<Props> = (props) => {
    const { params: { collection: collectionId } } = props;
    const { getCollection } = useAppUtils();
    const collection = getCollection(collectionId) as IExchangeCollection;
    const { data, error } = useMiniBaseAdoQuery({
        variables: {
            'contractAddress': collection.cw20
        }
    });
    console.log(error, "Error");
    if (error || data?.ADO.ado.andr.type !== 'cw20') {
        return notFound()
    }

    return (
        <ExchangePage
            collection={collection}
        />
    )
}

export default Page