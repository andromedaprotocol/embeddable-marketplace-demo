import { Flex, Text, Button } from "@chakra-ui/react";
import React, { FC } from "react"

interface ExchangeIntroProps {
}

const ExchangeIntro: FC<ExchangeIntroProps> = (props) => {
    return (
        <Flex direction="row" justify={"space-between"} my={"auto"}>
            <Flex direction="column" width={663}>
                <Text fontWeight="bold" fontSize="6xl" mt="2" lineHeight={"shorter"}>
                    Buy and sell CW20 tokens on Andromeda Chain
                </Text>
                <Text fontWeight="light" fontSize="md" mt="2" mb="2">
                    Lorem ipsum dolor sit amet consectetur. Et condimentum aenean tristique cursus vitae. Sit nec convallis massa senectus tincidunt dis blandit massa.
                </Text>
                <Button width={"fit-content"} backgroundColor={"gray.900"} paddingX={12}>Learn more</Button>
            </Flex>
        </Flex>
    )
}

export default ExchangeIntro