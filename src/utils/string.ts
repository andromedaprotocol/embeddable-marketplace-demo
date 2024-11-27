export function shortenString(str: string | undefined, length: number): string {
    if (!str || typeof str !== "string") {
        return ""
    }


    if (str.length <= length) {
        return str
    }

    const suffixLength = Math.floor(length / 3)
    const prefixLength = length - suffixLength

    return `${str.slice(0, prefixLength)}...${str.slice(-suffixLength)}`
}
