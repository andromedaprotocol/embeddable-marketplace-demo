import { useGetTokenCrowdfundInfo } from "@/lib/graphql/hooks/crowdfund";
import {
  Box,
  HStack,
  Text,
  Progress,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { getTime } from "@/utils/time";
import dayjs from "dayjs";
import { ICrowdfundCollection } from "@/lib/app/types";


interface CrowdfundInfoProps {
  tokenId: string;
  collection: ICrowdfundCollection;
  name: string;
  collectionName: string;
}
const CrowdfundInfo: FC<CrowdfundInfoProps> = (props) => {
  const { tokenId, collection, name, collectionName } = props;

  const { data: crowdfundState } = useGetTokenCrowdfundInfo(
    collection.crowdfund
  )

  // get crowdfund variables
  const min_tokens_sold = crowdfundState?.state.min_tokens_sold || 0;
  const price = parseInt(crowdfundState?.state.price.amount || "");
  const denom = crowdfundState?.state.price.denom;
  const amount_to_send = 6;
  const amount_transferred = crowdfundState?.state.amount_transferred || 0;

  const total_sold = amount_to_send + amount_transferred;

  const progress = Math.floor(total_sold / min_tokens_sold * 100);
  const total_raise = min_tokens_sold * price + " " + denom;

  const expires = getTime(crowdfundState?.state.expiration ?? {});

  const isEnded = expires.isBefore(new Date());
  const today = new Date();

  const duration = dayjs.duration(expires.diff(today))

  return (
    <Box w="full">
      <HStack justify="space-between">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="xs" fontWeight="thin" fontStyle="light">
            Collection: <b>{collectionName}</b>
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
        <br />
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
        <Progress colorScheme='green' size='sm' mt="3" value={progress} borderRadius="md" />
        <Text>
          {duration.asDays().toFixed(0)} days to go
        </Text>
        {/* <BuyNowButton
          //   disabled={marketplaceState?.latestSaleState.status!=="open"}
          contractAddress={cw721Address ?? ""}
          //   marketplaceAddress={marketplaceState?.address ?? ""}
          tokenId={tokenId}
          mt="4" marketplaceAddress={""}        >

        </BuyNowButton> */}
      </Box>
    </Box>
  );
};
export default CrowdfundInfo;
