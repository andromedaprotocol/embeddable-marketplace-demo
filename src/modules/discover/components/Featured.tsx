import useApp from "@/lib/app/hooks/useApp";
import { ICollection } from "@/lib/app/types";
import { useGetCw721Token } from "@/lib/graphql/hooks/cw721";
import { useGetTokenUri } from "@/lib/graphql/hooks/cw721/useGetTokenUri";
import FallbackImage from "@/modules/common/ui/Image/FallbackImage";
import Cw721TokenAction from "@/modules/cw721/token/TokenAction";
import { LINKS } from "@/utils/links";
import { Box, GridItem, Image, SimpleGrid, Text, useToken } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";

interface FeaturedItemProps {
  collection: ICollection;
}
const FeaturedItem: FC<FeaturedItemProps> = (props) => {
  const { collection } = props;
  const { data: token } = useGetCw721Token(collection.cw721, collection.featured);
  const { tokenUri } = useGetTokenUri(token?.token_uri);
  const [primary] = useToken("colors", ["primary.300"]);
  if (!token) return null;
  return (
    <SimpleGrid columns={2} spacing="4">
      <GridItem>
        <Box>
          <Link href={LINKS.cw721Token(collection.id, collection.featured)}>
            <FallbackImage
              src={tokenUri?.image}
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
          <Cw721TokenAction
            collection={collection}
            tokenId={collection.featured}
          />
        </Box>
      </GridItem>
    </SimpleGrid>
  );
};


interface Props {
}

const Featured: FC<Props> = (props) => {
  const { } = props;
  const { config } = useApp();
  return (
    <Box>
      {config.collections.filter(col => col.featured && col.featured.length > 0).map(col => (
        <FeaturedItem key={col.id} collection={col} />
      ))}
    </Box>
  )
}

export default Featured
