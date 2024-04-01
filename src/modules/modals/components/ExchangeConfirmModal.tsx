import {
    Box,
    Button,
    Heading,
    Text,
  } from "@chakra-ui/react";
  import { coins } from "@cosmjs/proto-signing";
  import { FC } from "react";
  import { useExecuteModal } from "../hooks";
  import { ExchangeConfirmModalProps } from "../types";
  import useExchangeConstruct from "@/lib/andrjs/hooks/useExchangeConstruct";
import { useAndromedaStore } from "@/zustand/andromeda";
    
  const ExchangeConfirmModal: FC<ExchangeConfirmModalProps> = (props) => {
    const { exchangeAddress, exchangeRate, nativeAmount, nativeDenom, cw20Symbol } = props;
  
    const construct = useExchangeConstruct();
  
    const openExecute = useExecuteModal(exchangeAddress);
  
    const { accounts, chainId } = useAndromedaStore();
    const account = accounts[0];

    const onSubmit = () => {
      if (!account?.address) return;
      const msg = construct({ recipient: account?.address });
      const funds = coins(nativeAmount, nativeDenom);
      console.log("msg, funds", msg, funds)
      console.log("exchangeAddress: ", exchangeAddress)
      
      openExecute(msg, true, funds);
    };
  
    return (
      <Box>
        <Heading size="md" mb="6" fontWeight="bold">
          Are you sure?
        </Heading>
        <Box>
          <Text>Are you sure to spend {nativeAmount} {nativeDenom} for purchasing {nativeAmount / exchangeRate} {cw20Symbol} ? </Text>
          <Button onClick={onSubmit} w="full" mt="6" variant="solid">
              Confirm
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default ExchangeConfirmModal;
    
    
    