chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   if (request.action === 'getText') {
      let text = document.body.innerText || '';
      sendResponse({ text: text });
   }
});
