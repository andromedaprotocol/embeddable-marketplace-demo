import { Text, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useGlobalModalContext } from "../../hooks";
import KeplrWallet from "./Keplr";
import { useAndromedaStore } from "@/zustand/andromeda";
import { useParams } from "next/navigation";

const WalletModal: FC = () => {
    const { close } = useGlobalModalContext();
    const connected = useAndromedaStore(state => state.isConnected);
    const { chain } = useParams()

    useEffect(() => {
        if (connected) close();
    }, [connected, close]);

    return (
        <VStack alignItems="stretch">
            <Text fontSize='xl' fontWeight='medium'>Connect Wallet</Text>
            <KeplrWallet chainId={chain?.toString()} />
        </VStack>
    );
};

export default WalletModal;
