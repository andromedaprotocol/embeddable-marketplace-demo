import { useAppUtils } from "@/lib/app/hooks";
import { Box, Text } from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import CollectionRow from "./CollectionRow";
import Featured from "./Featured";

interface DiscoverPageProps {}
const DiscoverPage: FC<DiscoverPageProps> = (props) => {
  const {} = props;
  const { getCollections } = useAppUtils();

  const collections = useMemo(() => {
    return getCollections();
  }, [getCollections]);

  return (
    <Box>
      <Box mt="4">
        <Featured />
      </Box>
      <Text fontSize="xl" fontWeight="bold" mt="16">
        Explore Collections
      </Text>
      {collections.map((col) => (
        <Box mt="10" key={col.id}>
          <CollectionRow collectionId={col.id} />
        </Box>
      ))}
    </Box>
  );
};
export default DiscoverPage;
