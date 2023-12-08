import browser from 'webextension-polyfill';

const titleFormat = 'Search "%s"';
const backgroundTitleFormat = 'Search "%s" in background';

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

    browser.contextMenus.create({
        id: "ruTrackerSearchInnerText",
        contexts: ["all"],
        title: 'Search inner text',
        visible: false
    });

    browser.contextMenus.create({
        id: "ruTrackerSearchInnerTextInBackground",
        contexts: ["all"],
        title: 'Search inner text in background',
        visible: false
    });

    browser.contextMenus.create({
        id: "openRuTrackerSearch",
        contexts: ["all"],
        title: 'Open rutracker.org searching page',
    })
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
        browser.contextMenus.update('ruTrackerSearchInnerText', {
            visible: visible,
            title: createTitle(titleFormat, text),
            async onclick() {
                await search(text, false);
            }
        }), browser.contextMenus.update('ruTrackerSearchInnerTextInBackground', {
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

        case 'openRuTrackerSearch':
            await browser.tabs.create({
                url: 'https://rutracker.org/forum/tracker.php'
            })
    }
}

async function search(text: string | undefined, background: boolean) {
    if (!text) {
        return;
    }

    await browser.tabs.create({
        url: "https://rutracker.org/forum/tracker.php?nm=" + encodeURIComponent(text),
        active: !background
    });
}
