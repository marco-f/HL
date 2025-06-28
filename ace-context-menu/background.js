chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "execAceScript",
        title: "Exec",
        contexts: ["editable"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "execAceScript") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: execSCRIPT
        });
    }
});

function execSCRIPT() {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('exec.js'); 
        document.documentElement.appendChild(script);
        script.remove();
}
