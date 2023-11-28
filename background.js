chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "id": "ruTrackerSearch",
        "contexts": ["selection"],
        "title": 'Search "%s" in rutracker.org'
    });
});

chrome.contextMenus.onClicked.addListener(async function (info) {
    const tab = await chrome.tabs.create({
        url: "https://rutracker.org/forum/tracker.php?nm=" + encodeURIComponent(info.selectionText)
    });

    console.log('inject function');

    chrome.scripting.executeScript(
        {
            target: {
                tabId: tab.id,
                allFrames: true
            },
            files: ['contentScript.js']
        },
    ).then(() => console.log("injected a function"));
})