import {ISettingsStorage} from '../../SettingsProvider/ISettingsStorage';
import {Settings} from '../../../types';

export type SortingOrderSelectorProps = {
    settingsStorage: ISettingsStorage
};

export type SortingOrderSelectorState = {
    settings: Settings
};