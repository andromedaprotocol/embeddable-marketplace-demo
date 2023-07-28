import { useGetTokenMarketplaceInfo } from "@/lib/graphql/hooks/marketplace";
import useBuyNowModal from "@/modules/modals/hooks/useBuyNowModal";
import usePlaceBidModal from "@/modules/modals/hooks/usePlaceBidModal";
import { Button, ButtonProps, HStack } from "@chakra-ui/react";
import React, { FC } from "react";

interface IButtonProps extends ButtonProps {
  marketplaceAddress: string;
  contractAddress: string;
  tokenId: string;
}

const BuyNowButton: FC<IButtonProps> = (props) => {
  const { marketplaceAddress, contractAddress, tokenId, children, ...buttonProps } = props;
  const { data: marketplaceState } = useGetTokenMarketplaceInfo(
    marketplaceAddress,
    contractAddress,
    tokenId
  )
  const open = useBuyNowModal({ marketplaceAddress, contractAddress, tokenId });

  return (
    <Button onClick={open} w="full" variant="solid" {...buttonProps}>
      Buy for {marketplaceState?.latestSaleState.price} {marketplaceState?.latestSaleState.coin_denom}
    </Button>
  );
};
export default BuyNowButton;
