const express = require('express');
const https = require('https');
// const $ = require('jQuery');
// const jsdom = require("jsdom");
const ltg = require('./latlong.js')
const fs = require('fs')
// $.getScript("./latlong.js", function() {
//    alert("Script loaded but not necessarily executed.");
// });




const app = express();
const crap = [];
// async function display(){
// var lats =
// ltg.ltg('Vatican City')
// .then(lats =>console.log(lats) )
;
// wait(3000
// console.log(lats);
async function run_app(){
  
app.get('/', function(req, res){
  // const url = 'https://api.openweathermap.org/data/2.5/weather?lat=52&lon=41&appid=960f49db276755327d4438a3cb75c519';
  // https.get(url, (res1) => {
  //   console.log(res1);
  //   // crap.push('33');
  //   // console.log(crap);
  // });
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
  // var num1 = req.body.loc;
  // var num2 = Number(req.body.num2);
  // res.send("The weather in the "+num1+" is "+num1);
  // fs.writeFile(__dirname+"/res.txt",
  // console.log(typeof req.join(","))
  // ,(err)=>{if(err){console.error(err)}return});
  // console.log(req);
  var body = '';
  req.on('data',(chunk)=>{body+=chunk});
  req.on('end',()=>{fs.writeFile(__dirname+"/res.json",body,(err)=>{if(err){console.error(err)}return});
                    res.end('{"msg":"OK"}');
});
});

 app.listen(3000, function(){
   console.log('Server running on port 3000');
 });

}
// }
