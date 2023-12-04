import {StaticData} from '../types';

export interface IStaticDataProvider {
    getStaticData(): Promise<StaticData>;
}

