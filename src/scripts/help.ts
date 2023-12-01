import {DEFAULT_SETTINGS} from './staticData';
import {Settings} from './types';
import browser from 'webextension-polyfill';

export async function loadSettings(): Promise<Settings> {
    const loadedSettingsStr = await browser.storage.local.get("settings");
    // const loadedSettingsStr = localStorage.getItem("settings");

    if (!loadedSettingsStr) {
        return DEFAULT_SETTINGS;
    }

    // const loadedSettings = JSON.parse(loadedSettingsStr);
    const loadedSettings = loadedSettingsStr

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