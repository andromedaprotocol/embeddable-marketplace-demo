import { Box, Text } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"

interface Props {
    title: string;
    body: string;
}

const CardStats: FC<Props> = (props) => {
    const { title, body } = props;
    return (
        <Box>
            <Text fontSize="xs" textStyle="light">
                {title}
            </Text>
            <Text fontWeight="medium" fontSize="xs">
                {body}
            </Text>
        </Box>
    )
}

export default CardStats