import { useAppUtils } from "@/lib/app/hooks";
import { IAuctionCollection } from "@/lib/app/types";
import { useGetCw721Token } from "@/lib/graphql/hooks/cw721";
import { Layout } from "@/modules/common/layout";
import Cw721TokenPage from "@/modules/cw721/token";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const router = useRouter();
  const collectionId = router.query.collection as string;
  const tokenId = router.query.tokenId as string;
  const { getCollection } = useAppUtils();
  const collection = getCollection(collectionId) as IAuctionCollection;

  const { data: token, error } = useGetCw721Token(collection?.cw721 ?? '', tokenId)

  if (!router.isReady) {
    return null;
  }
  // if (!collection || error) {
  //   console.log('Here')
  //   return <Error statusCode={404} />;
  // }

  if (!token) return null;

  return (
    <Layout>
      <Cw721TokenPage tokenId={tokenId} collection={collection} contractAddress={collection.cw721} />
    </Layout>
  );
};

export default Page;
