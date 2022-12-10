//Redacted until I figure out how to import asynchronous function

const csv = require('csv-parser');
const fs = require('fs');
var myCountries = [];
var maps2 = {};
var a = 1;

var path = 'world_country_and_usa_states_latitude_and_longitude_values.csv';

// const get_data =  
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
        // console.log(maps);
        resolve(maps);
      })
  })
}
// exports.get_data = get_data;
async function test_get_data(path_name) {

  try {
    const data = await get_data(path_name);
    // return data;
    console.log(data);
  } catch (error) {
    console.log("test_get_data error", error.message);
  }
}
module.exports.test_get_data = test_get_data;
// let out = test_get_data(path);
// console.log(out);
