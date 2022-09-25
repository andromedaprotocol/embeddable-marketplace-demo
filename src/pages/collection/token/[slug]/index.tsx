import { Layout } from "@/modules/common/layout";
import { TokenPage } from "@/modules/token";
import { NFT_TRENDING } from "@/utils/seed";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const token = NFT_TRENDING.find((token) => token.id === slug);

  if (!router.isReady) {
    return null;
  }
  if (!token) {
    return <Error statusCode={404} />;
  }
  return (
    <Layout>
      <TokenPage token={token} />
    </Layout>
  );
};

export default Page;
