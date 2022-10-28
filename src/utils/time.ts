import dayjs, { Dayjs } from "dayjs"
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const getTime = (timeObj: Record<string, any>) => {
    let ms = timeObj.at_time ?? '' as string;
    // Only first 13 characters are there for milliseconds. Sanitazation is needed because in some cases trailing zeroes are added
    ms = ms.substring(0, 13);
    return dayjs(parseInt(ms));
}

export const formatTime = (t: Dayjs) => {
    return t.format("MMMM D, YYYY h:mm A")
}