import {
    Box,
    Button,
    Input,
    Heading,
    Text,
  } from "@chakra-ui/react";
  import { coins } from "@cosmjs/proto-signing";
  import { ChangeEvent, FC, useState } from "react";
  import { useExecuteModal } from "../hooks";
  import { ExchangeConfirmModalProps } from "../types";
  import useExchangeConstruct from "@/lib/andrjs/hooks/useExchangeConstruct";
    
  const ExchangeConfirmModal: FC<ExchangeConfirmModalProps> = (props) => {
    const { exchangeAddress, exchangeRate, nativeAmount, nativeDenom, cw20Symbol } = props;
  
    const construct = useExchangeConstruct();
    const [recipientAddress, setRecipientAddress] = useState("");
  
    const openExecute = useExecuteModal(exchangeAddress);
  
    const onSubmit = () => {
      if (!recipientAddress) return;
      const msg = construct({ recipient: recipientAddress });
      const funds = coins(nativeAmount, nativeDenom);
      openExecute(msg, true, funds);
    };
  
    const handleRecipientAddress = (e: ChangeEvent<HTMLInputElement>) => {
      setRecipientAddress(e.currentTarget.value)
    }
    return (
      <Box>
        <Heading size="md" mb="6" fontWeight="bold">
          Are you sure?
        </Heading>
        <Box>
          <Text>Are you sure to spend {nativeAmount} {nativeDenom} for purchasing {nativeAmount / exchangeRate} {cw20Symbol} ? </Text>
          <Input
            placeholder="Recipient Address"
            value={recipientAddress}
            onChange={handleRecipientAddress}
            mt={4}
          />
          <Button onClick={onSubmit} w="full" mt="6" variant="solid">
              Confirm
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default ExchangeConfirmModal;
    
    
    