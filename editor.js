document.addEventListener('DOMContentLoaded', () => {
   chrome.storage.local.get('processGetText', (data) => {
       if (data.processGetText) {
        let answerArr =    Array.isArray(data.processGetText)? data.processGetText : [data.processGetText];
        document.getElementById("textarea").value += '\n' + answerArr.join("\n");
       }
   });
});
 chrome.storage.onChanged.addListener((changes, namespace)=>{
   let newValue = changes.processGetText.newValue;
   let answerArr =    Array.isArray(newValue)? newValue : [newValue];
   document.getElementById("textarea").value += '\n' + answerArr.join("\n");
 })