import {loadSettings} from '../scripts/help';
import {SortingOrderType} from '../scripts/types';
import {
    SORTING_ORDER_OPTION_BY_TYPE,
    SORTING_ORDER_SELECT_ELEMENT_ID,
    SUBMIT_BUTTON_ELEMENT_ID
} from '../scripts/staticData';

loadSettings().then(({orderBy}) => {
    setSortingOrder(orderBy);
})


function setSortingOrder(orderBy: SortingOrderType) {
    if(orderBy === SortingOrderType.REGISTERED) {
        return;
    }

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

