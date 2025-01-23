import { IExchangeCollection } from "@/lib/app/types";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { ChangeEvent, FC, useState } from "react";
import ExchangeIntro from "./ExchangeIntro";
import ExchangeCard from "./ExchangeCard";
import CONFIG from "@/config";
import PromiseButton from "../common/ui/PromiseButton";

interface Props {
    collection: IExchangeCollection;
}

const ExchangePage: FC<Props> = (props) => {

    const { collection } = props;

    const [nativeAmount, setNativeAmount] = useState(0);
    const handleAndrInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value ? parseInt(e.currentTarget.value) : 0;
        if (value >= 0) {
            setNativeAmount(value);
        }
    }
    const handleAddToKeplr = async () => {
        if (window.keplr) {
            try {
                await window.keplr.enable(CONFIG.chainId);
                await window.keplr.suggestToken(CONFIG.chainId, collection.cw20);
            } catch (error) {
                console.error("Failed to add token to Keplr", error);
            }
        }
    }


    return (

        <Flex direction="column" gap={4}>

            <Flex direction="row" justify={"space-between"} data-testid="exchange-page">
                <ExchangeIntro cw20={collection.cw20} data-testid="exchange-intro" />
                <ExchangeCard
                    handleAndrInput={handleAndrInput}
                    nativeAmount={nativeAmount}
                    exchange={collection.exchange}
                    cw20={collection.cw20}
                    data-testid="exchange-card"
                />
            </Flex>
            <Box borderWidth='1px' borderRadius='lg' padding={6} backgroundColor={"gray.50"} mt="4" mb="4">
                <Flex direction={"column"} justifyContent={'space-between'} padding={4}>
                    <Text fontWeight="bold" fontSize="3xl" mt="2" lineHeight="shorter" data-testid="add-contract-addr" mb='2' color={'blackAlpha.800'}>
                        Add your cw20 token to Keplr for easy balance tracking
                    </Text>
                    <Text fontSize="md" color={'blackAlpha.700'} mb='4'>
                        • You only need to do this once per token.
                        <br />
                        • Make sure your Keplr wallet is connected before proceeding.
                        <br />
                        • After adding, you can find the token in your Keplr asset list.
                    </Text>
                    <Flex justify={"center"}>
                        <PromiseButton width={"fit-content"} backgroundColor={"gray.900"} display={"block"} size={"md"} paddingX={'12'} onClick={handleAddToKeplr}>Add token to keplr</PromiseButton>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

export default ExchangePage;
