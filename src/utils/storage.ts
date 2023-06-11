export const setSessionStorage = (key:string, value:any)=>{
    window.sessionStorage.setItem(key, value);
}

export const getSessionStorage = <T=any>(key:string)=>{
    return window.sessionStorage.getItem(key) as T;
}

export enum SESSION_KEYS{
    CONFIG_URI='CONFIG_URI_0.1.0'
}