import { usePlaceBidConstruct } from "@/lib/andrjs";
import useApp from "@/lib/app/hooks/useApp";
import { useGetTokenAuctionState } from "@/lib/graphql/hooks/auction";
import { NumberInput } from "@/modules/common/ui";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { coins } from "@cosmjs/proto-signing";
import { FC, useState } from "react";
import { useExecuteModal } from "../hooks";
import { PlaceBidModalProps } from "../types";
import { useGetCw721Token } from "@/lib/graphql/hooks/cw721";

const PlaceBidModal: FC<PlaceBidModalProps> = (props) => {
  const { contractAddress, tokenId, auctionAddress } = props;
  const { data: token } = useGetCw721Token(contractAddress, tokenId);
  const { data: auctionState } = useGetTokenAuctionState(
    contractAddress,
    auctionAddress,
    tokenId
  );
  const { config } = useApp();
  const construct = usePlaceBidConstruct();

  // Execute place bid directly on auction
  const openExecute = useExecuteModal(auctionAddress);

  const MIN_BID = Math.max(
    0,
    auctionState?.min_bid ?? 0,
    auctionState?.high_bidder_amount ?? 0
  );

  const DENOM = auctionState?.coin_denom ?? config?.coinDenom ?? "ujunox";

  const [amount, setAmount] = useState(MIN_BID);

  const onSubmit = () => {
    const msg = construct({ tokenAddress: contractAddress, tokenId: tokenId });
    const funds = coins(amount, DENOM);
    openExecute(msg, true, funds);
  };

  return (
    <Box>
      <Heading size="md" mb="6" fontWeight="bold">
        Place Bid
      </Heading>
      <Text textStyle="light" mb="4">
        You are about to place bid for <b>{token?.metadata?.name}</b>
        <br />
        Token Id: {tokenId}
        <br />
        Auction Id: {auctionState?.auction_id}
      </Text>
      <Box>
        <FormControl>
          <FormLabel>Your Bid</FormLabel>
          <HStack>
            <Box w="full">
              <NumberInput
                defaultValue={MIN_BID}
                min={MIN_BID}
                value={amount}
                onChange={(valS, valNum) => {
                  setAmount(valNum);
                }}
              />
            </Box>
            <Text>{DENOM.toUpperCase()}</Text>
          </HStack>
          <FormHelperText>
            Highest bid: {auctionState?.high_bidder_amount ?? "None"} {DENOM}
          </FormHelperText>
          <Button onClick={onSubmit} w="full" mt="6" variant="solid">
            Place a bid
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PlaceBidModal;
