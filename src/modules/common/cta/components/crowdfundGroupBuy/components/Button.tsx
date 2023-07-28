import { sumCoins } from "@/lib/andrjs/utils/funds";
import { useGetCrowdfund } from "@/lib/graphql/hooks/crowdfund";
import useCrowdfundGroupBuyModal from "@/modules/modals/hooks/useCrowdfundGroupBuyModal";
import { Button, ButtonProps } from "@chakra-ui/react";
import { coins } from "@cosmjs/proto-signing";
import React, { FC, useMemo } from "react";

interface IButtonProps extends ButtonProps {
  crowdfundAddress: string;
}

const CrowdfundGroupBuyButton: FC<IButtonProps> = (props) => {
  const { crowdfundAddress, children, ...buttonProps } = props;

  const open = useCrowdfundGroupBuyModal({ crowdfundAddress });

  return (
    <Button onClick={open} w="full" variant="solid" {...buttonProps}>
      Buy Now
    </Button>
  );
};
export default CrowdfundGroupBuyButton;
