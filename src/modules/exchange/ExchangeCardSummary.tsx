import { formatNumber } from "@/utils/number";
import { Flex, Text, Box } from "@chakra-ui/react";
import { Coin } from "@cosmjs/proto-signing";
import React, { FC } from "react"

interface ExchangeCardSummaryProps {
    estimatedCost: number,
    rate: number,
    balance: Coin,
    targetSymbol: string,
}

const ExchangeCardSummary: FC<ExchangeCardSummaryProps> = (props) => {
    const {estimatedCost, rate, balance, targetSymbol} = props;
    return (
        <Box borderColor="gray.300" p={4} borderWidth={"1px"} mt={6}>
            <Flex justify={"space-between"}>
                <Text color={"blackAlpha.600"}>Estimaded cost</Text>
                <Text color={"gray.900"} fontWeight={"bold"}>{formatNumber(estimatedCost)} {balance.denom}</Text>
            </Flex>
            <Flex justify={"space-between"}>
                <Text color={"blackAlpha.600"}>Exchange Rate</Text>
                <Text>1 {targetSymbol} = {rate.toLocaleString('en', {useGrouping:true})} {balance.denom}</Text>
            </Flex>
            <Flex justify={"space-between"}>
                <Text color={"blackAlpha.600"}>Your Asset Balance</Text>
                <Text>{formatNumber(estimatedCost)} {balance.denom}</Text>
            </Flex>
        </Box>
    )
}

export default ExchangeCardSummary
