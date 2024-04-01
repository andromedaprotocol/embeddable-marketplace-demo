"use client";

import { Box, Skeleton, VStack } from "@chakra-ui/react";
import React, { FC } from "react"

interface Props {
}

const Page: FC<Props> = (props) => {
    const { } = props;
    return (
        <Box p='10'>
            <VStack>
                <Skeleton h='40' w='full' rounded='2xl' />
                <Skeleton h='40' w='full' rounded='2xl' />
            </VStack>
        </Box>
    )
}

export default Page