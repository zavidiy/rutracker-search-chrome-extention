import {ISettingsStorage} from '../../SettingsProvider/ISettingsStorage';
import {Settings} from '../../../types';

export type AppProps = {
    settingsStorage: ISettingsStorage
};

export type AppState = {
    settings: Settings
}