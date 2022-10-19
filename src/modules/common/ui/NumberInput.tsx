import {
  Button,
  Flex,
  Input,
  useNumberInput,
  UseNumberInputProps,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface NumberInputProps extends UseNumberInputProps {}
const NumberInput: FC<NumberInputProps> = (props) => {
  const { ...hookProps } = props;
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput(hookProps);

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Flex direction="row" gap="2">
      <Button {...inc}>+</Button>
      <Input {...input} />
      <Button {...dec}>-</Button>
    </Flex>
  );
};
export default NumberInput;
