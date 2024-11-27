import { useBuyNowConstruct } from "@/lib/andrjs";
import useApp from "@/lib/app/hooks/useApp";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  Heading,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Coin, coin } from "@cosmjs/proto-signing";
import { FC } from "react";
import { useExecuteModal } from "../hooks";
import { BuyNowModalProps } from "../types";
import { useGetTokenMarketplaceInfo } from "@/lib/graphql/hooks/marketplace";
import { useGetCw721Token } from "@/lib/graphql/hooks/cw721";
import { useGetRate } from "@/lib/andrjs/hooks/ado/useGetRate";
import { addCoins } from "@cosmjs/amino";


const BuyNowModal: FC<BuyNowModalProps> = (props) => {
  const { contractAddress, tokenId, marketplaceAddress } = props;
  const { data: token } = useGetCw721Token(contractAddress, tokenId);
  const { data: marketplaceState } = useGetTokenMarketplaceInfo(
    marketplaceAddress,
    contractAddress,
    tokenId
  );

  const { data: rate } = useGetRate(marketplaceAddress, "Buy")
  const rateValue = rate?.local.value;
  const rateType = rate?.local.rate_type
  const flatRate = (rateValue && "flat" in rateValue) ? rateValue.flat : undefined;
  const flatRateDenom = flatRate?.denom;
  const percentRate = (rateValue && "percent" in rateValue) ? rateValue.percent : undefined
  const marketplaceAmount = marketplaceState?.latestSaleState.price
  const floatMarketplaceAmount = parseFloat(marketplaceAmount ?? "0")
  const commaSeparatedAmount = Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(floatMarketplaceAmount)

  const calcAmount = (): Coin | undefined => {
    if (flatRate && flatRateDenom) {
      return {
        amount: flatRate.amount,
        denom: flatRateDenom
      }
    } else if (percentRate) {
      const percentAmount = parseFloat(percentRate.percent) * floatMarketplaceAmount
      return {
        amount: percentAmount.toFixed(0),
        denom: marketplaceState!.latestSaleState.coin_denom
      }
    }
  }

  const { config } = useApp();
  const DENOM = marketplaceState?.latestSaleState.coin_denom ?? config?.coinDenom ?? "ujunox";
  const rateCoin = calcAmount();
  const rateCoinAmount = parseFloat(rateCoin?.amount ?? "0")
  const commaSeparatedRateCoinAmount = Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(rateCoinAmount)
  const marketplaceCoin = coin(marketplaceAmount ?? "0", DENOM);

  const totalAmount = (rateCoin && rateType === "additive") ? sumCoins([rateCoin, marketplaceCoin]) : [marketplaceCoin];
  console.log(totalAmount)


  const construct = useBuyNowConstruct();


  // Execute place bid directly on auction
  const openExecute = useExecuteModal(marketplaceAddress);

  const onSubmit = () => {
    const msg = construct({ tokenAddress: contractAddress, tokenId: tokenId });

    console.log(JSON.stringify(msg));
    console.log("DENOM:", DENOM);

    openExecute(msg, true, totalAmount);
  };

  return (
    <Box>
      <Heading size="md" mb="6" fontWeight="bold">
        Purchase
      </Heading>
      <Text textStyle="light" mb="4">
        You are about to buy <b>{token?.metadata?.name}</b> which has tokenId <b>{tokenId}</b>.
      </Text>
      <Box>
        <FormControl>
          <Grid templateColumns="repeat(2, 1fr)" padding={1} backgroundColor={"blackAlpha.100"}>
            {rateType === "additive" ? (
              <>
                <Box w="100%" h="8" padding={1} textAlign={"start"} fontSize={"3-xl"} marginBottom={1} borderBottom={"1px"} borderBottomColor={"blackAlpha.300"}>
                  <Text textStyle="light">
                    <b>Price :</b>
                  </Text>
                </Box>
                <Box w="100%" h="8" padding={1} textAlign={"end"} marginBottom={2} borderBottom={"1px"} borderBottomColor={"blackAlpha.300"}>
                  <Text textStyle="light">
                    {commaSeparatedAmount.toString()} {DENOM}
                  </Text>
                </Box>
              </>
            )
              : (
                <>
                  <Box w="100%" h="8" padding={1} textAlign={"start"} fontSize={"3-xl"} marginBottom={1} >
                    <Text textStyle="light">
                      <b>Price :</b>
                    </Text>
                  </Box>
                  <Box w="100%" h="8" padding={1} textAlign={"end"} marginBottom={1}  >
                    <Text textStyle="light">
                      {commaSeparatedAmount.toString()} {DENOM}
                    </Text>
                  </Box>
                </>
              )
            }

            {(rateCoin && rateType === "additive") && (
              <>
                <Box w="100%" h="7" padding={1} textAlign={"start"} fontSize={"3-xl"} marginBottom={1} borderBottom={"1px"} borderBottomColor={"blackAlpha.300"}>
                  <Text textStyle="light">
                    <b>Added Expense : </b>
                  </Text>
                </Box>
                <Box w="100%" h="7" padding={1} textAlign={"end"} marginBottom={1} borderBottom={"1px"} borderBottomColor={"blackAlpha.300"}>
                  <Text textStyle="light">
                    {rateType === "additive" ? "+" : ""} {commaSeparatedRateCoinAmount} {rateCoin?.denom}
                  </Text>
                </Box>

              </>
            )}
          </Grid>
          {rateType === "additive" && (
            <Grid templateColumns="repeat(2, 1fr)" padding={1} backgroundColor={"blackAlpha.100"} >
              <Box w="100%" h="10" padding={1} textAlign={"start"} fontSize={"3-xl"} >
                <Text textStyle="light">
                  <b>Total Price :</b>
                </Text>
              </Box>
              <Box w="100%" h="7" padding={1} textAlign={"end"} marginBottom={1} >
                {totalAmount?.map(item => {
                  return (
                    <Text key={item.denom} textStyle="light">
                      {
                        Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(parseFloat(item.amount))} {item.denom}
                    </Text>
                  )
                })}
              </Box>
            </Grid>
          )}

          <Button onClick={onSubmit} w="full" mt="6" variant="solid">
            Buy Now
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default BuyNowModal;



export const sumCoins = (coins: Coin[]) => {
  if (coins.length === 0) return undefined;
  const mapped_coins: Record<string, Coin> = {};
  coins.forEach(coin => {
    if (!mapped_coins[coin.denom]) {
      mapped_coins[coin.denom] = coin;
    } else {
      mapped_coins[coin.denom] = addCoins(mapped_coins[coin.denom], coin);
    }
  })
  return Object.values(mapped_coins);
};