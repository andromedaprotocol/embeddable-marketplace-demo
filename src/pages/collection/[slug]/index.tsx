import { CollectionPage } from "@/modules/collection";
import { Layout } from "@/modules/common/layout";
import { COLLECTIONS } from "@/utils/seed";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const collection = COLLECTIONS.find(
    (col) => col.slug === slug || col.id === slug
  );

  if (!router.isReady) {
    return null;
  }
  if (!collection) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout>
      <CollectionPage collection={collection} />
    </Layout>
  );
};

export default Page;
