import { FC, memo, useEffect, useMemo, useState } from "react";
import { Coin, StdFee } from "@cosmjs/stargate";

import { useGlobalModalContext } from "../hooks";
import { TransactionModalProps } from "../types";

import { Box, Button, Center, Divider, Text } from "@/theme/ui-elements";
import ModalLoading from "./ModalLoading";
import { sumCoins } from "@/lib/andrjs/utils/funds";
import { GasIcon } from "@/modules/common/icons";
import useAndromedaClient from "@/lib/andrjs/hooks/useAndromedaClient";
// import { useCurrentChainConfig } from "@/lib/andrjs/hooks/useKeplrChainConfig";
// import { CoinPretty } from "@keplr-wallet/unit";

interface OptionalProps {
  onNextStage?: () => void;
  onPrevStage?: () => void;
  updateFee: (fee: StdFee) => void;
}

const FeeAmount: FC<{ coin: Coin; text: string }> = memo(function FeeAmount({
  coin,
  text,
}) {
  // const chainConfig = useCurrentChainConfig()
  const formattedCoin = useMemo(() => {
    /** Commenting out denom conversion as some conversions, like injective, are not working properly.
     * Will have to look more into keplrs internal hooks to see how they handle denoms.
     * @see: https://github.com/chainapsis/keplr-wallet/blob/master/packages/hooks/src/tx/fee.ts
     */
    return coin
    // const currency = chainConfig?.currencies.find(c => c.coinMinimalDenom === coin.denom);
    // if (!currency) return { ...coin };
    // const keplrCoin = new CoinPretty({
    //   ...currency
    // }, coin.amount)
    // return {
    //   amount: keplrCoin.hideDenom(true).toString(),
    //   denom: keplrCoin.denom
    // }
  }, [coin])
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          position: "relative",
        }}
      >
        <Box>{text}</Box>
        <Box>
          {formattedCoin?.amount}{" "}
          <b>{formattedCoin?.denom} </b>
        </Box>
      </Box>
    </>
  );
});

// Displays EstimateFee Modal (with a condition of (props.simulate && props.onNextStep))
// Repair note from fix/transaction-modal-processing: A bang operator (!) was appended to the props.simulate declaration causing inverse evaluations of the intended conditions
const EstimateFeeModal: FC<TransactionModalProps & OptionalProps> = (props) => {
  const client = useAndromedaClient();
  const { close, setError } = useGlobalModalContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [fee, setFee] = useState<StdFee>({ amount: [], gas: "0" });

  const totalFunds = useMemo(() => {
    const sum = sumCoins([...fee.amount, ...props.funds]);
    return sum;
  }, [fee, props]);

  useEffect(() => {
    const simulateFee = async () => {
      setLoading(true);
      const getFee = () => {
        console.log(client);
        return client!.estimateExecuteFee(
          props.contractAddress,
          props.msg,
          props.funds,
        );
      }

      try {
        const estimatedFee = await getFee();
        console.log(estimatedFee);
        setFee(estimatedFee);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
      }
    };

    const tId = setTimeout(() => {
      simulateFee();
    }, 500);

    return () => clearTimeout(tId);
  }, [client, props, setError]);

  return (
    <Box
      sx={{
        padding: "6px",
      }}
    >
      {loading ? (
        <ModalLoading title="Simulating">
          <Text
            mt="10px"
            sx={{
              fontWeight: "400",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            We&apos;re simulating your transaction to check for any errors.
            We&apos;ll get back to you with an estimated cost shortly!
          </Text>
        </ModalLoading>
      ) : (
        <Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "50px auto",
              gridGap: "16px",
            }}
          >
            <Center sx={{ alignItems: "flex-start" }}>
              <GasIcon
                height="48px"
                width="48px"
                color="primary.400"
                bgColor="dark.300"
                padding="12px"
                rounded="full"
              />
            </Center>
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                Estimated Fees
              </Text>
              <Text mt="2" fontSize="sm" color="dark.500">
                This is an estimated breakdown of the costs of running your
                transaction.
              </Text>
            </Box>
          </Box>
          <Box
            mt="20px"
            borderRadius='lg'
            borderColor='dark.300'
            borderWidth='1px'
            p='4'
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Box>Gas Used</Box>
              <Box>{fee.gas}</Box>
            </Box>
            <Divider color='dark.300' />
            {fee.amount.map((coin, index) => (
              <FeeAmount
                key={`feeamount-${index}`}
                coin={coin}
                text="Cost Estimate"
              />
            ))}
            {props.funds.map((coin, index) => (
              <FeeAmount
                key={`feeamount-${index}`}
                coin={coin}
                text="Funds"
              />
            ))}
            {totalFunds && <FeeAmount coin={totalFunds} text="Total Funds" />}
          </Box>

          <Box
            mt="40px"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              variant="outline"
              sx={{ fontSize: "16px", padding: "10px 32px" }}
              onClick={close}
            >
              Cancel
            </Button>
            {props.onNextStage && (
              <Button
                variant="solid"
                bg="#7F56D9"
                sx={{
                  marginLeft: "10px",
                  "&:hover": { bg: "#7F56D9" },
                  fontSize: "16px",
                  padding: "10px 32px",
                }}
                onClick={() => {
                  props.updateFee(fee);
                  props.onNextStage?.();
                }}
              >
                Broadcast
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EstimateFeeModal;
