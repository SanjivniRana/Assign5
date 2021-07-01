
async function uploadFile() {

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
        cleanedFile = cleanFile(fileContent);
      }
      read.readAsText(file);
    } 
    else { 
      alert("Failed to load file");
    }
  }
  
  function cleanFile(content) {
  
    content = content.replaceAll(/[^A-Za-z0-9 ]/g, ' ');
    //$("#cleanTextLabel").empty().append(content);
    //alert(content.length/20);
    //return content.trim();
    //let indices = [];
  
    //let index1 = Math.round(content.length/20);
    //let index11 = indices[index1];
  
    //let str1 = content.substring(0, index1);
    //alert(str1);
    //$("#cleanTextLabel").empty().append(str1);
  
    //let str2 = talkText.substring(index1+1, index1*2);
                              
    //let str3 = talkText.substring(index22, index33);
  
    //let output = [];
    //let tmp; var def;
    //var def1 = "CharFrom"+0+"to"+(index1);
    //tmp = {"SubPart" : content.substring(0, index1)};
    //output.push(tmp);
  
    //var output = {};
    let index1 = Math.round(content.length/20);
    let index2 = Math.round(content.length/20);
    var dict = [];
    def = "CharFrom0to"+(index1);
    dict.push({
      filename: "AliceFile",
      key:   def,
      value: content.substring(0, index1)
    });
  
    for(let i = 2; i <= 20; i++){
      def = "CharFrom"+(index1+1)+"to"+(index2*(i));
      //def = def.toString();
      //tmp = {"SubPart" : content.substring(index1+1, index1*i)};
      dict.push({
        filename: "AliceFile",
        key:   def,
        value: content.substring(index1+1, index1*(i))
      });
      index1 = index1*(i);
      //output.push(tmp);
      //output = jsonConcat(output, tmp);

      var contentArray = [];
        contentArray = content.split(' ');
        var wordDict = [];
        var tempWord = {};
        for(i=0; i<=contentArray.length;i++)
        {
      if(wordDict.some(function (w) {
        if (w.key === contentArray[i])
          return true;
        return false;
      })) {
        tempWord = users.find(w=>w.key === contentArray[i])
        tempWord.count = tempWord.count + 1;
      }
      else {
        wordDict.push({
          filename: "AliceFile",
          word: contentArray[i],
          count: 1
        });
      }
  }

    }
  
    // let data = JSON.stringify(dict);
    // fs.writeFileSync('alice.json', data);
  
    // let jsonObject = {};  
    // dict.forEach(item => obj[item.key] = item.value);  
    // let json = JSON.stringify(jsonObject);  
    // console.log(dict);  
    // console.log(json);  
  
    //const newObject = Object.assign({}, dict)
    //alert(newObject);
    //$("#cleanTextLabel").empty().append(json);
  

  }
  
  function jsonConcat(o1, o2) {
    for (var key in o2) {
     o1[key] = o2[key];
    }
    return o1;
   }
  
  /////API/////
  
  // let response = await fetch('/function1API', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({year: year, state: state})
  // });
  // let responseJSON = await response.json();
  
  // if(response.status=200)
  // {
  //   if(responseJSON.length === 0) {
  //       alert('No Data!');
  //   }
  //   else {
  //   }
  // }
  // else
  // {
  //   alert("Something went wrong")
  // }