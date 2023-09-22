import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useGlobalModalContext } from "../hooks";
import { KeplrConnectionStatus, connectAndromedaClient, useAndromedaStore } from "@/zustand/andromeda";

const WalletModal: FC = () => {
  const { close } = useGlobalModalContext();
  const { keplrStatus, isConnected } = useAndromedaStore();

  useEffect(() => {
    if (isConnected) close();
  }, [isConnected, close]);

  return (
    <>
      <Heading size="md" mb="6">
        Select Wallet
      </Heading>
      <Box>
        <Button
          variant="outline"
          // leftIcon={<chakra.img src={icon} alt={name} boxSize={6} />} //TODO: Fix Icon
          mb={4}
          py={8}
          onClick={() => connectAndromedaClient()}
          gap="2"
          disabled={keplrStatus !== KeplrConnectionStatus.Ok}
          w='full'
        >
          {keplrStatus === KeplrConnectionStatus.NotInstalled ? (
            "Install Keplr to Connect"
          ) : (
            <>
              <Image src={`/keplr.png`} h="8" />
              <Text fontSize="md">Keplr</Text>
            </>
          )}
        </Button>
      </Box>
    </>
  );
};

export default WalletModal;
