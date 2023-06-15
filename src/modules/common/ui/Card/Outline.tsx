import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC, ReactNode } from "react"

interface Props {
    children?: ReactNode;
    img?: string;
    link: string;
}

const CardOutline: FC<Props> = (props) => {
    const { children, link, img } = props;
    return (
        <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="lg">
            <Link href={link}>
                <Image src={img} alt="Image" borderRadius="lg" />
            </Link>
            <Box justifyContent="space-between" mt="3">
                {children}
            </Box>
        </Box>
    )
}

export default CardOutline