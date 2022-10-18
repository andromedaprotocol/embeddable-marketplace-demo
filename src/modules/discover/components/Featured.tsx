import useQueryCW721Token from "@/lib/graphql/hooks/cw721/useQueryCw721Token";
import { TokenInfo } from "@/modules/token";
import { Box, GridItem, Image, SimpleGrid } from "@chakra-ui/react";
import React, { FC } from "react";

interface FeaturedProps {
  tokenId: string;
  contractAddress: string;
}
const Featured: FC<FeaturedProps> = (props) => {
  const { tokenId, contractAddress } = props;
  const { data: token } = useQueryCW721Token(contractAddress, tokenId);

  return (
    <SimpleGrid columns={2} spacing="4">
      <GridItem>
        <Box>
          <Image
            src={token?.extension.image}
            alt="Image"
            borderRadius="lg"
            maxW="sm"
          />
        </Box>
      </GridItem>
      <GridItem>
        <Box maxW="sm" ml="auto" position="sticky" top="4">
          <TokenInfo tokenId={tokenId} contractAddress={contractAddress} />
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};
export default Featured;
