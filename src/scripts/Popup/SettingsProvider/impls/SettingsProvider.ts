import {ISettingsProvider} from '../ISettingsProvider';
import {Settings} from '../../../types';
import browser from 'webextension-polyfill';
import {DEFAULT_SETTINGS} from '../../../staticData';

export class SettingsProvider implements ISettingsProvider {
    async getSettings(): Promise<Settings> {
        const loadedSettings = await browser.storage.local.get();

        this.removeNonRelevantFields(loadedSettings);

        return {
            ...DEFAULT_SETTINGS,
            ...loadedSettings
        };
    }

    async saveSettings(settings: Settings) {
        await browser.storage.local.set(settings);
    }

    private removeNonRelevantFields(loadedSettings: { [key: string]: any }) {
        Object.keys(loadedSettings).forEach((key) => {
            if (!(key in DEFAULT_SETTINGS)) {
                delete loadedSettings[key];
            }
        });
    }
}