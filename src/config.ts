import { IConfig } from "./lib/app";
import config from "../config.json";

const CONFIG = {
    ...config,
    createdDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString(),
    id: "andromeda"
} as IConfig;

export default CONFIG;

