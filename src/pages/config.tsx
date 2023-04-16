import { Layout } from "@/modules/common/layout";
import { Config } from "@/modules/config";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <Config />
    </Layout>
  );
};

export default Home;