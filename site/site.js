document.addEventListener('DOMContentLoaded', function () {
   chrome.storage.local.get('deepAiAnswer', function (result) {
      let textarea = document.getElementById('textarea');

 
      if (textarea.value.length > 0) {
         textarea.value += '\n\n' + result.deepAiAnswer;
      } else {
 
         textarea.value = result.deepAiAnswer;
      }
   });
});
