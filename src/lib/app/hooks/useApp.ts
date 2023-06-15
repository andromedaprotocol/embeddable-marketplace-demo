import { createContext, useContext } from "react";
import { IConfig } from "../types";

export interface AppContext {
  config: IConfig;
}

const defaulValue: AppContext = {
  config: {} as any,
};

export const AppContext = createContext(defaulValue);



const useApp = () => useContext(AppContext);
export default useApp;

