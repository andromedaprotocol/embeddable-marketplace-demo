import { usePlaceBidConstruct } from "@/lib/andrjs";
import useApp from "@/lib/app/hooks/useApp";
import { useGetTokenAuctionState } from "@/lib/graphql/hooks/auction";
import { useGetToken } from "@/lib/graphql/hooks/collection";
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
import { BuyNowModalProps } from "../types";

const BuyNowModal: FC<BuyNowModalProps> = (props) => {
  const { contractAddress, tokenId, marketplaceAddress } = props;
  const { data: token } = useGetToken(contractAddress, tokenId);
//   const { data: auctionState } = useGetTokenAuctionState(
//     contractAddress,
//     auctionAddress,
//     tokenId
//   );
  const { config } = useApp();
  const construct = usePlaceBidConstruct();

 
  const onSubmit = () => {
 //   openExecute(msg, true, funds);
  };

  return (
    <Box>
      <Heading size="md" mb="6" fontWeight="bold">
        Place Bid
      </Heading>
      <Text textStyle="light" mb="4">
        You are about to buy <b>{token?.extension?.name}</b>.
       
      </Text>
      <Box>
        <FormControl>
          {/* <FormLabel>Price</FormLabel>
          <HStack>
            <Box w="full">
              
              
            </Box>
           
          </HStack> */}
          <Button onClick={onSubmit} w="full" mt="6" variant="solid">
            Buy Now
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default BuyNowModal;
