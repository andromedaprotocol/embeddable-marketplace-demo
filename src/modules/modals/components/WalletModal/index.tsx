import { Text, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useGlobalModalContext } from "../../hooks";
import KeplrWallet from "./Keplr";
import { useParams } from "next/navigation";
import useAndromedaClient from "@/lib/andrjs/hooks/useAndromedaClient";

const WalletModal: FC = () => {
    const { close } = useGlobalModalContext();
    const client = useAndromedaClient();
    const { chain } = useParams()

    useEffect(() => {
        if (client) close();
    }, [client, close]);

    return (
        <VStack alignItems="stretch">
            <Text fontSize='xl' fontWeight='medium'>Connect Wallet</Text>
            <KeplrWallet chainId={chain?.toString()} />
        </VStack>
    );
};

export default WalletModal;
