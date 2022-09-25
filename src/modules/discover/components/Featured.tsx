import { TokenInfo } from "@/modules/token";
import { IToken } from "@/modules/token/types";
import { Box, GridItem, Image, SimpleGrid } from "@chakra-ui/react";
import React, { FC } from "react";

interface FeaturedProps {
  token: IToken;
}
const Featured: FC<FeaturedProps> = (props) => {
  const { token } = props;

  return (
    <SimpleGrid columns={2} spacing="4">
      <GridItem>
        <Box>
          <Image src={token.image} alt="Image" borderRadius="lg" maxW="sm" />
        </Box>
      </GridItem>
      <GridItem>
        <Box maxW="sm" ml="auto" position="sticky" top="4">
          <TokenInfo token={token} />
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};
export default Featured;
