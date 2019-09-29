NiqqeParse = {
  file: '',
  delimiter: '',
  options: [],
  headers: [],
  data: [],
  puredata: [],
  finishedArr: [],
  temp: {},

  parse: function (file, options) {
    this.delimiter = options.delimiter;
    this.file = file;
    this.options = options;
    
    if (this.delimiter == '') {
      console.log('Please insert delimiter')
    } else {
      fetch(this.file)
        .then(response => response.text())
        .then(csv => {
          this.data = csv;
          this.prepareData();
        })
    }
  },

  prepareData: function () {
    this.headers = this.data.split('\n')[0].replace('\r', '').split(this.delimiter);
    this.data = this.data.split('\n');

    for (let i = 1; i < this.data.length; i++) {
      if (this.data[i].length > '') {
        this.puredata.push(this.data[i].replace('\r', '').split(';'));
      }
    }

    this.puredata.forEach(data => {
      if (data.length !== this.headers.length) {
        console.log(`%cWarning %c ROW ${this.puredata.indexOf(data)} %chas missing data`, 'color:red;', 'color: blue', 'color: black');
      }
    })

    this.pushData();
  },

  pushData: function () {
    for (let i = 0; i < this.puredata.length; i++) {
      for (let j = 0; j < this.headers.length; j++) {
        this.temp[this.headers[j]] = this.puredata[i][j];
      }
      this.finishedArr.push(this.temp);
      this.temp = {};
    }
    this.options.complete(this.finishedArr);
  }
}
