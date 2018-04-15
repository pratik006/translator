const resultDiv = document.querySelector("#result");
const outputDiv = document.querySelector("#output");
const inputLang = document.querySelector("#inputLang");

const ctx = {

};

window.addEventListener('load', () => {
  // var obj = new Object();
  // obj.parameter = new Object();
  // obj.parameter.q = "আমরা পূর্ণ সুখ এবং আনন্দ সঙ্গে";
  // obj.parameter.source = "bn";
  // obj.parameter.target = "en";
  //doGet(obj);
  ctx.inputLang = inputLang.value;
  inputLang.addEventListener('change', (evt) => {
    console.log(evt.target.value);
    ctx.inputLang = evt.target.value;
  });
  startConverting();
});
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

function startConverting () {
  if('webkitSpeechRecognition' in window){
    var speechRecognizer = new webkitSpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = ctx.inputLang;
    speechRecognizer.start();

    var finalTranscripts = '';

    speechRecognizer.onresult = function(event){
      var interimTranscripts = '';
      for(var i = event.resultIndex; i < event.results.length; i++){
        var transcript = event.results[i][0].transcript;
        transcript.replace("\n", "<br>");
        if(event.results[i].isFinal){
          finalTranscripts += transcript;
        }else{
          interimTranscripts += transcript;
        }
      }
      resultDiv.innerHTML = finalTranscripts + '<span style="color:#999">' + interimTranscripts + '</span>';
      if (finalTranscripts) {
        outputDiv.innerHTML = finalTranscripts +"<br>";
        //resultDiv.innerHTML = "";
        setTimeout(()=> {
          const googleCombo = document.querySelector('#google_translate_element select');
          //googleCombo.selectedIndex = 9;
          //googleCombo.onchange({target: googleCombo});
        }, 1000);        
      }
    };
    speechRecognizer.onerror = function (event) {
      console.log(event);
    };
  }else{
    r.innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
  }
}