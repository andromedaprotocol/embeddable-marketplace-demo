import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import CollectionRouter from "@/modules/collection/components/Router";
import { Layout } from "@/modules/common/layout";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

const Page: NextPage = () => {
    const router = useRouter();
    const collectionId = router.query.collection as string;
    const collection = useGetCollection(collectionId);

    if (!router.isReady) {
        return null;
    }
    if (!collection) {
        return <Error statusCode={404} />;
    }
    
    return (
        <Layout>
            <CollectionRouter collectionId={collectionId} />
        </Layout>
    );
};

export default Page;
