import useApp from "@/lib/app/hooks/useApp";
import { useGetTokenFromColId } from "@/lib/graphql/hooks/collection";
import { TokenInfo } from "@/modules/token";
import { LINKS } from "@/utils/links";
import { Box, GridItem, Image, SimpleGrid, useToken } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";

interface FeaturedProps {}
const Featured: FC<FeaturedProps> = (props) => {
  const {} = props;
  const { config } = useApp();
  const { collectionId, tokenId } = config.featured ?? {};
  const { data: token } = useGetTokenFromColId(collectionId, tokenId);
  const [primary] = useToken("colors", ["primary.300"]);
  if(!config.featured) return null;

  return (
    <SimpleGrid columns={2} spacing="4">
      <GridItem>
        <Box>
          <Link href={LINKS.token(collectionId, tokenId)}>
            <Image
              src={token?.extension.image}
              alt="Image"
              borderRadius="lg"
              maxW="sm"
              boxShadow="md"
              cursor="pointer"
              _hover={{
                boxShadow: `0px 0px 0px 4px ${primary}`,
              }}
            />
          </Link>
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
