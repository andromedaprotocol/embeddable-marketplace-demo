import { Button, ButtonProps } from "@chakra-ui/react";
import React, { FC, ReactNode, useCallback, useState } from "react"

interface Props extends ButtonProps {
}

const PromiseButton = React.forwardRef<any, Props>(function PromiseButton(props, ref) {
    const { children, onClick, isLoading, ...buttonProps } = props;
    const [loading, setLoading] = useState(false);

    const promiseOnClick: typeof onClick = useCallback(async (e) => {
        if (loading) return;
        try {
            setLoading(true);
            await onClick?.(e)
        } finally {
            setLoading(false);
        }
    }, [onClick])
    return (
        <Button
            onClick={promiseOnClick}
            isLoading={loading || isLoading}
            ref={ref}
            {...buttonProps}>
            {children}
        </Button>
    )
})

export default PromiseButton