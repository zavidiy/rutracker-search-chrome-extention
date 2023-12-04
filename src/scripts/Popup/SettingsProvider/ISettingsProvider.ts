import {Settings} from '../../types';
import {SettingsProvider} from './impls/SettingsProvider';

export interface ISettingsProvider extends SettingsProvider {
    getSettings(): Promise<Settings>;

    saveSettings(settings: Settings): Promise<void>;
}

