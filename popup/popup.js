document.addEventListener('DOMContentLoaded', function(){
   document.getElementById('openAi').addEventListener('click', function(){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
         chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func:test
         },(result)=>{
            if(result){ 
                let urlSite= chrome.runtime.getURL('/site/site.html');
                chrome.tabs.query({url: urlSite}, function(tabs){
                  if(tabs.length > 0){
                chrome.tabs.update(tabs[0].id, {active:true});
                  }
                  else{
                     chrome.tabs.create({url: urlSite})
                  }
                })
            }
         })
      })
   })
}) 
 function test(){
   let text ='test';
   return text;
 }