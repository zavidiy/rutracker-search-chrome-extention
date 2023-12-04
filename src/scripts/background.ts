import browser from 'webextension-polyfill';

console.log('background')

browser.runtime.onInstalled.addListener(function () {
    browser.contextMenus.create({
        "id": "ruTrackerSearch",
        "contexts": ["selection"],
        "title": 'Search "%s"'
    });

    browser.contextMenus.create({
        id: "ruTrackerSearchInBackground",
        contexts: ["selection"],
        title: 'Search "%s" in background',
    });
});

browser.contextMenus.onClicked.addListener(async function (info) {
    await search(info, info.menuItemId === "ruTrackerSearchInBackground");
})

async function search(info: any, background: boolean) {
    const selectedText: any = info.selectionText !== undefined ? info.selectionText : '';
    const tab = await browser.tabs.create({
        url: "https://rutracker.org/forum/tracker.php?nm=" + encodeURIComponent(selectedText),
        active: !background
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
            files: ['/src/contentScripts/contentScript.js'],
        },
    );
}
