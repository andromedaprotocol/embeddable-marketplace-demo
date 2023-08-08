import { Box, HStack, Image, Link, Text } from "@chakra-ui/react";
import React, { FC } from "react"

interface Props {
}

const PoweredByLogo: FC<Props> = (props) => {
    const { } = props;
    return (
        <Link href='https://www.andromedaprotocol.io/' target="_blank">
            <HStack
                position='fixed'
                left='2'
                bottom='2'
                bg='#101216' maxW='fit-content' pl='1.5' pr='3' py='1' rounded='lg' spacing={1}>
                <Image
                    src='/logo.png'
                    h='6'
                />
                <Text fontSize='sm' color='white'>
                    Powered by Andromeda
                </Text>
            </HStack>
        </Link>
    )
}

export default PoweredByLogo