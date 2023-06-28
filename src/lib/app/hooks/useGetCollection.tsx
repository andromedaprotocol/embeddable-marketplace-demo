import { useMemo } from "react"
import { useAppUtils } from "./useAppUtils"
import { IBaseCollection, ICollection } from "../types"

export const useGetCollection = <T extends IBaseCollection = ICollection>(id: string) => {
    const { getCollection } = useAppUtils()
    return useMemo(() => getCollection(id) as unknown as T, [id, getCollection])
}