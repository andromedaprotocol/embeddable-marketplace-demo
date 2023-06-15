import { Skeleton, Stack } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"

interface Props {
    children?: ReactNode;
    loading?: boolean;
}

const Loading: FC<Props> = (props) => {
    const { children, loading = false } = props;
    if (loading) {
        return (
            <Stack mt='6' gap='4'>
                <Skeleton h="14" rounded="xl" />
                <Skeleton h="14" rounded="xl" />
                <Skeleton h="14" rounded="xl" />
            </Stack>
        )
    }
    return (
        <>
            {children}
        </>
    )
}

export default Loading