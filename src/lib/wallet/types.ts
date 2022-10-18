import { Keplr } from "@keplr-wallet/types";

export enum KeplrConnectionStatus {
    NotInstalled = "notinstalled",
    Connecting = "connecting",
    Ok = "ok",
}

export interface KeplrStatus {
    status: KeplrConnectionStatus;
    keplr: Keplr | undefined;
}