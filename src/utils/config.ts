import JSONCrush from "jsoncrush";

export const parseEmbeddableUrl = (uri: string) => {
    const uriDecoded = decodeURIComponent(uri);
    const decompressed = JSONCrush.uncrush(uriDecoded);
    const parsed = JSON.parse(decompressed);
    return parsed
}