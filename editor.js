document.addEventListener('DOMContentLoaded',()=>{
   chrome.storage.local.get('processGetText', (data) => {
      if(data.processGetText){
         document.getElementById('textarea').value = data.processGetText;
      }
   })
})