import useQueryChain from "@/lib/graphql/hooks/chain/useChainConfig";
import { useGetCw20MarketingInfo } from "@/lib/graphql/hooks/cw20";
import { useAndromedaStore } from "@/zustand/andromeda";
import { Flex, Text, Button, Link } from "@chakra-ui/react";
import React, { FC } from "react";

interface ExchangeIntroProps {
  cw20: string;
}

const ExchangeIntro: FC<ExchangeIntroProps> = (props) => {
  const { cw20 } = props;
  const { accounts, chainId } = useAndromedaStore();
  const { data: chainConfig } = useQueryChain(chainId);
  const { data: tokenInfo } = useGetCw20MarketingInfo(cw20);

  return (
    <Flex direction="row" justify={"space-between"} my={"auto"} data-testid="exchange-intro">
      <Flex direction="column" width={663}>
        <Text fontWeight="bold" fontSize="6xl" mt="2" lineHeight={"shorter"} data-testid="intro-title">
          Buy and sell CW20 tokens on {chainConfig?.chainName} Chain
        </Text>
        <Text fontWeight="light" fontSize="md" mt="2" mb="2" data-testid="intro-description">
          {tokenInfo?.marketingInfo?.description}
        </Text>
        <Link href={tokenInfo?.marketingInfo?.project} target="_blank" data-testid="learn-more-link">
          <Button width={"fit-content"} backgroundColor={"gray.900"} paddingX={12} data-testid="learn-more-button">
            Learn more
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}

export default ExchangeIntro;
