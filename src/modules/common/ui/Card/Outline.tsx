import { Box } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC, ReactNode } from "react"
import FallbackImage from "../Image/FallbackImage";

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
                <FallbackImage src={img} alt="Image" borderRadius="lg" cursor='pointer' _hover={{
                    scale: "105%"
                }} transform='auto' transition='ease-in' transitionProperty='all' transitionDuration='150ms' />
            </Link>
            <Box justifyContent="space-between" mt="3">
                {children}
            </Box>
        </Box>
    )
}

export default CardOutline