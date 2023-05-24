import { useAppUtils } from "@/lib/app/hooks";
import useApp from "@/lib/app/hooks/useApp";
import {
  useGetTokenFromColId,
  useGetCollection,
} from "@/lib/graphql/hooks/collection";
import { useGetTokenCrowdfundInfo } from "@/lib/graphql/hooks/crowdfund";
import { BuyNowButton } from "@/modules/common/cta/components/buynow";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  Progress,
  VStack
} from "@chakra-ui/react";
import { Flame, Share } from "lucide-react";
import React, { FC, useEffect, useMemo, useState } from "react";
import { formatTime, getTime } from "@/utils/time";
import dayjs from "dayjs";
interface CrowdfundInfoProps {
  tokenId: string;
  collectionId: string;
  adoAddress: string;
  cw721Address: string;
  
}
const CrowdfundInfo: FC<CrowdfundInfoProps> = (props) => {
  const { tokenId, collectionId, adoAddress, cw721Address } = props;
  const { getCollection } = useAppUtils();
  const { config} = useApp();

  const colConfig = useMemo(() => {
    return getCollection(collectionId);
  }, [collectionId, getCollection]);

  const { data: collection } = useGetCollection(collectionId);
  const { data: token } = useGetTokenFromColId(collectionId, tokenId);


  
  const {data: crowdfundState} = useGetTokenCrowdfundInfo(
    
    adoAddress
    

   )

// get crowdfund variables
const min_tokens_sold = crowdfundState?.state.min_tokens_sold || 0;
const price = parseInt( crowdfundState?.state.price.amount || "");
const denom =   crowdfundState?.state.price.denom;
const amount_to_send = 6;
const amount_transferred = crowdfundState?.state.amount_transferred || 0;

const total_sold = amount_to_send + amount_transferred;

const progress = Math.floor(total_sold/min_tokens_sold * 100);
const total_raise = min_tokens_sold*price + " " + denom;

const expires = getTime(crowdfundState?.state.expiration ?? {});

const isEnded = expires.isBefore(new Date());
const today = new Date();

const duration = dayjs.duration(expires.diff(today))

// if not sold out


console.log("progress:", progress);


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

        <Text
        bg="#e6f2e6"
        p={2}
        borderRadius="md"
        display="inline-flex"
        alignItems="center"
        width="62px"
        height="14px"
        >
       
            <Text ml={2} fontSize="xs" color="green">
            Open
            </Text>
        </Text>
        <br/>
        <Text
        p={2}
        display="inline-flex"
        alignItems="center"
        fontSize={"lg"}
        fontWeight={"bold"}
        >
            {total_sold * price} {denom} 
        </Text>
      
        <Text
        display="inline-flex"
        alignItems="center"
        fontSize={"sm"}
        >
            pledged of {min_tokens_sold * price} {denom} goal

        </Text>



        <Progress colorScheme='green' size='sm' mt="3" value={progress} borderRadius="md"/>

        
        <Text>
        {duration.asDays().toFixed(0)} days to go
        </Text>
        
          
         <BuyNowButton
                  //   disabled={marketplaceState?.latestSaleState.status!=="open"}
                  contractAddress={cw721Address ?? ""}
                  //   marketplaceAddress={marketplaceState?.address ?? ""}
                  tokenId={tokenId}
                  mt="4" marketplaceAddress={""}        >
          
        </BuyNowButton> 
      </Box>
    </Box>
  );
};
export default CrowdfundInfo;
