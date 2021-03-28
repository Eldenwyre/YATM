// Require jquery so it can be used below
const $ = require('jquery');

// Import functions
const { saveTasks, getTasks } = require('./json_io.js');

// Create example object to read/write to file
var placeHolder = {
  name:"Name",
  age:21,
};

// Save object to json file
saveTasks(placeHolder);
// read the object back from the file
console.log(getTasks());

$(() => {
  $(`#thread-count`).text(32)
})
