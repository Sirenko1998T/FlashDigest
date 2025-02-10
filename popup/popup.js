document.addEventListener('DOMContentLoaded', function() {
   document.getElementById('mAi').addEventListener('click', function(event) {
      if (event.target.id === 'mAi') {
         event.preventDefault();
      }

      chrome.runtime.sendMessage({ action: "openTab" });

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
         chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: mistralAi
         }, (results) => {
            if (chrome.runtime.lastError) {
               console.error('Ошибка выполнения скрипта:', chrome.runtime.lastError);
               return;
            }

            if (results && results[0]) {
               let answer = results[0].result;
          
               if (answer) {
                  
                  // Получаем текущий массив из хранилища
                  chrome.storage.local.get({ deepAiAnswers: [] }, function(data) {
                     let answersArray = data.deepAiAnswers;
                     answersArray.push(answer); // Добавляем новый ответ в массив

                     // Сохраняем обновленный массив
                     chrome.storage.local.set({ deepAiAnswers: answersArray }, function() {
                        console.log('Ответ добавлен:', answer);
                     });
                  });
               } 
            }  
         });
      });
   });
});

// Функция mistralAi для теста (замените на вашу реальную логику)
 

async function mistralAi(){
   let text = document.body.innerText;
   return text;
}
 


//async function mistralAi() {
//   const apiKey = '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';  // Замените на ваш API-ключ
//   const url = 'https://api.openai.com/v1/chat/completions';
   
//   // Ограничиваем размер текста
//   let text = document.body.innerText;
//   text = text.slice(0, 2000); // Ограничиваем до первых 2000 символов
   
//   const question = `сделай короткий структурированный пересказ текста: ${text}`;  // Получаем вопрос из поля ввода
//   console.log("Вопрос:", question); // Логируем вопрос

//   const data = {
//      model: 'gpt-4o-mini',  // Указываем модель (можно заменить на 'gpt-3.5-turbo')
//      messages: [{
//         role: 'user',
//         content: question  // Вопрос, введенный пользователем
//      }],
//      max_tokens: 500,  // Ограничиваем количество токенов в ответе
//   };

//   try {
//      console.log("Отправка запроса..."); // Логируем отправку запроса
//      // Отправка запроса к OpenAI API
//      const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//            'Authorization': `Bearer ${apiKey}`,
//            'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data)
//      });

//      // Проверка на успешный ответ
//      if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Ошибка: ${errorData.error.message}`);
//      }

//      const responseData = await response.json();  // Преобразуем ответ в JSON
//      const answer = responseData.choices[0].message.content;  // Получаем ответ от модели
//      console.log("Ответ:", answer);  // Логируем ответ от модели

//      return answer;  // Возвращаем ответ из функции

//   } catch (error) {
//      console.error('Ошибка:', error);
//      return 'Ошибка при получении ответа: ' + error.message;  // Возвращаем ошибку
//   }
//}
 