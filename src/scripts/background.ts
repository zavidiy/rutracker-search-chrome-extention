import browser from 'webextension-polyfill';

const titleFormat = 'Search "%s"';
const backgroundTitleFormat = 'Search "%s" in background';

let searchInnerTextContextMenuID: string | number;
let searchInnerTextInBackgroundContextMenuID: string | number;

browser.runtime.onInstalled.addListener(function () {
    browser.contextMenus.create({
        "id": "ruTrackerSearch",
        "contexts": ["selection",],
        "title": titleFormat,
    });

    browser.contextMenus.create({
        id: "ruTrackerSearchInBackground",
        contexts: ["selection"],
        title: backgroundTitleFormat,
    });

    searchInnerTextContextMenuID = browser.contextMenus.create({
        id: "ruTrackerSearchInnerText",
        contexts: ["all"],
        title: 'Search inner text',
        visible: false
    });

    searchInnerTextInBackgroundContextMenuID = browser.contextMenus.create({
        id: "ruTrackerSearchInnerTextInBackground",
        contexts: ["all"],
        title: 'Search inner text in background',
        visible: false
    });
});

browser.runtime.onMessage.addListener(textClickedHandler);
browser.contextMenus.onClicked.addListener(contextMenusClickedHandler)

async function textClickedHandler(
    {type, text, selection}: {
        type: string,
        text?: string,
        selection?: string
    }) {
    if (type !== 'onTextClicked') {
        return;
    }

    const visible = !selection && !!text;

    await Promise.all([
        browser.contextMenus.update(searchInnerTextContextMenuID, {
            visible: visible,
            title: createTitle(titleFormat, text),
            async onclick() {
                await search(text, false);
            }
        }), browser.contextMenus.update(searchInnerTextInBackgroundContextMenuID, {
            visible: visible,
            title: createTitle(backgroundTitleFormat, text),
            async onclick() {
                await search(text, true);
            }
        })])
}

function createTitle(format: string, text: string | undefined) {
    if (!text) {
        return format;
    }

    const textInTitleMaxLength = 43;
    const truncatedText = text.slice(0, textInTitleMaxLength - 3) + '...';

    return format.replace("%s", truncatedText);
}

async function contextMenusClickedHandler(info: browser.Menus.OnClickData, _: browser.Tabs.Tab | undefined) {
    switch (info.menuItemId) {
        case "ruTrackerSearch":
            await search(info.selectionText, false);
            break;

        case "ruTrackerSearchInBackground":
            await search(info.selectionText, true);
            break;
    }
}

async function search(text: string | undefined, background: boolean) {
    if (!text) {
        return;
    }

    const tab = await browser.tabs.create({
        url: "https://rutracker.org/forum/tracker.php?nm=" + encodeURIComponent(text),
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
