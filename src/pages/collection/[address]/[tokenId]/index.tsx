import { useQueryCW721Info } from "@/lib/graphql";
import useQueryCW721Token from "@/lib/graphql/hooks/cw721/useQueryCw721Token";
import { Layout } from "@/modules/common/layout";
import { TokenPage } from "@/modules/token";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();
  const contractAddress = router.query.address as string;
  const tokenId = router.query.tokenId as string;
  const { data: token, error } = useQueryCW721Token(contractAddress, tokenId);

  if (!router.isReady) {
    return null;
  }
  if (error) {
    return <Error statusCode={404} />;
  }

  if (!token) return null;

  return (
    <Layout>
      <TokenPage tokenId={tokenId} contractAddress={contractAddress} />
    </Layout>
  );
};

export default Page;
