document.addEventListener('DOMContentLoaded', () => {
   chrome.storage.local.get('processGetText', (data) => {
       if (data.processGetText) {
        let answerArr =    Array.isArray(data.processGetText)? data.processGetText : [data.processGetText];
        document.getElementById("textarea").textContent  += '\n' + answerArr.join("\n");
       }
   });
});
 chrome.storage.onChanged.addListener((changes, namespace)=>{
   let newValue = changes.processGetText.newValue;
   let answerArr =    Array.isArray(newValue)? newValue : [newValue];
   document.getElementById("textarea").textContent  += '\n' + answerArr.join("\n");
 })
  
let textarea = document.getElementById('textarea');
let selectedText;
 textarea.addEventListener('mouseup', function(){
   selectedText = window.getSelection().toString();
  
 })
 document.getElementById('toolbar').addEventListener('click', function(event) {
   switch (event.target.id) {
     case 'bold':
       document.execCommand('bold');
       break;
     case 'italic':
       document.execCommand('italic');
       break;
     case 'underline':  
       document.execCommand('underline');   
       break;
     case 'alignCenter':
       document.execCommand('justifyCenter');
       break;
     case 'alignLeft':
       document.execCommand('justifyLeft');
       break;
     case 'alignRight':
       document.execCommand('justifyRight');
       break;
     case 'list':
         document.execCommand('insertUnorderedList');
         break;
   }
 });
 
let   fzValue = document.getElementById('size');
document.getElementById('reduce').addEventListener('click', function(){
  let newa= parseInt(fzValue.value) - 1;
  if (newa < 8) {
   reduceBtn.disabled = true;
 }
  fzValue.value=newa;
})

document.getElementById('increase').addEventListener('click', function(){
   let newa= parseInt(fzValue.value) + 1;
 
   fzValue.value=newa;
 })
// fzValue.addEventListener('change', function(){
//   document.execCommand("fontSize", false, "8");
//  let resize = document.querySelectorAll("font[size='7']");
//  resize.forEach(item=>item.style.fontSize= fzValue.value + 'px')
// })
 