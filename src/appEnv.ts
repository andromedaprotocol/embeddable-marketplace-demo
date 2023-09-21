import config from './config.json'
import { IConfig } from './lib/app/types';
export namespace APP_ENV {
    export const DEFAULT_CONFIG: IConfig = config as any;
    DEFAULT_CONFIG.id = 'andromeda';

    export const FEATURED_APPS = ['andromeda'];

    export const DATABASE = {
        chainId: 'elgafar-1',
        address: "stars1p6wc4rckslpqkffq5sgwtw5umhhu47hqqpdmrmf3cc2cd2tlf47scvls7f"
    }
}