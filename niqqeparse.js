NiqqeParse = {
  file:'',
  delimiter:'',
  parse: function(file, options){
    this.delimiter = options.delimiter;
    this.file = file
    if(this.delimiter == ''){
      console.log('Please insert delimiter')
    } else{
      fetch(this.file)
      .then(response => response.text())
      .then(csv =>  getHeaders(csv, this.delimiter))
    }
    function getHeaders(rawdata, delimiter) {
      let headers = rawdata.split('\n')[0].replace('\r', '').split(delimiter);
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
      options.complete(finishedArr)
    }
  }
}