document.addEventListener('DOMContentLoaded', function () {
   let textarea = document.getElementById('textarea');
 
   chrome.storage.local.get({ deepAiAnswers: [] }, function (result) {
       let answers = result.deepAiAnswers;
    
           textarea.value += '\n' + answers.join('\n');  
       
   });
});
