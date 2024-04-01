import JSONCrush from "jsoncrush";

export const parseEmbeddableUrl = (uri: string) => {
    console.log(uri)
    const uriDecoded = decodeURIComponent(uri);
    const decompressed = JSONCrush.uncrush(uriDecoded);
    console.log(decompressed, "Decompressed");
    const parsed = JSON.parse(decompressed);
    return parsed
}