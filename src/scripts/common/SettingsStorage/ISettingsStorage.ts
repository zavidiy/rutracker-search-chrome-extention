import {Settings} from '../types';

export interface ISettingsStorage {
    getSettingsAsync(): Promise<Settings>;

    saveSettingsAsync(settings: Settings): Promise<Settings>;
}

