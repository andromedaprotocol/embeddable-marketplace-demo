"use client"
import { IConfig } from "@/lib/app/types";
import { updateConfig } from "@/zustand/app";
import React, { FC, ReactNode, useEffect, useLayoutEffect, useState } from "react"

interface Props {
    children?: ReactNode;
    config: IConfig;
}

const Providers: FC<Props> = (props) => {
    const { children, config } = props;
    updateConfig(config);
    return (
        <>
            {children}
        </>
    )
}

export default Providers