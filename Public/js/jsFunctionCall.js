
function uploadFile() {

  var fileContent; var cleanedFile;
  var file = document.getElementById("textFile").files[0];

  if (file) {
    var read = new FileReader();
    read.onload = function(e) { 
      fileContent = e.target.result;
      // alert(fileContent);
      // alert( "Got the file.n" 
      //       +"name: " + file.name + "n"
      //       +"type: " + file.type + "n"
      //       +"size: " + file.size + " bytesn"
      //      );  
      cleanFile(fileContent,file.name);
    }
    read.readAsText(file);
  } 
  else { 
    alert("Failed to load file");
  }
}

function cleanFile(content,filename) {
  var stopwords = [];
  stopwords = JSON.parse(localStorage.getItem("StopWords"));
  content = content.replaceAll(/[^A-Za-z0-9' ]/g, ' ');
  content = content.replace(/[']/g, "").trim();
  content = content.replace(/\s+/g,' ').trim();
  content = strLowerCase(content);

  for(i=0; i<stopwords.length; i++)
  {
    var sw = stopwords[i];
    var regex = new RegExp("\\b"+sw+"\\b","g");
    content = content.replaceAll(regex, '');
    content = content.replace(/\s+/g,' ').trim();
  }
  alert(content);
  localStorage.setItem("filename", JSON.stringify(content));
}

function strLowerCase(str) {
  let newStr = "";
  for(let i = 0; i < str.length; i++) {
      let code = str.charCodeAt(i);
      if(code >= 65 && code <= 90) {
          code += 32;
      } newStr += String.fromCharCode(code);
  } return newStr;
}

function setStopwords() {
  var swcontent; 
  var swarray;
  var swfile = document.getElementById("stopwordstxt").files[0];

  if (swfile) {
    var read = new FileReader();
    read.onload = function(e) { 
      swcontent = e.target.result;
      swcontent = swcontent.replaceAll(/[^A-Za-z0-9' ]/g, ' ');
      swcontent = swcontent.replace(/[']/g, "")
      swcontent = swcontent.replace(/\s+/g,' ').trim();
      swarray = swcontent.split(' ');
      localStorage.setItem("StopWords", JSON.stringify(swarray));
    }
    read.readAsText(swfile);
    alert("Stopwords loaded.");
  } 
  else { 
    alert("Failed to load file");
  }
}

function searchQ1() {

  var count = document.getElementById("countRec").value;
  var fname = document.getElementById("fnInput").value;

  var cleanContent = localStorage.getItem(fname);
  var words = cleanContent.replace(/[.]/g, '').split(/\s/);
  var wordFreqDict = {};
  words.forEach(function (w) {
      if (!wordFreqDict[w]) {
        wordFreqDict[w] = 0;
      }
      wordFreqDict[w] += 1;
  });

  var mostFreqWords = Object
      .keys(wordFreqDict)
      .sort(function (a, b) { return wordFreqDict[b] - wordFreqDict[a]; })

  var leastFreqWords = Object
  .keys(wordFreqDict)
  .sort(function (a, b) { return wordFreqDict[b] - wordFreqDict[a]; }).reverse();

  let least = {}; let most = {}; 
  let  listLastN = []; let listTopN = [];

  for (let i = 0; i < count; i++) {
      var key = mostFreqWords[i];
      most[mostFreqWords[i]] = wordFreqDict[mostFreqWords[i]]
      least[leastFreqWords[i]] = wordFreqDict[leastFreqWords[i]]
  
  listTopN.push({
    word: mostFreqWords[i],
    count: wordFreqDict[mostFreqWords[i]]
  })
  listLastN.push({
    word: leastFreqWords[i],
    count: wordFreqDict[leastFreqWords[i]]
  })
}

$("#mostFreq").append("<h5>Most frequent " +count+ " words in the file: </h5>");
listTopN.forEach(a => {
  $("#mostFreq").append(`<p style="background:LightGray;">The word <i>${a.word}</i> is repeated <b>${a.count}</b> times.</p>`)
})

$("#leastFreq").append("<h5>Least frequent " +count+ " words in the file:</h5>");
listLastN.forEach(a => {
  $("#leastFreq").append(`<p style="background:LightGray;">The word <i>${a.word}</i> is repeated <b>${a.count}</b> times.</p>`)
})

 // $('#mostFreq').empty().append("Most frequent " +count+ " words in the file: " +JSON.stringify(listTopN[0]));
  //$('#leastFreq').empty().append("Least frequent " +count+ " words in the file: " +JSON.stringify(listLastN[0]));

}

function searchQ2() {

  let open = "", close = "";
  let startTag; let endTag;

  var htmlText = document.getElementById("htmltext").value;
  var stopwords = [];
  stopwords = JSON.parse(localStorage.getItem("StopWords"));
  htmlText = htmlText.replaceAll(/[^A-Za-z0-9'<>/ ]/g, ' ');
  htmlText = htmlText.replace(/[']/g, "")
  htmlText = htmlText.replace(/\s+/g,' ').trim();
  htmlText = strLowerCase(htmlText);

  for(i=0; i<stopwords.length; i++)
  {
    var sw = stopwords[i];
    var regex = new RegExp("\\b"+sw+"\\b","g");
    htmlText = htmlText.replaceAll(regex, '');
    htmlText = htmlText.replace(/\s+/g,' ').trim();
  }

  //localStorage.setItem("HtmlTextQ2", JSON.stringify(htmlText));

  for (let i = 0; i < htmlText.length; i++) {
    var tagIndex = htmlText.charAt(i);
    if (tagIndex === "<" && htmlText.charAt(i + 1) !== "/") {
      startTag = 1;
    }
    if (startTag === 1 && tagIndex === ">") {
      open = open + ">" + ","
      startTag = 0;
    }
    if (tagIndex === "<" && htmlText.charAt(i + 1) === "/") {
      endTag = 1;
    }
    if (endTag === 1 && tagIndex === ">") {
      close = close + ">" + ","
      endTag = 0;
    }
    if (startTag === 1) {
      open = open + tagIndex;
    }
    if (endTag === 1) {
      close = close + tagIndex;
    }
  }

  console.log(open.split(","))
  console.log("**********")
  console.log(close.split(","))

}

function searchQ3() {

  var text = document.getElementById("htmltextQ3").value;
  var oldtag = document.getElementById("oldTag").value;
  var newtag = document.getElementById("newTag").value;

  text = text.replaceAll(oldtag,newtag);

  var endOldTag = oldtag.slice(1,-1);
  endOldTag = "</"+endOldTag+">";
  var endNewTag = newtag.slice(1,-1);
  endNewTag = "</"+endNewTag+">";

  text = text.replaceAll(endOldTag,endNewTag);
  document.getElementById("newHtmlText").style.display = 'block';
  $('#newHtmlText').empty().append(text);
  //alert(text);
}

function Q1() {
  var textname = document.getElementById("textName").value;
  var textValue = document.getElementById("text1").value;
  //var keyTextName = textname;
  //cleanFile(textValue,textname);
  textValue = textValue.replaceAll(/[^A-Za-z0-9' ]/g, ' ');
  textValue = textValue.replace(/[']/g, "").trim();
  textValue = textValue.replace(/\s+/g,' ').trim();
  textValue = strLowerCase(textValue);
  alert('File saved succesfully!');
  var wordCount = textValue.split(' ');
  $('#q1Label1').empty().append("Filename is " +textname+"file.txt");
  $('#q1Label2').empty().append("Word count is " +wordCount.length  );

  localStorage.setItem("filename", JSON.stringify(textValue));
}

function Q1Part2() {

  var word = document.getElementById("text2").value;

  var cleanContent = localStorage.getItem("filename");
  //alert(cleanContent);

  var result = cleanContent.split(" ");
//console.log(result);
  //alert(result);
  let count = 0;
  result.forEach(a => {
    if(a === word){
      count = count + 1;
    }
  });
  //alert(count);
  $("#count1").empty.append("Count is " +count);
}

function question1() {

  var count = document.getElementById("countRec").value;
  //var fname = document.getElementById("fnInput").value;

  var cleanContent = localStorage.getItem("filename");
  var words = cleanContent.replace(/[.]/g, '').split(/\s/);
  alert('Punctuations and stopwords removed. click ok to see the result')
  var wordFreqDict = {};
  words.forEach(function (w) {
      if (!wordFreqDict[w]) {
        wordFreqDict[w] = 0;
      }
      wordFreqDict[w] += 1;
  });

  var mostFreqWords = Object
      .keys(wordFreqDict)
      .sort(function (a, b) { return wordFreqDict[b] - wordFreqDict[a]; })

  var leastFreqWords = Object
  .keys(wordFreqDict)
  .sort(function (a, b) { return wordFreqDict[b] - wordFreqDict[a]; }).reverse();

  let least = {}; let most = {}; 
  let  listLastN = []; let listTopN = [];

  for (let i = 0; i < count; i++) {
      var key = mostFreqWords[i];
      most[mostFreqWords[i]] = wordFreqDict[mostFreqWords[i]]
      least[leastFreqWords[i]] = wordFreqDict[leastFreqWords[i]]
  
  listTopN.push({
    word: mostFreqWords[i],
    count: wordFreqDict[mostFreqWords[i]]
  })
  listLastN.push({
    word: leastFreqWords[i],
    count: wordFreqDict[leastFreqWords[i]]
  })
}

$("#mostFreq").append("<h5>Most frequent " +count+ " words in the file: </h5>");
listTopN.forEach(a => {
  $("#mostFreq").append(`<p style="background:LightGray;">The word <i>${a.word}</i> is repeated <b>${a.count}</b> times.</p>`)
})

$("#leastFreq").append("<h5>Least frequent " +count+ " words in the file:</h5>");
listLastN.forEach(a => {
  $("#leastFreq").append(`<p style="background:LightGray;">The word <i>${a.word}</i> is repeated <b>${a.count}</b> times.</p>`)
})

 // $('#mostFreq').empty().append("Most frequent " +count+ " words in the file: " +JSON.stringify(listTopN[0]));
  //$('#leastFreq').empty().append("Least frequent " +count+ " words in the file: " +JSON.stringify(listLastN[0]));

}

function removeStopwords() {
  var stopwords = [];
  stopwords = JSON.parse(localStorage.getItem("StopWords"));
  filenm = JSON.parse(localStorage.getItem("filename"));

  for(i=0; i<stopwords.length; i++)
  {
    var sw = stopwords[i];
    var regex = new RegExp("\\b"+sw+"\\b","g");
    filenm = filenm.replaceAll(regex, '');
    filenm = filenm.replace(/\s+/g,' ').trim();
  }
  //alert(afterSW);
  localStorage.setItem("filename", JSON.stringify(filenm));
  $('#afterSW').empty().append(filenm);
}