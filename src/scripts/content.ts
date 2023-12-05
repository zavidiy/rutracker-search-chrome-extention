import browser from 'webextension-polyfill';

console.log('content script');

let clickedText: string | undefined = undefined;

document.addEventListener("mousedown", async function (event) {
    if (event.button !== 2) {
        return;
    }

    clickedText = (event.target as HTMLElement)?.innerText;

    await browser.runtime.sendMessage(browser.runtime.id, {
        type: 'onTextClicked',
        text: clickedText,
        selection: window.getSelection()?.toString()
    });

    console.log('send mousedown');
}, true);