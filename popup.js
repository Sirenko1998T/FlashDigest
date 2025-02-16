document.getElementById('ai').addEventListener('click', () => {
   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length < 1) return;

      chrome.scripting.executeScript(
         {
            target: { tabId: tabs[0].id },
            files: ['content.js']
         },
         () => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'getText' }, (response) => {
               if (response && response.text) {
                  openEditor(response.text);
               }
            });
         }
      );
   });
});

function openEditor(text) {
   let editorUrl = chrome.runtime.getURL('editor.html');
   chrome.storage.local.set({ 'processGetText': text }, () => {
      chrome.tabs.query({}, (tabs)=>{
         let foundTab = tabs.find(tab=> tab.url === editorUrl);
         if(foundTab){
            chrome.tabs.update(foundTab.id, {active:true});
         }
         else{
            chrome.tabs.create({ url: editorUrl });
         }
      })
   
   });
}
