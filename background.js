chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.type !== "fontSelection")
        return

    const selectedFont = request.selectedFont
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var myTabId = tabs[0].id;
        console.log("Setting font: " + selectedFont + " for tabId : " + myTabId)
        chrome.scripting.insertCSS({
            target: { tabId: myTabId },
            css:  ` *{
                        font-family: '${selectedFont}' ,sans-serif !important;
                    }`
        });

        chrome.tabs.sendMessage(tabs[0].id, {tabId: myTabId}, function(response) {
            console.log(response)
        });
    })
});
