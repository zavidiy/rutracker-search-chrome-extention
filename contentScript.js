const SORTING_ORDER_SELECTOR_ELEMENT_ID = 'o';
const SUBMIT_BUTTON_SELECTOR_ELEMENT_ID = 'tr-submit-btn';
const ORDER_BY_SEEDS = '10';

function searchInTab() {
    const sortingOrderSelector = getSortingOrderSelector();
    const orderByOptionIndex = getOrderByOptionIndex(sortingOrderSelector, ORDER_BY_SEEDS);

    if (orderByOptionIndex !== -1) {
        sortingOrderSelector.selectedIndex = orderByOptionIndex;
    }

    submit();
}

function getSortingOrderSelector() {
    return document.getElementById(SORTING_ORDER_SELECTOR_ELEMENT_ID);
}

function getOrderByOptionIndex(selector, orderBy) {
    return Array.from(selector.options).findIndex(option => option.value === orderBy);
}

function submit() {
    getSubmitButton().click();
}

function getSubmitButton() {
    return document.getElementById(SUBMIT_BUTTON_SELECTOR_ELEMENT_ID);
}

searchInTab();


