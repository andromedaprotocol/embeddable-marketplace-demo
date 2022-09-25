import { COLLECTIONS, NFT_TRENDING } from "@/utils/seed";
import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import CollectionRow from "./CollectionRow";
import Featured from "./Featured";

interface DiscoverPageProps {}
const DiscoverPage: FC<DiscoverPageProps> = (props) => {
  const {} = props;

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">
        Featured NFT
      </Text>
      <Box mt="4">
        <Featured token={NFT_TRENDING[0]} />
      </Box>
      <Text fontSize="xl" fontWeight="bold" mt="16">
        Explore Collections
      </Text>
      {COLLECTIONS.map((collection) => (
        <Box mt="10" key={collection.id}>
          <CollectionRow collection={collection} />
        </Box>
      ))}
    </Box>
  );
};
export default DiscoverPage;
