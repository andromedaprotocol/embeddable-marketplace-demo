import { createContext, useContext} from "react";
import { IConfig } from "../types";
import { CONFIG } from "@/config";

export interface AppContext {
  config: IConfig;
  updateConfig: (newConfig:IConfig)=>void;
}

const defaulValue: AppContext = {
  config: CONFIG,
  updateConfig: ()=>{ throw new Error("Userd Outside")}
};

export const AppContext = createContext(defaulValue);



const useApp = ()=>useContext(AppContext);
export default useApp;

