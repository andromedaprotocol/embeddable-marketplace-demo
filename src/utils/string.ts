export function shortenString(str: string | undefined, length: number): string {
    if (!str || typeof str !== "string") {
        return ""
    }
    return str.length > length ?
        str.slice(0, length) + "..." + str.slice(-Math.floor(length / 2))
        :
        str
}