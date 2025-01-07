import config from './config'
import { ConfigSchema, IConfig } from './lib/app/types';

const parsedConfig = ConfigSchema.parse({
    ...config,
})

export namespace APP_ENV {
    export const DEFAULT_CONFIG: IConfig = parsedConfig;
    DEFAULT_CONFIG.id = 'andromeda';

    export const FEATURED_APPS = ['andromeda'];

    export const OVERRIDE_DATABASE: Record<string, string> = {
    }
}

