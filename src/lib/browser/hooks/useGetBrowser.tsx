import { useEffect, useMemo, useState } from "react"
import { BROWSER_TYPE } from "../types"
import { getBrowserName } from "../utils/name"

export const useGetBrowser = () => {
    const [clientData, setClientData] = useState(BROWSER_TYPE.UNKNOWN)

    const hasWindow = typeof window !== 'undefined'

    useEffect(() => {
        if (hasWindow) {
            setClientData(getBrowserName())
        }
    }, [hasWindow])

    return clientData
}