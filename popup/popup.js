


document.addEventListener('DOMContentLoaded',function(){
   document.getElementById('mAi').addEventListener('click', function(event){
      if(event.target.id==='mAi'){
         event.preventDefault();
      }
   chrome.runtime.sendMessage({ action: "openTab" });
      chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
         chrome.scripting.executeScript({
            target:{tabId: tabs[0].id},
            function: mistralAi
         },(results)=>{
          let answer= results[0]?.result;
          chrome.storage.local.set({deepAiAnswer:answer});
         
          
         
         })
      })
   })
})
 
 


async function mistralAi() {
   const keyMistral = '4C56Dq0KV00sNDtnYHdUjqgOFejo3Bck';
   const text = document.body.innerText;
   const prompt = `НУЖЕН СТРУКТУРИРОВАНЫЙ ПЕРЕСКАЗ ДАННОГО ТЕКСТА : ${text}`;

   try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keyMistral}`,
         },
         body: JSON.stringify({
            model: 'mistral-tiny',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
         }),
      });

      if (!response.ok) {
         throw new Error(`Ошибка запроса: ${response.status}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() || 'Ответ пуст';

   } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      return 'Ошибка запроса';
   }
}




















 