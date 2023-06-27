export const setSessionStorage = (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    if (value === undefined) {
        window.sessionStorage.removeItem(key);
    }
    else {
        window.sessionStorage.setItem(key, value);
    }
}

export const getSessionStorage = <T = any>(key: string) => {
    if (typeof window === 'undefined') return;
    return window.sessionStorage.getItem(key) as T;
}

export enum SESSION_KEYS {
    CONFIG_URI = 'CONFIG_URI_0.1.0'
}