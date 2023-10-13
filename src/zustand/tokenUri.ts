"use client";
import axios from "axios";
import { create } from "zustand";

export interface ITokenUri {
    name: string;
    description: string;
    image: string;
    attributes: Array<ITokenAttributes>
    [index: string]: any;
}
export interface ITokenAttributes {
    trait_type: string;
    value: string;
}

export interface ITokenUriStore {
    [key: string]: ITokenUri | undefined;
}

export const useTokenUriStore = create<ITokenUriStore>((set, get) => ({
}))

export const resetTokenUriStore = () => {
    useTokenUriStore.setState({})
}

export const addTokenUriCache = async (uri: string) => {
    const data = await axios.get(uri).then(res => {
        return res.data as ITokenUri
    })
    useTokenUriStore.setState((prev) => ({
        ...prev,
        [uri]: data
    }))
}