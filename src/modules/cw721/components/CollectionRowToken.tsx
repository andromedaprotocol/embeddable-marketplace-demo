import { IBaseCollection } from "@/lib/app/types";
import { useGetCw721Token } from "@/lib/graphql/hooks/cw721";
import FallbackImage from "@/modules/common/ui/Image/FallbackImage";
import { LINKS } from "@/utils/links";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC, useMemo } from "react";

interface CollectionRowTokenProps {
  tokenId: string;
  collection: IBaseCollection;
  contractAddress: string;
}
const CollectionRowToken: FC<CollectionRowTokenProps> = (props) => {
  const { collection, contractAddress, tokenId } = props;

  const { data: token } = useGetCw721Token(contractAddress, tokenId);

  return (
    <Box p={2}>
      <Link href={LINKS.cw721Token(collection.id, tokenId)}>
        <FallbackImage src={token?.metadata?.image} alt="Image" borderRadius="lg" cursor='pointer' _hover={{
          scale: "110%"
        }} transform='auto' transition='ease-in' transitionProperty='all' transitionDuration='150ms' />
      </Link>
    </Box>
    // <Link href={LINKS.cw721Token(collection.id, tokenId)}>
    //   <Flex
    //     cursor="pointer"
    //     direction="column"
    //     justifyContent="end"
    //     bg={`url(${token.extension.image}), linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 60%)`}
    //     bgBlendMode="darken"
    //     w="full"
    //     h="full"
    //     rounded="2xl"
    //     bgPos="center"
    //     bgSize="cover"
    //     bgRepeat="no-repeat"
    //     p="6"
    //   >
    //     <Text fontWeight="bold" color="white">
    //       {token.extension.name}
    //     </Text>
    //   </Flex>
    // </Link>
  );
};
export default CollectionRowToken;
