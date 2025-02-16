document.addEventListener('DOMContentLoaded',()=>{
   chrome.storage.local.get('processGetText', (data) => {
      if(data.processGetText){
         document.getElementById('texarea').value = data.processGetText;
      }
   })
})