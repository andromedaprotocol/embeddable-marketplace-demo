import { createContext, useContext, useEffect, useState } from "react";
import { IConfig } from "../types";
import config from '@/config.json'

export interface AppContext {
  config: IConfig;
}

const defaulValue: AppContext = {
  config: config
};

export const AppContext = createContext(defaulValue);



export default function useApp() {
  const [configState, setConfigState] = useState(config);

  useEffect(() => {
   // console.log(configState);
  }, [configState]);

  const updateConfigState = (newConfig: IConfig) => {
    setConfigState(newConfig);
   console.log('here!');
    //console.log(configState);
  };

  
  return {
    config: configState,
    updateConfigState: updateConfigState,
  };
}
