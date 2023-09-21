import { APP_ENV } from "@/appEnv";
import { LINKS } from "@/utils/links";
import { addDatabaseCacheConfig, useDatabaseStore } from "@/zustand/database";
import { Box, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC, useEffect } from "react";

interface FeaturedItemProps {
  appId: string;
}
const FeaturedItem: FC<FeaturedItemProps> = (props) => {
  const { appId } = props;
  const config = useDatabaseStore(state => state.cache[appId]);
  useEffect(() => {
    addDatabaseCacheConfig(appId);
  }, []);

  if (!config) return null;
  return (
    <Box>
      <Link href={LINKS.home(appId)}>
        <Image
          src={'/logo.png'}
          alt="Image"
          borderRadius="lg"
          maxW="sm"
          boxShadow="md"
          cursor="pointer"
        />
      </Link>
      <Text>{config.name}</Text>
    </Box>
  );
};


interface Props {
}

const Featured: FC<Props> = (props) => {
  const { } = props;
  return (
    <Box>
      <Text>Featured Apps</Text>
      {APP_ENV.FEATURED_APPS.map(app => (
        <FeaturedItem key={app} appId={app} />
      ))}
    </Box>
  )
}

export default Featured
