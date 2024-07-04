import config from './config'
import { IConfig } from './lib/app/types';
export namespace APP_ENV {
    export const DEFAULT_CONFIG: IConfig = config;
    DEFAULT_CONFIG.id = 'andromeda';

    export const FEATURED_APPS = ['andromeda'];

    export const OVERRIDE_DATABASE: Record<string, string> = {
        'galileo-4': 'andr1239ga0egsgjzn7w9p5yez7zddzztduq5acfqx6ygxqfeh00y9c0s5h2rhv',
        'elgafar-1': 'stars15s2f9ycwqjlmeje9jg9muhmpyw62mncw5s74r2tnunq70asqje2szx0glg',
    }
}