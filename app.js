
const express = require('express');
const https = require('https');
const csv = require('csv-parser');
const bodyParser = require('body-parser');
// const ltg = require('./latlong.js')
const fs = require('fs');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
  
var path = 'world_country_and_usa_states_latitude_and_longitude_values.csv';

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
});

function get_data(file) {
  let maps = {};
  let results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .on('error', error => {
        reject(error);
      })
      .pipe(csv())
      .on('data', (data) => {
        results.push(data)
      })
      .on('end', () => {
        for (var i = 0; i < results.length; i++) {
          key = results[i].country;
          maps[key] = [results[i].latitude, results[i].longitude];
        }
        resolve(maps);
      })
  })
}

app.post("/", function(req, res){
  get_data(path).then((values)=>{
    let country = req.body.loc;
    let lat = values[country][0];
    let lon = values[country][1];
    const apikey = '960f49db276755327d4438a3cb75c519';
    url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+apikey;
    console.log(url);
    https.get(url,(response)=>{
      console.log(response.statusCode);
      response.on('data', (data)=>{
        let weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        console.log(temp);
        res.write("<p>The temp in "+country+ " is currently "+temp+" F<p>");
      })
    })
  })
});

 app.listen(3000, function(){
   console.log('Server running on port 3000');
 });

