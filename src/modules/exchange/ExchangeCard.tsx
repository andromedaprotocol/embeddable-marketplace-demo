import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import React, { ChangeEvent, FC, useMemo } from "react";
import ExchangeInput from "./ExchangeInput";
import { ArrowDownIcon } from "@/modules/common/icons";
import ExchangeCardSummary from "./ExchangeCardSummary";
import { useGetSaleInfo } from "@/lib/graphql/hooks/exchange";
import useExchangeConfirmModal from "@/modules/modals/hooks/useExchangeConfirmModal";
import useApp from "@/lib/app/hooks/useApp";
import { formatNumber } from "@/utils/number";
import { useAndromedaStore } from "@/zustand/andromeda";
import useQueryChain from "@/lib/graphql/hooks/chain/useChainConfig";
import { useGetCw20Balance } from "@/lib/graphql/hooks/cw20";
import { useGetBalance } from "@/lib/andrjs";
import { ConnectWallet } from "../common/cta";

interface ExchangeCardProps {
  handleAndrInput: (e: ChangeEvent<HTMLInputElement>) => void;
  nativeAmount: number;
  exchange: string;
  cw20: string;
}

const ExchangeCard: FC<ExchangeCardProps> = (props) => {
  const { handleAndrInput, nativeAmount, exchange, cw20 } = props;
  const { config } = useApp();
  const { accounts, chainId } = useAndromedaStore();
  const account = accounts[0];
  const { balance } = useGetBalance(config.coinDenom, account?.address);
  const { data: chainConfig } = useQueryChain(chainId);
  const { data, loading, error } = useGetSaleInfo(exchange, cw20, balance.denom);
  const { data: cw20_balance } = useGetCw20Balance(cw20, account?.address);

  const { symbol, total_amount, amount, exchange_rate, cw20_url, cw20_decimals } = useMemo(() => {
    let logo = JSON.parse(JSON.stringify(data?.cw20.marketingInfo?.logo) || "{}");
    let decimals = data?.cw20.tokenInfo.decimals || 0;
    let divider = 10 ** decimals;
    let total_amount = (data?.cw20.tokenInfo.total_supply || 0) / divider;
    let amount = (data?.cw20_exchange?.sale?.amount || 0) / divider;
    return {
      cw20_decimals: decimals,
      symbol: data?.cw20.tokenInfo?.symbol || "",
      total_amount: total_amount,
      amount: amount,
      exchange_rate: data?.cw20_exchange?.sale?.exchange_rate || 0,
      cw20_url: logo && logo["url"]
    };
  }, [data]);

  const open = useExchangeConfirmModal({
    cw20Symbol: symbol,
    nativeAmount: nativeAmount,
    exchangeAddress: exchange,
    exchangeRate: exchange_rate,
    nativeDenom: config.coinDenom
  });

  return (
    <Box borderWidth='1px' borderRadius='lg' padding={6} data-testid="exchange-card">
      <Text fontWeight="bold" fontSize="3xl" data-testid="buy-tokens-title">Buy {symbol} Tokens</Text>
      <Flex gap={6} backgroundColor={"blue.50"} rounded={"sm"} py={1} px={4} mt={6} data-testid="supply-info">
        <Flex gap={1}>
          <Text color={"blackAlpha.600"}>Max Supply</Text>
          <Text fontWeight={"bold"}>{formatNumber(total_amount)} {symbol}</Text>
        </Flex>
        <Flex gap={1}>
          <Text color={"blackAlpha.600"}>Available for Purchase</Text>
          <Text fontWeight={"bold"}>{formatNumber(amount)} {symbol}</Text>
        </Flex>
      </Flex>
      <Box mt={6}>
        <Flex justify={"space-between"} mb={2} data-testid="balance-info">
          <Text color={"blackAlpha.600"}>You pay in {account ? balance.denom : "uandr"}</Text>
          <Text color={"#5B6BCF"} decoration={"underline"}>Balance: {balance.amount}</Text>
        </Flex>
        <ExchangeInput onChange={handleAndrInput} value={nativeAmount} icon={chainConfig?.iconUrls?.sm || ''} symbol={symbol} />
      </Box>
      <Box textAlign={"center"} my={4}>
        <ArrowDownIcon color={"#5B6BCF"} />
      </Box>
      {account ? (
        <Box data-testid="exchange-actions">
          <Box mb={6}>
            <Flex justify={"space-between"} mb={2}>
              <Text color={"blackAlpha.600"}>You get {symbol}</Text>
            </Flex>
            <Flex justify={"space-between"} align={"center"} mb={2} background={"gray.100"} py={2} px={3} borderRadius={"lg"} data-testid="token-receive-info">
              <Text fontWeight={"bold"}>{Math.floor(nativeAmount / exchange_rate) || 0}</Text>
              <Image src={cw20_url} alt={symbol} w="8" />
            </Flex>
          </Box>
          <Button backgroundColor={"gray.900"} display={"block"} width={"full"} onClick={open} isDisabled={nativeAmount == 0} data-testid="buy-button">
            Buy
          </Button>
          <ExchangeCardSummary
            rate={exchange_rate}
            estimatedCost={nativeAmount}
            balance={balance}
            cw20_balance={cw20_balance || 0}
            cw20_decimals={cw20_decimals || 0}
            targetSymbol={symbol}
          />
        </Box>
      ) : (
        <Flex justify={"center"} data-testid="connect-wallet">
          <ConnectWallet />
        </Flex>
      )}
    </Box>
  );
};

export default ExchangeCard;
