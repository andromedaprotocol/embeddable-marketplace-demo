import config from './config'
import { IConfig } from './lib/app/types';
export namespace APP_ENV {
    export const DEFAULT_CONFIG: IConfig = config;
    DEFAULT_CONFIG.id = 'andromeda';

    export const FEATURED_APPS = ['andromeda'];

    export const DATABASE: Record<string, string> = {
        'elgafar-1': 'stars1p8w6t6acg9zruu3j5c4qfsp9f96ujkmu33tezeg305qf8lcdhajsdan9ku',
        'messier-1': 'andr16m5pcz5gpjgnm4drnvaq25uty27nqxplw7q6tesgumsvne9ywcvslswjw6'
    }
}