import { IBaseCollection } from "@/lib/app/types";
import { useGetCw20, useGetCw20MarketingInfo } from "@/lib/graphql/hooks/cw20";
import { LINKS } from "@/utils/links";
import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC, useMemo } from "react";

interface CollectionRowItemProps {
  cw20: string;
  collection: IBaseCollection;
  contractAddress: string;
}
const CollectionRowItem: FC<CollectionRowItemProps> = (props) => {
  const { collection, cw20 } = props;

  const { data: token } = useGetCw20(cw20);

  const { data: tokenInfo } = useGetCw20MarketingInfo(cw20);

  if (!token) return null;

  return (
    <Box p={2}>
      <Link href={LINKS.cw20Token(collection.id, cw20)}>
      
        <Image src={tokenInfo?.marketingInfo?.logo?.url || "/fallback.svg"} alt="Image" borderRadius="lg" cursor='pointer' _hover={{
          scale: "110%"
        }} transform='auto' transition='ease-in' transitionProperty='all' transitionDuration='150ms' />
      </Link>
    </Box>
  );
};
export default CollectionRowItem;
