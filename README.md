# CSVtoObjects
Script to convert CSV file to javascript objects.

Usage:

NiqqeParse.parse('file', {
  delimiter:';',
  complete: function(result){
    console.log(result)
  }
})
