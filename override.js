document.addEventListener('DOMContentLoaded', function() {
  const commonFonts = [
    'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia',
    'Impact', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Tahoma', 'Lucida Console', 'Helvetica', 'sans-serif',
    'JetBrains Mono NL'

  ];
  const fontSelector = document.getElementById('fontSelector');

  function detectFont() {
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testString = "mmmmmmmmmmlli";
    const testSize = '72px';
    const testDiv = document.createElement('div');

    testDiv.style.fontSize = testSize;
    testDiv.style.position = 'absolute';
    testDiv.style.left = '-9999px';
    document.body.appendChild(testDiv);

    const defaultWidth = {};
    baseFonts.forEach(baseFont => {
      testDiv.style.fontFamily = `${baseFont}`;
      testDiv.innerHTML = testString;
      defaultWidth[baseFont] = testDiv.offsetWidth;
    });

    const availableFonts = [];

    commonFonts.forEach(font => {
      const available = baseFonts.some(baseFont => {
        testDiv.style.fontFamily = `${font}, ${baseFont}`;
        return testDiv.offsetWidth !== defaultWidth[baseFont];
      });
      if (available) {
        availableFonts.push(font);
      }
    });

    document.body.removeChild(testDiv);
    return commonFonts;
  }

  const availableFonts = detectFont();

  availableFonts.forEach(font => {
    const option = document.createElement('option');
    option.value = font;
    option.textContent = font;
    fontSelector.appendChild(option);
  });

  fontSelector.addEventListener('change', function() {
    const selectedFont = fontSelector.value;
    console.log(selectedFont)
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.insertCSS({
        target: { tabId: tabs[0].id },
        css:  ` *{
                    font-family: '${selectedFont}' ,sans-serif !important;
                    }`
      });
    });
  });
});
