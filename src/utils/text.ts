export const truncate = (text = "", [h, t]: number[] = [8, 5]) => {
    text = text || ""
    const head = text.slice(0, h);
    const tail = text.slice(-1 * t, text.length);
    return text.length > h + t ? [head, tail].join("...") : text;
};

export function truncateAddress(inputString: string) {
    const shortAddress = `${inputString.substring(0, 8)}...${inputString.slice(-4)}`;
    return shortAddress;
}