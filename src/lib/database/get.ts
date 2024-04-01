import { cache } from 'react'
import { apolloClient } from '../graphql'
import { IChainConfigQuery, refetchChainConfigQuery } from '@andromedaprotocol/gql/dist/__generated/react'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { APP_ENV } from '@/appEnv';
import { IAllKeysQuery, IAllKeysQueryResponse, IGetKeyQuery, IGetKeyQueryResponse } from './types';
import { IConfig } from '../app/types';

export const getClient = cache(async (chainId: string) => {
    const config = await apolloClient.query<IChainConfigQuery>(refetchChainConfigQuery({ identifier: chainId }));
    const client = await CosmWasmClient.connect(config.data.chainConfigs.config.chainUrl);
    return client;
})

export const getConfig = cache(async (client: CosmWasmClient, key: string) => {
    const chainId = await client.getChainId();
    if (key === APP_ENV.DEFAULT_CONFIG.id && chainId === APP_ENV.DEFAULT_CONFIG.chainId) return APP_ENV.DEFAULT_CONFIG;
    const query: IGetKeyQuery = {
        "get_value": {
            "key": key
        }
    }
    const rawConfig: IGetKeyQueryResponse = await client.queryContractSmart(APP_ENV.DATABASE[chainId], query);
    const config: IConfig = JSON.parse(rawConfig.value.string);
    config.id = key;
    return config;
})

export const getAllApps = cache(async (client: CosmWasmClient) => {
    const chainId = await client.getChainId();
    const query: IAllKeysQuery = {
        "all_keys": {
        }
    }
    console.log(APP_ENV.DATABASE[chainId], chainId, "DB");
    const keys: IAllKeysQueryResponse = await client.queryContractSmart(APP_ENV.DATABASE[chainId], query);
    return keys;
})