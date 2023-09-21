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
    if (key === APP_ENV.DEFAULT_CONFIG.id) return APP_ENV.DEFAULT_CONFIG;
    const query: IGetKeyQuery = {
        "get_value": {
            "key": key
        }
    }
    const rawConfig: IGetKeyQueryResponse = await client.queryContractSmart(APP_ENV.DATABASE.address, query);
    const config: IConfig = JSON.parse(rawConfig.value.string);
    config.id = key;
    return config;
})

export const getAllApps = cache(async (client: CosmWasmClient) => {
    const query: IAllKeysQuery = {
        "all_keys": {
        }
    }
    const keys: IAllKeysQueryResponse = await client.queryContractSmart(APP_ENV.DATABASE.address, query);
    return keys;
})