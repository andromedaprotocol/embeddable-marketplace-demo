import useQueryCW721Info from "@/lib/graphql/hooks/cw721/useQueryCw721Info";
import { CollectionPage } from "@/modules/collection";
import { Layout } from "@/modules/common/layout";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();
  const address = router.query.address as string;
  const { data, error } = useQueryCW721Info(address);
  console.log(data, error, address);

  if (!router.isReady) {
    return null;
  }
  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) return null;

  return (
    <Layout>
      <CollectionPage contractAddress={address} />
    </Layout>
  );
};

export default Page;
