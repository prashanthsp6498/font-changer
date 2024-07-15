chrome.runtime.onMessage.addListener (function (request, sender, sendResponse) {
    chrome.storage.sync.get(["selected_font"], function(result) {
        // alert(result.selected_font)
        // if (result.selected_font) {
        //     const selectedFont = result.selected_font
        //     chrome.scripting.insertCSS({
        //         target: { tabId: request.tabId },
        //         css:  ` *{
        //                     font-family: '${selectedFont}' ,sans-serif !important;
        //                 }`
        //     });
        // }
    })

});

chrome.storage.sync.get(["selected_font"], function(result) {

    if (!result.selected_font)
    return

    const selectedFont = result.selected_font
    chrome.runtime.sendMessage({type: "fontSelection", selectedFont: selectedFont}, function(response) {
        console.log(response)
    })

})
