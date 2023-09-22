"use client";
import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import CollectionRouter from "@/modules/collection/components/Router";
import { notFound } from 'next/navigation'
import React, { FC } from "react"

interface Props {
    params: {
        collection: string;
    }
}

const Page: FC<Props> = (props) => {
    const { params: { collection: collectionId } } = props;
    const collection = useGetCollection(collectionId);
    if (!collection) {
        return notFound()
    }

    return (
        <CollectionRouter collectionId={collectionId} />
    )
}

export default Page