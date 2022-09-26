export const truncate = (text = "", [h, t]: number[] = [8, 5]) => {
    const head = text.slice(0, h);
    const tail = text.slice(-1 * t, text.length);
    return text.length > h + t ? [head, tail].join("...") : text;
};
