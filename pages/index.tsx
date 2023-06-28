import { Layout } from "@/modules/common/layout";
import { DiscoverPage } from "@/modules/discover";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <DiscoverPage />
    </Layout>
  );
};

export default Home;
