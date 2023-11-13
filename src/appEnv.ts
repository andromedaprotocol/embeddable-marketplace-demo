import config from './config.json'
import { IConfig } from './lib/app/types';
export namespace APP_ENV {
    export const DEFAULT_CONFIG: IConfig = config as any;
    DEFAULT_CONFIG.id = 'andromeda';

    export const FEATURED_APPS = ['andromeda'];

    export const DATABASE: Record<string, string> = {
        'elgafar-1': 'stars1p6wc4rckslpqkffq5sgwtw5umhhu47hqqpdmrmf3cc2cd2tlf47scvls7f',
        'galileo-3': 'andr1uaxtg74q2wm2asrnyp3smkaax64zd9krzdk9y58ujfzg33dzzzdsazmf5r',
        'uni-6': 'juno1n9nyjzaa9yhquhcmqu67wtu8unf2zgly9rnfpm0tddnjuphgydushu5grp',
        'pisco-1': 'terra1crah72vzxq9a0r7k8xg47xdmr2knd8y5096qrp0fjmsjt95p72sqm7qtny',
        'constantine-3': 'archway1l62r49mg9mc0xxh7ln0dygmda4x6wdyhu0yt0y843xa2r98rwr8sjw6whv',
    }
}