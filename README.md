# CSVtoObjects
Script to convert CSV file to javascript objects.

Usage:

NiqqeParse.parse('eval.csv', {
  delimiter:';',
  complete: function(result){
    console.log(result)
  }
})
