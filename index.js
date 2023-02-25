const script = document.createElement('script');
script.src = chrome.runtime.getURL('redirect-clip-button.js');
script.onload = () => script.remove()

document.body.appendChild(script);
