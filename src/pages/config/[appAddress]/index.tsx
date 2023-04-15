import { Layout } from "@/modules/common/layout";
import type { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import useGetApp from "@/lib/graphql/hooks/app/useGetApp";
import { useEffect, useState } from "react";
import useApp from "@/lib/app/hooks/useApp";
import Link from "next/link";

const Page: NextPage = () => {
  const router = useRouter();
  const appAddress = router.query.appAddress as string;
  const { config, updateConfig } = useApp();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const {data: appData, loading: appLoading, error: appError} = useGetApp(appAddress);

  useEffect(() => {
    if (appData) {
      updateConfig(appData);
      console.log(config);
      console.log(appData);

      // set a timeout to redirect after 3 seconds
      const redirectTimeout = setTimeout(() => {
        setShouldRedirect(true);
      }, 3000);

      // clean up the timeout on unmount
      return () => clearTimeout(redirectTimeout);
    }
  }, [appData]);

  if (shouldRedirect) {
    router.push("/");
    return null;
  }

  if (!router.isReady) {
    return null;
  }

  return (
    <>
      <div>App Address: {appAddress}</div>

      {appLoading && <div>Loading...</div>}
    

      {appData && (
      <div>
        Config is loaded into cache.  <Link href="/">Redirecting to homepage...</Link>
        <br/><br/><br/>
        {JSON.stringify(appData)}
      </div>
    )}

    </>
  );
};

export default Page;
