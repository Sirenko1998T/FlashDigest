chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   if (message.action === 'getText') {
      let text = document.body.innerText || '';
      sendResponse({ text: text });
   }
});
