document.getElementById('ai').addEventListener('click', () => {
   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length < 1) return; 

      chrome.scripting.executeScript(
         {
            target: { tabId: tabs[0].id },
            files: ['content.js']
         },
         () => {
            chrome.runtime.sendMessage(tabs[0].id, { action: 'getText'}, (response)=>{
               if(response && response.text){
                  openEditor(response.text);
               }
            })
         }
      );
   });
});


function openEditor (text){
   let editorUrl = chrome.runtime.getURL('editor.html');
   chrome.storage.local.set({'processGetText':text},()=>{
      chrome.tabs.create({url: editorUrl});
   })
}