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
import { FC, useMemo, useState } from "react";
import { useExecuteModal } from "../hooks";
import { CrowdfundGroupBuyModalProps } from "../types";
import { useGetCrowdfund } from "@/lib/graphql/hooks/crowdfund";
import useCrowdfundGroupPurchaseConstruct from "@/lib/andrjs/hooks/useCrowdfundGroupPurchaseConstruct";
import { sumCoins } from "@/lib/andrjs/utils/funds";
import { NumberInput } from "@/modules/common/ui";

const CrowdfundGroupBuyModal: FC<CrowdfundGroupBuyModalProps> = (props) => {
  const { crowdfundAddress } = props;
  const { data: crowdfund } = useGetCrowdfund(crowdfundAddress);
  const [numTokens, setNumTokens] = useState(1);

  const construct = useCrowdfundGroupPurchaseConstruct();

  const price = useMemo(() => {
    try {
      const oneTokenCoin = coins(crowdfund?.state?.price?.amount ?? '0', crowdfund?.state?.price?.denom ?? '');
      return sumCoins([...new Array(numTokens)].map(() => oneTokenCoin[0]));
    } catch (err) {
      return undefined;
    }
  }, [numTokens, crowdfund])
  // Execute place bid directly on auction
  const openExecute = useExecuteModal(crowdfundAddress);

  const onSubmit = () => {
    if (!price) return;
    const msg = construct({ numTokens: numTokens });
    console.log(JSON.stringify(msg));
    const funds = coins(price?.amount, price?.denom);
    openExecute(msg, true, funds);
  };

  return (
    <Box>
      <Heading size="md" mb="6" fontWeight="bold">
        Purchase
      </Heading>
      <Text textStyle="light" mb="4">
        Price of one token = <b>{crowdfund?.state?.price?.amount} {crowdfund?.state?.price?.denom}</b>
      </Text>
      <Box>
        <FormControl>
          <FormLabel>Number of tokens</FormLabel>
          <HStack>
            <Box w="full">
              <NumberInput
                defaultValue={1}
                min={1}
                value={numTokens}
                onChange={(valS, valNum) => {
                  setNumTokens(valNum);
                }}
                max={crowdfund?.availableTokens?.length}
              />
            </Box>
            <Text>{price?.denom.toUpperCase()}</Text>
          </HStack>
          <FormHelperText>
            Available tokens: {crowdfund?.availableTokens?.length ?? 0}
          </FormHelperText>
          <Button onClick={onSubmit} w="full" mt="6" variant="solid">
            Buy&nbsp;<b>{numTokens}</b>&nbsp;for&nbsp;<b>{price?.amount} {price?.denom}</b>
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CrowdfundGroupBuyModal;


