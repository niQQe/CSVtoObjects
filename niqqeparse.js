NiqqeParse = {
  Parse(file, callback){
    fetch(file)
    .then(response => response.text())
    .then(csv => getHeaders(csv))
    
    function getHeaders(rawdata) {
      let headers = rawdata.split('\n')[0].replace('\r', '').split(';');
      let data = rawdata.split('\n');
      let puredata = [];
      for (let i = 1; i < data.length; i++) {
        if (data[i].length > '') {
          puredata.push(data[i].replace('\r', '').split(';'));
        }
      }
      pushData(puredata, headers);
    }
    
    function pushData(puredata, keys) {
      var temp = {};
      var finishedArr = [];
      for (var i = 0; i < puredata.length; i++) {
        for (var j = 0; j < keys.length; j++) {
          temp[keys[j]] = puredata[i][j];
        }
        finishedArr.push(temp);
        temp = {};
      }
      callback(finishedArr);
    }
  }
}