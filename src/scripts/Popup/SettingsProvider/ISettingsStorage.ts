import {Settings} from '../../types';
import {SettingsStorage} from './impls/SettingsStorage';

export interface ISettingsStorage extends SettingsStorage {
    getSettings(): Promise<Settings>;

    saveSettings(settings: Settings): Promise<void>;
}

