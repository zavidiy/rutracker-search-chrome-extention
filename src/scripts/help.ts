import {DEFAULT_SETTINGS} from './staticData';
import {Settings} from './common/types';
import browser from 'webextension-polyfill';

export async function loadSettings(): Promise<Settings> {
    const loadedSettings = await browser.storage.local.get();

    removeNonRelevantFields(loadedSettings);

    return {
        ...DEFAULT_SETTINGS,
        ...loadedSettings
    };
}

function removeNonRelevantFields(loadedSettings: { [key: string]: any }) {
    Object.keys(loadedSettings).forEach((key) => {
        if (!(key in DEFAULT_SETTINGS)) {
            delete loadedSettings[key];
        }
    });
}

export async function saveSettings(settings: Settings) {
    await browser.storage.local.set(settings);
    // localStorage.setItem("settings", JSON.stringify(settings));
}