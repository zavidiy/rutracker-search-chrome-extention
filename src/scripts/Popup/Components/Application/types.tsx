import {ISettingsStorage} from '../../../common/SettingsStorage/ISettingsStorage';
import {Settings} from '../../../common/types';

export type AppProps = {
    settingsStorage: ISettingsStorage
};

export type AppState = {
    settings: Settings
}