import { useGetToken } from "@/lib/graphql/hooks/collection";
import { Layout } from "@/modules/common/layout";
import { TokenPage } from "@/modules/token";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();
  const collectionId = router.query.id as string;
  const tokenId = router.query.tokenId as string;
  const { data: token, error } = useGetToken(collectionId, tokenId);

  if (!router.isReady) {
    return null;
  }
  if (error) {
    return <Error statusCode={404} />;
  }

  if (!token) return null;

  return (
    <Layout>
      <TokenPage tokenId={tokenId} collectionId={collectionId} />
    </Layout>
  );
};

export default Page;
