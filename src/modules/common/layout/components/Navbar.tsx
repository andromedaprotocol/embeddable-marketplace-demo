import { Box, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { CollectionDropdown, ConnectWallet } from "@/modules/common/cta";

interface NavbarProps {}
const Navbar: FC<NavbarProps> = (props) => {
  const {} = props;

  return (
    <Box py="2" px="8">
      <Flex
        direction="row"
        alignItems="center"
        maxW="container.lg"
        mx="auto"
        gap="4"
      >
        <Text fontSize="lg" fontWeight="bold">
          Banded Armadillo Rock Club
        </Text>
        <Flex direction="row" ml="auto" gap="2">
          <CollectionDropdown />
          <ConnectWallet />
        </Flex>
      </Flex>
    </Box>
  );
};
export default Navbar;
