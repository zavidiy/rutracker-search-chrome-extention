import {Settings} from '../../types';
import {SettingsStorage} from './impls/SettingsStorage';

export interface ISettingsStorage extends SettingsStorage {
    getSettingsAsync(): Promise<Settings>;

    saveSettingsAsync(settings: Settings): Promise<void>;
}

