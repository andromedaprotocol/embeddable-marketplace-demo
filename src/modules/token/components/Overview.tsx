import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { IToken } from "../types";

interface OverviewProps {}
const Overview: FC<OverviewProps> = (props) => {
  const {} = props;

  return (
    <Box>
      <Text fontWeight="bold" fontSize="xl">
        Description
      </Text>
      <Text mt="4" fontWeight="light" fontSize="sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda,
        beatae voluptate? Eum amet ipsa dolore voluptas officia! Debitis magni
        asperiores animi eius delectus, repellendus quibusdam est totam,
        veritatis nihil doloribus!
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
