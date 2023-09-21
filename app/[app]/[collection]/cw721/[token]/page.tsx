"use client";
import { IAuctionCollection, useAppUtils } from "@/lib/app";
import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import { useGetCw721Token } from "@/lib/graphql/hooks/cw721";
import CollectionRouter from "@/modules/collection/components/Router";
import Cw721TokenPage from "@/modules/cw721/token";
import { notFound } from 'next/navigation'
import React, { FC } from "react"

interface Props {
    params: {
        collection: string;
        token: string;
    }
}

const Page: FC<Props> = (props) => {
    const { params: { collection: collectionId, token: tokenId } } = props;
    const { getCollection } = useAppUtils();
    const collection = getCollection(collectionId) as IAuctionCollection;
    const { error } = useGetCw721Token(collection?.cw721 ?? '', tokenId)
    if (error) {
        return notFound()
    }

    return (
        <Cw721TokenPage tokenId={tokenId} collection={collection} contractAddress={collection.cw721} />
    )
}

export default Page