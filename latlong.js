const csv = require('csv-parser');
const fs = require('fs');
// const $ = require('jQuery');
// const jsdom = require("jsdom");
// const Promise = require('promise');
// const async = require("async");

// exports.ltg =  function getlatlong(country){
// var results = [];
var myCountries = [];
// var maps = {};
var maps2 = {};
var a = 1;

var path = 'world_country_and_usa_states_latitude_and_longitude_values.csv';

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
          myCountries.push(results[i].country);
          key = results[i].country;
          maps[key] = [results[i].latitude, results[i].longitude];
        }
        resolve(maps);
      })
  })
}
async function test_get_data() {

  try {
    const data = await get_data(path);
    console.log(data);
  } catch (error) {
    console.log("test_get_data error", error.message);
  }
}

test_get_data;
// }
// fs.createReadStream('world_country_and_usa_states_latitude_and_longitude_values.csv')
//  .pipe(csv())
//  .on('data', (data) => {results.push(data)})
//  .on('end', () => {
//    for(var i =0; i<results.length; i++){
//      myCountries.push(results[i].country);
//      key = results[i].country;
//      maps[key] =  [results[i].latitude, results[i].longitude];
//    }
//    // return maps;
//    // console.log(maps);
//  })
//  // console.log(data)
//  ;
