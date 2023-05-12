import useBuyNowModal from "@/modules/modals/hooks/useBuyNowModal";
import usePlaceBidModal from "@/modules/modals/hooks/usePlaceBidModal";
import { Button, ButtonProps } from "@chakra-ui/react";
import React, { FC } from "react";

interface IButtonProps extends ButtonProps {
  marketplaceAddress: string;
  contractAddress: string;
  tokenId: string;
}

const BuyNowButton: FC<IButtonProps> = (props) => {
  const { marketplaceAddress, contractAddress, tokenId, children, ...buttonProps } = props;

  const open = useBuyNowModal({ contractAddress, marketplaceAddress, tokenId });

  return (
    <Button onClick={open} w="full" variant="solid" {...buttonProps}>
      Buy Now
    </Button>
  );
};
export default BuyNowButton;
