import { BROWSER_TYPE } from "../types";

export const SUPPORTED_BROSWERS = [BROWSER_TYPE.CHROME, BROWSER_TYPE.BRAVE, BROWSER_TYPE.FIREFOX] as const;

export const BROWSER_ICONS: Partial<Record<BROWSER_TYPE, string>> & Record<typeof SUPPORTED_BROSWERS[number], string> = {
    [BROWSER_TYPE.CHROME]: '/browser/chrome.png',
    [BROWSER_TYPE.FIREFOX]: '/browser/firefox.png',
    [BROWSER_TYPE.BRAVE]: '/browser/brave.png',
    [BROWSER_TYPE.UNKNOWN]: '/browser/chrome.png'
}

export const BROWSER_LINKS: Partial<Record<BROWSER_TYPE, string>> & Record<typeof SUPPORTED_BROSWERS[number], string> = {
    [BROWSER_TYPE.CHROME]: 'https://www.google.com/chrome',
    [BROWSER_TYPE.FIREFOX]: 'https://www.mozilla.org/en-US/firefox/new',
    [BROWSER_TYPE.BRAVE]: 'https://brave.com/download',
}

export const KEPLR_LINK = 'https://www.keplr.app/download';
