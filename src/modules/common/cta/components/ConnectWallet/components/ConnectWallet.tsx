import { useWallet } from "@/lib/wallet/hooks";
import { useWalletModal } from "@/modules/modals/hooks";
import { PlusIcon } from "@/theme/icons";
import { Button } from "@chakra-ui/react";
import React, { FC } from "react";
import Connected from "./Connected";

interface ConnectWalletProps {}
const ConnectWallet: FC<ConnectWalletProps> = (props) => {
  const {} = props;
  const { account } = useWallet();
  const open = useWalletModal();
  if (account) {
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
