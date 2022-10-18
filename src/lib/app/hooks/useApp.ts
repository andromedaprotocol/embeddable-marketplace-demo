import { createContext, useContext } from "react";
import { IConfig } from "../types";
import config from '@/config.json'

export interface AppContext {
  config: IConfig
}

const defaulValue: AppContext = {
  config: config
};

export const AppContext = createContext(defaulValue);

export default function useApp() {
  return useContext(AppContext);
}
