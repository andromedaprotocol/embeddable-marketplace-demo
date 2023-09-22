import { useWalletModal } from "@/modules/modals/hooks";
import { PlusIcon } from "@/theme/icons";
import { Button } from "@chakra-ui/react";
import React, { FC } from "react";
import Connected from "./Connected";
import useAndromedaClient from "@/lib/andrjs/hooks/useAndromedaClient";
import { useAndromedaStore } from "@/zustand/andromeda";

interface ConnectWalletProps { }
const ConnectWallet: FC<ConnectWalletProps> = (props) => {
  const { } = props;
  const { isConnected } = useAndromedaStore();
  const open = useWalletModal();
  if (isConnected) {
    return <Connected />;
  }
  return (
    <Button
      leftIcon={<PlusIcon width={4} />}
      colorScheme="purple"
      onClick={open}
      size="lg"
    >
      Connect Wallet
    </Button>
  );
};
export default ConnectWallet;
