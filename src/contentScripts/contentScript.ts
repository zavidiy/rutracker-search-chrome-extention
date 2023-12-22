import {loadSettings, saveSettings} from '../scripts/help';
import {Settings, SortingOrderType} from '../scripts/common/types';
import {
    SORTING_ORDER_OPTION_BY_TYPE,
    SORTING_ORDER_SELECT_ELEMENT_ID,
    SUBMIT_BUTTON_ELEMENT_ID
} from '../scripts/staticData';

loadSettings().then((settings) => {
    console.log('Settings loaded', settings);

    setSortingOrder(settings);
})

function setSortingOrder(settings: Settings) {
    const {orderBy} = settings;

    const sortingOrderSelect = getSortingOrderSelect();
    const sortingOrderOptionIndex = getSortingOrderOptionIndex(sortingOrderSelect, SORTING_ORDER_OPTION_BY_TYPE.get(orderBy)!);

    getSubmitButton().addEventListener('click', () => {
        const selectedIndex = sortingOrderSelect.selectedIndex;

        if (selectedIndex === sortingOrderOptionIndex) {
            return;
        }

        const orderBy = SORTING_ORDER_OPTION_BY_TYPE.getKey(sortingOrderSelect.options[selectedIndex].value) as SortingOrderType;

        saveSettings({...settings, orderBy}).then(() => {
            console.log('new orderBy settings saved', orderBy);
        });
    });

    if (sortingOrderOptionIndex === -1) {
        return;
    }

    if (sortingOrderSelect.selectedIndex === sortingOrderOptionIndex) {
        return;
    }

    sortingOrderSelect.selectedIndex = sortingOrderOptionIndex;

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

