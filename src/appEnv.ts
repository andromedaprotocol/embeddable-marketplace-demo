import config from './config.json'
import { IConfig } from './lib/app/types';
export namespace APP_ENV {
    export const BASE_PATH = process.env.BASE_PATH || '';

    export const DEFAULT_CONFIG: IConfig = config as any;

    export const EXAMPLES_MAP: Record<string, { primitive: string, key: string }> = {
        example: {
            primitive: 'stars1ss4fpyp8tktdjnknt0gw76dq5d5mk4paepzj6xepn7sl7uadn2psun5luj',
            key: 'embeddable-1'
        }
    }
}