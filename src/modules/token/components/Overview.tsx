import { NFTInfo } from "@andromedaprotocol/andromeda.js";
import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";


interface OverviewProps {
   token:NFTInfo;
}
const Overview: FC<OverviewProps> = (props) => {
  const  token  = props.token;
  console.log("Overview Token:", token);
  return (

    <Box>
      <Text fontWeight="bold" fontSize="xl">
        Description
      </Text>
      <Text mt="4" fontWeight="light" fontSize="sm">
        {token.extension?.description}
      </Text>
      <Text fontWeight="bold" fontSize="xl" mt="8">
        Details
      </Text>
      <Box mt="4" p="10" rounded="2xl" border="1px" borderColor="gray.300">
        Details
      </Box>
</Box>
  );
};
export default Overview;
