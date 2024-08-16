import { useWalletModal } from "@/modules/modals/hooks";
import { PlusIcon } from "@/theme/icons";
import { Button, Icon } from "@chakra-ui/react";
import React, { FC } from "react";
import Connected from "./Connected";
import useAndromedaClient from "@/lib/andrjs/hooks/useAndromedaClient";
import { useAndromedaStore } from "@/zustand/andromeda";
import { Plus } from "lucide-react";

interface ConnectWalletProps {}

const ConnectWallet: FC<ConnectWalletProps> = (props) => {
  const {} = props;
  const { isLoading } = useAndromedaStore();
  const client = useAndromedaClient();
  const open = useWalletModal();

  if (client) {
    return <Connected data-testid="connected-wallet" />;
  }

  return (
    <Button
      leftIcon={<Icon as={Plus} boxSize={5} />}
      colorScheme="purple"
      onClick={open}
      isLoading={isLoading}
      data-testid="connect-wallet-button"
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
