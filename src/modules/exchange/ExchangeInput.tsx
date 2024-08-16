import { InputGroup, Input, InputRightElement, Box, Image } from "@chakra-ui/react";
import React, { ChangeEvent, FC } from "react";

interface ExchangeInputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: number;
    icon: string;
    symbol: string;
}

const ExchangeInput: FC<ExchangeInputProps> = (props) => {
    const { onChange, value, icon, symbol } = props;
    return (
        <InputGroup size='lg' data-testid="exchange-input">
            <Input
                placeholder='Input Amount'
                borderColor={"purple.400"}
                focusBorderColor="purple.500"
                borderWidth={2}
                value={value.toString()}
                onChange={onChange}
                type="number"
                data-testid="input-amount"
            />
            <InputRightElement data-testid="input-icon">
                <Box>
                    <Image src={icon} alt={symbol} w="8" />
                </Box>
            </InputRightElement>
        </InputGroup>
    );
}

export default ExchangeInput;
