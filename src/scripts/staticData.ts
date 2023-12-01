import {Settings, SortingOrderType} from './types';

export const DEFAULT_SETTINGS: Settings = {
    orderBy: SortingOrderType.REGISTERED
};

export const SORTING_ORDER_SELECT_ELEMENT_ID = 'o';

export const SUBMIT_BUTTON_ELEMENT_ID = 'tr-submit-btn';

export const SORTING_ORDER_OPTION_BY_TYPE: Record<SortingOrderType, string> = {
    registered: '1',
    topicName: '2',
    numberOfDownloads: '4',
    numberOfSeeds: '10',
    numberOfLeeches: '11',
    size: '7'
}