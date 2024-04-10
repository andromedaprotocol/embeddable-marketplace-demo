import { cache } from 'react'
import { apolloClient } from '../graphql'
import { IChainConfigQuery, refetchChainConfigQuery } from '@andromedaprotocol/gql/dist/__generated/react'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { APP_ENV } from '@/appEnv';
import { IAllKeysQuery, IAllKeysQueryResponse, IGetKeyQuery, IGetKeyQueryResponse, IKernelKeyQuery } from './types';
import { IConfig } from '../app/types';

export const getClient = cache(async (chainId: string) => {
    const config = await apolloClient.query<IChainConfigQuery>(refetchChainConfigQuery({ identifier: chainId }));
    const client = await CosmWasmClient.connect(config.data.chainConfigs.config.chainUrl);
    return client;
})

export const getEmbeddableAddress = cache(async (client: CosmWasmClient) => {
    const query: IKernelKeyQuery = {
        "key_address": {
            "key": "embeddables"
        }
    }
    const chainId = await client.getChainId();
    if (APP_ENV.OVERRIDE_DATABASE[chainId]) return APP_ENV.OVERRIDE_DATABASE[chainId];
    const config = await apolloClient.query<IChainConfigQuery>(refetchChainConfigQuery({ identifier: chainId }));
    const key: string = await client.queryContractSmart(config.data.chainConfigs.config.kernelAddress, query);
    return key;
})

export const getConfig = cache(async (client: CosmWasmClient, key: string) => {
    const chainId = await client.getChainId();
    if (key === APP_ENV.DEFAULT_CONFIG.id && chainId === APP_ENV.DEFAULT_CONFIG.chainId) return APP_ENV.DEFAULT_CONFIG;
    const query: IGetKeyQuery = {
        "get_value": {
            "key": key
        }
    }
    const db = await getEmbeddableAddress(client);
    console.log(db, chainId, "DB");
    const rawConfig: IGetKeyQueryResponse = await client.queryContractSmart(db, query);
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
    const db = await getEmbeddableAddress(client);
    console.log(db, chainId, "DB");
    const keys: IAllKeysQueryResponse = await client.queryContractSmart(db, query);
    return keys;
})