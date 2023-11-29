import {loadSettings, saveSettings} from './help';
import browser from 'webextension-polyfill';
import {Settings, SortingOrderType} from './types';

const settings = loadSettings();

console.log(JSON.stringify(settings));

initializeOpenRuTrackerButton();
initializeSortingOrderSelect(settings);

function initializeOpenRuTrackerButton() {
    const openRuTrackerButton = getOpenRuTrackerButton();

    openRuTrackerButton.addEventListener('click', openRuTrackerButtonClickHandler)

    async function openRuTrackerButtonClickHandler() {
        await browser.tabs.create({
            url: 'https://rutracker.org/forum/index.php'
        })
    }
}

function getOpenRuTrackerButton(): HTMLButtonElement {
    return document.getElementById('openRuTrackerButton') as HTMLButtonElement;
}

function initializeSortingOrderSelect(settings: Settings) {
    const sortingOrderSelect = getSortingOrderSelect();

    sortingOrderSelect.value = settings.orderBy;
    sortingOrderSelect.addEventListener('change', sortingOrderSelectChangeHandler);

    async function sortingOrderSelectChangeHandler() {
        settings.orderBy = Object.values(SortingOrderType).find((value) => value === sortingOrderSelect.value) ?? SortingOrderType.REGISTERED;

        saveSettings(settings);
    }

}

function getSortingOrderSelect(): HTMLSelectElement {
    return document.getElementById("sortingOrderSelect") as HTMLSelectElement;
}

