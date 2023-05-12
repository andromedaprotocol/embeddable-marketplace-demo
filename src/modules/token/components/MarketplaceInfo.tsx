import { useAppUtils } from "@/lib/app/hooks";
import useApp from "@/lib/app/hooks/useApp";
import { useGetTokenAuctionStateFromColId } from "@/lib/graphql/hooks/auction";
import {
  useGetTokenFromColId,
  useGetCollection,
} from "@/lib/graphql/hooks/collection";
import { useGetTokenMarketplaceInfo } from "@/lib/graphql/hooks/marketplace";
import { PlaceBidButton } from "@/modules/common/cta";
import { BuyNowButton } from "@/modules/common/cta/components/buynow";
import { formatTime, getTime } from "@/utils/time";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Flame, Share } from "lucide-react";
import React, { FC, useEffect, useMemo, useState } from "react";

interface MarketplaceInfoProps {
  tokenId: string;
  collectionId: string;
  adoAddress: string;
  cw721Address: string;
  
}
const MarketplaceInfo: FC<MarketplaceInfoProps> = (props) => {
  const { tokenId, collectionId, adoAddress, cw721Address } = props;
  const { getCollection } = useAppUtils();
  const { config} = useApp();

  const colConfig = useMemo(() => {
    return getCollection(collectionId);
  }, [collectionId, getCollection]);

  const { data: collection } = useGetCollection(collectionId);
  const { data: token } = useGetTokenFromColId(collectionId, tokenId);


  //Auction variables:


  const {data: marketplaceState} = useGetTokenMarketplaceInfo(
    
    adoAddress,
    cw721Address,
    tokenId

   )

   console.log("MarketplaceState:", marketplaceState);
  
   // const { data: auctionState } = useGetTokenAuctionStateFromColId(
  //   collectionId,
  //   tokenId
  // );
  
  // const startTime = getTime(auctionState?.start_time ?? {});
  // const endTime = getTime(auctionState?.end_time ?? {});

  // const isStarted = startTime.isBefore(new Date());

  // // might be a is cancelled 
  // // need to have a is claimed
  // // claim prompt for 'needs to be claimed' status
  
  // const isEnded = endTime.isBefore(new Date());

  // const [duration, setDuration] = useState(dayjs.duration(0));



  
  // useEffect(() => {
  //   if (!auctionState) return;
  //   const tId = setInterval(() => {
  //     if (isEnded) {
  //       setDuration(dayjs.duration(0));
  //       clearInterval(tId);
  //       return;
  //     }
  //     const today = new Date();
  //     if (isStarted) {
  //       setDuration(dayjs.duration(endTime.diff(today)));
  //     } else {
  //       setDuration(dayjs.duration(startTime.diff(today)));
  //     }
  //   }, 1000);
  //   return () => clearInterval(tId);
  // }, [auctionState]);


  return (
    <Box w="full">
      <HStack justify="space-between">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {token?.extension.name}
          </Text>
          <Text fontSize="xs" fontWeight="thin" fontStyle="light">
            Collection: <b>{collection?.contractInfo.name}</b>
          </Text>
        </Box>
        <Button leftIcon={<Share width={16} />} variant="outline">
          Share
        </Button>
      </HStack>
      <Box
        border="1px"
        borderColor="gray.300"
        rounded="lg"
        mt="4"
        p="4"
        minW="xs"
        w="full"
      >
        <SimpleGrid columns={2} spacing="2">
          
          {marketplaceState?.latestSaleState.status==="open" ? ( 
          <Box>
            <Text fontSize="xs" textStyle="light">
              Current Price
            </Text>
            <Flex gap="2">
              <Text fontWeight="bold" fontSize="sm">
                {marketplaceState?.latestSaleState.price} - {marketplaceState?.latestSaleState.coin_denom}
              </Text>
            </Flex>
          </Box>
         ) : (
          <Box>
            <Text fontSize="xs" textStyle="light">
              Currently Not For Sale
            </Text>
            <Flex gap="2">
              <Text fontWeight="bold" fontSize="sm">
                {marketplaceState?.latestSaleState.price} - {marketplaceState?.latestSaleState.coin_denom}
              </Text>
            </Flex>
          </Box>

         )}
          <Box>
            <Text fontSize="xs" textStyle="light">
            &nbsp;
            </Text>
            
          </Box>
        </SimpleGrid>
        <Divider my="4" />
        
        
          
         <BuyNowButton
          disabled={marketplaceState?.latestSaleState.status!=="open"}
          contractAddress={cw721Address ?? ""}
          marketplaceAddress={marketplaceState?.address ?? ""}
          tokenId={tokenId}
          mt="4"
        >
          
        </BuyNowButton> 
      </Box>
    </Box>
  );
};
export default MarketplaceInfo;
