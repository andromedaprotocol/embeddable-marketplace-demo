import useApp from "@/lib/app/hooks/useApp";
import { useGetTokenFromColId } from "@/lib/graphql/hooks/collection";
import { TokenInfo } from "@/modules/token";
import { Box, GridItem, Image, SimpleGrid } from "@chakra-ui/react";
import React, { FC } from "react";

interface FeaturedProps {}
const Featured: FC<FeaturedProps> = (props) => {
  const {} = props;
  const { config } = useApp();
  const { collectionId, tokenId } = config.featured;
  const { data: token } = useGetTokenFromColId(collectionId, tokenId);

  return (
    <SimpleGrid columns={2} spacing="4">
      <GridItem>
        <Box boxShadow="md">
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
          <TokenInfo tokenId={tokenId} collectionId={collectionId} />
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};
export default Featured;
