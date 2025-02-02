import { IExchangeCollection } from "@/lib/app/types";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import React, { ChangeEvent, FC, useMemo, useState } from "react";
import ExchangeIntro from "./ExchangeIntro";
import ExchangeCard from "./ExchangeCard";
import CONFIG from "@/config";
import PromiseButton from "../common/ui/PromiseButton";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    useDisclosure
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import { apolloClient } from "@/lib/graphql";
import { IKeplrConfigQuery } from "@andromedaprotocol/gql/dist/__generated/react";
import { refetchKeplrConfigQuery } from "@andromedaprotocol/gql/dist/__generated/react";
import { useAndromedaStore } from "@/zustand/andromeda";



interface Props {
    collection: IExchangeCollection;
}

const ExchangePage: FC<Props> = (props) => {
    const toast = useToast({
        position: "top-right",
        duration: 3000,
        isClosable: true,
    });
    const [error, setError] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const state = useAndromedaStore()

    const isCosmwasmError = useMemo(() => {
        return (error.includes("The chain doesn't support cosmwasm"))

    }, [error])

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
                setError("")
                toast({
                    title: `Token added successfully`,

                });
            } catch (error: any) {
                console.error("Failed to add token to Keplr.", error);
                setError(error.message)
                toast({
                    title: `Error while adding token`,
                    description: error.message,
                    status: "error",
                });

                onOpen()
            }
        }
    }

    const suggestChain = async () => {
        try {
            console.log("Suggesting chain")
            const keplrConfig = await apolloClient.query<IKeplrConfigQuery>(refetchKeplrConfigQuery({
                'identifier': state.chainId
            }))

            await state.keplr?.experimentalSuggestChain({ ...keplrConfig.data.keplrConfigs.config, features: ["cosmwasm"] });
            toast({
                title: `Chain connected successfully`,

            });

        } catch (err) {

            console.log("SuggestChainError : ", err)
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

            {state.isConnected &&
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
                        <Flex alignItems={"center"} justify={"center"} gap={4} >
                            <PromiseButton width={"fit-content"} backgroundColor={"gray.900"} display={"block"} size={"md"} paddingX={'12'} onClick={handleAddToKeplr}>Add token to keplr</PromiseButton>

                            {isCosmwasmError &&
                                <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
                                    <ModalOverlay />
                                    <ModalContent bg={"gray.800"} color={"white"}>
                                        <ModalHeader fontSize={"xl"} style={{ color: "InactiveCaption" }}> The chain you are using has been detected to have been previously setup in a way that does not support auto-adding contracts. To resolve, follow this steps :- </ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                height: "100%",
                                                gap: "24px",
                                                padding: "22px",
                                                border: "1px solid white",
                                                color: "ActiveBorder",
                                                borderColor: "GrayText"
                                            }}>
                                                {/* Step 1 */}
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                                    <strong style={{ color: "ActiveCaption" }}  >Step 1:</strong>
                                                    <span>Open Keplr. Go to</span>
                                                    <HamburgerIcon />
                                                    <ArrowRight />
                                                    <span>Setting</span>
                                                    <ArrowRight />
                                                    <span>General</span>
                                                    <ArrowRight />
                                                    <span>Add/Remove Non-Native Chains.</span>
                                                    <span>Remove the name of your connected chain.</span>
                                                </div>

                                                {/* Step 2 */}
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", }}>
                                                    <strong style={{ color: "ActiveCaption" }}>Step 2:</strong>
                                                    <span>Click this button to add your chain:</span>
                                                    <PromiseButton
                                                        width="fit-content"
                                                        size="md"
                                                        backgroundColor="gray.900"
                                                        paddingX="12"
                                                        onClick={suggestChain}
                                                    >
                                                        Add Chain to Keplr
                                                    </PromiseButton>
                                                </div>

                                                {/* Step 3 */}
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                                    <strong style={{ color: "ActiveCaption" }}>Step 3:</strong>
                                                    <span>Click on the button to add token to Keplr</span>
                                                    <PromiseButton
                                                        width="fit-content"
                                                        backgroundColor="gray.900"
                                                        size="md"
                                                        paddingX="12"
                                                        onClick={handleAddToKeplr}
                                                    >
                                                        Add Token to Keplr
                                                    </PromiseButton>
                                                </div>
                                            </div>

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme="gray" mr={3} onClick={onClose}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            }
                        </Flex>
                    </Flex>
                </Box >
            }
        </Flex >
    )
}

export default ExchangePage;










