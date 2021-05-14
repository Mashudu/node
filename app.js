var MongoClient = require("mongodb").MongoClient;


var express = require('express')
var app = express()

const port = 3000;

 
app.get('/:id', function (req, res) {
    MongoClient.connect('mongodb://localhost', function (err, client) {
  if (err) throw err;

  var db = client.db('meterdata');


  //db.collection('test').findOne({}, function (findErr, result) {
    db.collection("periodic").find({meter:req.params.id}).toArray(function(err, result) {
    if (err) throw err;
var  finalResult =  [];

for(n=0;n<result.length-1;n++)
{
 
    result[n].inst = result[n+1].ExportWh -result[n].ExportWh;
    finalResult[n] = result[n];

} 
result[result.length-1].inst=result[result.length-1].ExportWh;  
finalResult[result.length-1] = result[result.length-1]; 
res.send(finalResult);
    client.close();
  });
}); 

})
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))


