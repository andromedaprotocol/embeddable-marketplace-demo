import { useGetTokenFromColId } from "@/lib/graphql/hooks/collection";
import { LINKS } from "@/utils/links";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC, useMemo } from "react";

interface CollectionRowTokenProps {
  tokenId: string;
  collectionId: string;
}
const CollectionRowToken: FC<CollectionRowTokenProps> = (props) => {
  const { collectionId, tokenId } = props;

  const { data: token } = useGetTokenFromColId(collectionId, tokenId);

  if (!token) return null;

  return (
    <Link href={LINKS.token(collectionId, tokenId)}>
      <Flex
        cursor="pointer"
        direction="column"
        justifyContent="end"
        bg={`url(${token.extension.image}), linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 60%)`}
        bgBlendMode="darken"
        w="full"
        h="full"
        rounded="2xl"
        bgPos="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        p="6"
      >
        <Text fontWeight="bold" color="white">
          {token.extension.name}
        </Text>
      </Flex>
    </Link>
  );
};
export default CollectionRowToken;
