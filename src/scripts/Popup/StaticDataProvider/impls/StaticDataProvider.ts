import {IStaticDataProvider} from '../IStaticDataProvider';
import {STATIC_DATA} from '../../staticData';
import {StaticData} from '../../types';

export class StaticDataProvider implements IStaticDataProvider {
    getStaticData(): Promise<StaticData> {
        return Promise.resolve(STATIC_DATA);
    }
}