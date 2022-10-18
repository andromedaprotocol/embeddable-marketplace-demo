import { CW721s } from "@/utils/constants";
import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import CollectionRow from "./CollectionRow";

interface DiscoverPageProps {}
const DiscoverPage: FC<DiscoverPageProps> = (props) => {
  const {} = props;

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">
        Featured NFT
      </Text>
      <Box mt="4">{/* <Featured token={NFT_TRENDING[0]} /> */}</Box>
      <Text fontSize="xl" fontWeight="bold" mt="16">
        Explore Collections
      </Text>
      {CW721s.map((address) => (
        <Box mt="10" key={address}>
          <CollectionRow contractAddress={address} />
        </Box>
      ))}
    </Box>
  );
};
export default DiscoverPage;
