export interface IGetKeyQuery {
    get_value: {
        key: string;
    }
}

export interface IGetKeyQueryResponse {
    key: string;
    value: {
        // For other types it will be like uint128, bool, etc
        string: string;
    }
}

export interface IAllKeysQuery {
    all_keys: {}
}

export type IAllKeysQueryResponse = Array<string>;


export interface IKernelKeyQuery {
    "key_address": {
        "key": "embeddables"
    }
}