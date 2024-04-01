import { BROWSER_ICONS, BROWSER_LINKS, KEPLR_LINK, SUPPORTED_BROSWERS } from "@/lib/browser/constants";
import { useGetBrowser } from "@/lib/browser/hooks/useGetBrowser";
import { BROWSER_TYPE } from "@/lib/browser/types";
import { KeplrConnectionStatus, connectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { AspectRatio, Button, HStack, Icon, IconButton, Image, Link, Text, VStack } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"

interface Props {
    chainId?: string
}

const KeplrWallet: FC<Props> = (props) => {
    const { chainId } = props
    const { keplrStatus, isLoading } = useAndromedaStore();
    const browser = useGetBrowser();
    const isSupported = SUPPORTED_BROSWERS.includes(browser as any);

    return (

        <HStack spacing={6}
            border='1px'
            borderColor='ActiveBorder'
            rounded='xl'
            px='4'
            py='3'
            alignItems='center'
            w='full'
        >
            <Image src="/keplr.png" h='8' />

            <VStack alignItems='start' spacing={1} flex='1'>
                <Text fontSize='md'>
                    {keplrStatus !== KeplrConnectionStatus.NotInstalled ? (
                        "Keplr"
                    ) : isSupported ? (
                        "Install Keplr"
                    ) : "Install Supported Browser"}
                </Text>
                {!isSupported && (
                    <SupportedBrowserLinks />
                )}
            </VStack>
            {keplrStatus !== KeplrConnectionStatus.NotInstalled ? (
                <Button isLoading={keplrStatus === KeplrConnectionStatus.Connecting || isLoading} onClick={() => connectAndromedaClient(chainId)} size='sm' colorScheme="primary">Connect Wallet</Button>
            ) : isSupported ? (
                <IconButton as='a' target='_blank' href={KEPLR_LINK} aria-label="install-keplr" icon={<Icon as={ChevronRightIcon} boxSize='5' />} size='sm' colorScheme="primary" />
            ) :
                <IconButton as='a' target='_blank' href={BROWSER_LINKS[BROWSER_TYPE.CHROME]} aria-label="install-browser" icon={<Icon as={ChevronRightIcon} boxSize='5' />} size='sm' colorScheme="primary" />
            }
        </HStack>
    )
}

const SupportedBrowserLinks: FC = (props) => {
    const { } = props;
    return (
        <HStack>
            {SUPPORTED_BROSWERS.map(browser => (
                <AspectRatio key={browser} w='4' ratio={1} as='a' href={BROWSER_LINKS[browser]}
                    target="_blank">
                    <Image
                        src={BROWSER_ICONS[browser]}
                    />
                </AspectRatio>
            ))}
        </HStack>
    )
}

export default KeplrWallet