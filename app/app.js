const resultDiv = document.querySelector("#result");
const outputDiv = document.querySelector("#output");
window.addEventListener('load', () => {
  var obj = new Object();
  obj.parameter = new Object();
  obj.parameter.q = "আমরা পূর্ণ সুখ এবং আনন্দ সঙ্গে";
  obj.parameter.source = "bn";
  obj.parameter.target = "en";
  //doGet(obj);
});
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

function startConverting () {
  if('webkitSpeechRecognition' in window){
    var speechRecognizer = new webkitSpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = 'bn-IN';
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
      if(finalTranscripts) {
        console.log(finalTranscripts);
        fetch("https://translate.google.com/translate_a/t?client=t&sl=en&tl=bn&hl=en&v=1.0&source=is&tk=226585.328130&q=hello%20brother&q=hello%20brother%20how%20are%20you%20doing%3F&q=hello%20brother%20how%20are%20you&q=hello%20brother%20are%20you%20there%3F&q=hello%20brother%20how%20are%20you%20doing%20today&q=hello%20brothers&q=hello%20brother%20are%20you%20with%20me%3F",
        {'method': 'get', 'crossDomain': true, dataType: "jsonp", mode: 'no-cors'}
        )
        //.then(resp=>resp.json())
        .then(resp => console.log(resp));
      }
    };
    speechRecognizer.onerror = function (event) {
    };
  }else{
    r.innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
  }
}


/* Written by Amit Agarwal */
/* web: ctrlq.org          */

function doGet(e) {

  var sourceText = ''
  if (e.parameter.q){
    sourceText = e.parameter.q;
  }
  
  var sourceLang = 'auto';
  if (e.parameter.source){
    sourceLang = e.parameter.source;
  }

  var targetLang = 'en';
  if (e.parameter.target){
    targetLang = e.parameter.target;
  }
  
  /* Option 1 */
  
  //var translatedText = LanguageApp.translate(sourceText, sourceLang, targetLang)
  
  /* Option 2 */  
  
  var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
            + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
  fetch(url);
  var result = JSON.parse(UrlFetchApp.fetch(url).getContentText());
  
  translatedText = result[0][0][0];
  
  var json = {
    'sourceText' : sourceText,
    'translatedText' : translatedText
  };
  
  // set JSONP callback
  var callback = 'callback';
  if(e.parameter.callback){
    callback = e.parameter.callback
  }
  
  // return JSONP
  return ContentService
           .createTextOutput(callback + '(' + JSON.stringify(json) + ')')
           .setMimeType(ContentService.MimeType.JAVASCRIPT);
}