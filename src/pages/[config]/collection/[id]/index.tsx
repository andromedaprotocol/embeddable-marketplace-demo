import { useGetCollection } from "@/lib/graphql/hooks/collection";
import { CollectionPage } from "@/modules/collection";
import { Layout } from "@/modules/common/layout";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();
  const collectionId = router.query.id as string;

  const { data, error } = useGetCollection(collectionId);

  if (!router.isReady) {
    return null;
  }
  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) return null;

  return (
    <Layout>
      <CollectionPage collectionId={collectionId} />
    </Layout>
  );
};

export default Page;
