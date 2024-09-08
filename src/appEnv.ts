import config from './config'
import { IConfig } from './lib/app/types';
export namespace APP_ENV {
    export const DEFAULT_CONFIG: IConfig = config;
    DEFAULT_CONFIG.id = 'andromeda';

    export const FEATURED_APPS = ['andromeda'];

    export const OVERRIDE_DATABASE: Record<string, string> = {
        'galileo-4': 'andr1a768a990usm3tj5afqwt7t07882vukckcglyvfa34a026e502jvsfmxknv',
    }
}