import {loadSettings} from '../scripts/help';
import {SortingOrderType} from '../scripts/types';

const SORTING_ORDER_SELECT_ELEMENT_ID = 'o';

const SUBMIT_BUTTON_ELEMENT_ID = 'tr-submit-btn';

const SORTING_ORDER_OPTION_BY_TYPE: Record<SortingOrderType, string> = {
    numberOfDownloads: '', numberOfLeeches: '', numberOfSeeds: '10', registered: '', size: '', topicName: ''
}

loadSettings().then(({orderBy}) => {
    setSortingOrder(orderBy);
})


function setSortingOrder(orderBy: SortingOrderType) {
    console.log('content script');

    console.log('orderBy', orderBy);
    console.log('casted', SORTING_ORDER_OPTION_BY_TYPE[orderBy]);

    const sortingOrderSelect = getSortingOrderSelect();
    const sortingOrderOptionIndex = getSortingOrderOptionIndex(sortingOrderSelect, SORTING_ORDER_OPTION_BY_TYPE[orderBy]);

    if (sortingOrderOptionIndex !== -1) {
        sortingOrderSelect.selectedIndex = sortingOrderOptionIndex;
    }

    submit();
}

function getSortingOrderSelect(): HTMLSelectElement {
    return document.getElementById(SORTING_ORDER_SELECT_ELEMENT_ID) as HTMLSelectElement;
}

function getSortingOrderOptionIndex(selector: HTMLSelectElement, orderBy: string): number {
    return Array.from(selector.options).findIndex(option => option.value === orderBy);
}

function submit() {
    getSubmitButton().click();
}

function getSubmitButton(): HTMLButtonElement {
    return document.getElementById(SUBMIT_BUTTON_ELEMENT_ID) as HTMLButtonElement;
}

