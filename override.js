document.addEventListener('DOMContentLoaded', function() {
    function setSelectedFont(fontName) {
        var selectedDocElement = document.getElementById("selectedFont");
        selectedDocElement.innerText = "Selected Font: " + fontName 
    }

    const fontSelector = document.getElementById('fontSelector');
    chrome.fontSettings.getFontList(function(fonts) {
        fonts.forEach(function(font) {
            const option = document.createElement('option');
            option.value = font.fontId;
            option.textContent = font.displayName;
            fontSelector.appendChild(option);
        });
    });

    chrome.storage.sync.get(["selected_font"], function(result) {
        fontSelector.innerText = result.selected_font
        setSelectedFont(result.selected_font)
    })

    fontSelector.addEventListener('change', function() {
        const selectedFont = fontSelector.value;
        chrome.storage.sync.set({selected_font: selectedFont}, function(){
            setSelectedFont(selectedFont)
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.scripting.insertCSS({
                    target: { tabId: tabs[0].id },
                    css:  ` *{
                                font-family: '${selectedFont}' ,sans-serif !important;
                            }`
                });
            });

        })
    });
});
