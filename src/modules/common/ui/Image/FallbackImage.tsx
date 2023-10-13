import { Image, ImageProps } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"

interface Props extends ImageProps {
}

const FallbackImage: FC<Props> = (props) => {
    return (
        <Image fallbackSrc="/fallback.svg" alt="Image" {...props} />
    )
}

export default FallbackImage