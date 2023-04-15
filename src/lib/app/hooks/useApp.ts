import { createContext, useContext, useEffect, useState } from "react";
import { IConfig } from "../types";
import config from '@/config.json';

export interface AppContext {
  config: IConfig;
  updateConfig: (newConfig:IConfig)=>void;
}

const defaulValue: AppContext = {
  config: config,
  updateConfig: ()=>{ throw new Error("Userd Outside")}
};

export const AppContext = createContext(defaulValue);



const useApp = ()=>useContext(AppContext);
export default useApp;

