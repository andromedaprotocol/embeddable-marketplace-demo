import React, { ReactNode } from "react"
import Providers from "./providers";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: {
        default: "Andromeda Embeddable",
        template: "%s | Embeddable"
    },
}

interface Props {
    children?: ReactNode;
    params: {
        chain: string;
    }
}

const RootLayout = async (props: Props) => {
    const { children, params: { chain } } = props;
    return (
        <Providers chainId={chain}>
            {children}
        </Providers>
    )
}

export default RootLayout