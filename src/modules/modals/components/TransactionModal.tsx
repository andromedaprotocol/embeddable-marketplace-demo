import { ProgressBar } from "@/modules/common/ui";
import { Box } from "@chakra-ui/react";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useGlobalModalContext } from "../hooks";
import usePlaceBidModal from "../hooks/usePlaceBidModal";
import { TransactionModalProps } from "../types";
import BroadcastingModal from "./BroadcastingModal";
import EstimateFeeModal from "./EstimateFeeModal";

const MAX_STAGE = 3;

const TransactionModal: React.FC<TransactionModalProps> = memo(
  function MessageModal(defaultProps) {
    const [stage, setStage] = useState(0);
    // This is used if we want to change funds from here.
    const [props, setProps] = useState(defaultProps);
    const { close } = useGlobalModalContext();

    useEffect(() => {
      setProps(defaultProps);
    }, [defaultProps]);

    const StageComponent = useMemo(() => {
      switch (stage) {
        case 0:
          return (
            <EstimateFeeModal
              {...props}
              updateFee={(newFee) =>
                setProps((prev) => ({
                  ...prev,
                  fee: newFee,
                }))
              }
              onNextStage={() => setStage(1)}
              onPrevStage={close}
            />
          );
        case 1:
          return <BroadcastingModal {...props} />;
        default:
          return <></>;
      }
    }, [stage, props]);
    return (
      <Box py="30px">
        {StageComponent}
        {!props.simulate && (
          <ProgressBar stages={MAX_STAGE} currentStage={stage} mt="60px" />
        )}
      </Box>
    );
  }
);

export default TransactionModal;
