import browser from 'webextension-polyfill';
import {setSortingOrder} from './contentScript';

console.log('background')

browser.runtime.onInstalled.addListener(function () {
    browser.contextMenus.create({
        "id": "ruTrackerSearch",
        "contexts": ["selection"],
        "title": 'Search "%s" in rutracker.org'
    });
});

browser.contextMenus.onClicked.addListener(async function (info) {
    const selectedText = info.selectionText ?? '';
    const tab = await browser.tabs.create({
        url: "https://rutracker.org/forum/tracker.php?nm=" + encodeURIComponent(selectedText)
    });

    if (!tab.id) {
        return;
    }

    await browser.scripting.executeScript(
        {
            target: {
                tabId: tab.id,
                allFrames: true
            },
            func: setSortingOrder
        },
    );
})