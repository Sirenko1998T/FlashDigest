chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   if (message.action === "openTab") {
      chrome.tabs.query({currentWindow:true}, function (allTabs){
         let siteUrl = chrome.runtime.getURL('/site/site.html')
         let targetTab=allTabs.find(tab=>tab.url && tab.url.includes(siteUrl));
         if(targetTab){
            chrome.tabs.update(targetTab.id, {active:true});
         }
         else{
            chrome.tabs.create({url:siteUrl});
         }
       });
   }
});
 
