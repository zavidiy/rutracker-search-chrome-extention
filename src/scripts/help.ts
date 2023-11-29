import {DEFAULT_SETTINGS} from './staticData';
import {Settings} from './types';

export function loadSettings(): Settings {
    const loadedSettingsStr = localStorage.getItem("settings");

    if (!loadedSettingsStr) {
        return DEFAULT_SETTINGS;
    }

    const loadedSettings = JSON.parse(loadedSettingsStr);

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

export function saveSettings(settings: Settings) {
    localStorage.setItem("settings", JSON.stringify(settings));
}