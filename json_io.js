const fs = require('fs');

// NOTE: Using synchronous operations on the files,
// not a lot of data so it will mainly prevent read/write 
// conflicts on the file

// Default save file location
const SAVEFILE = "saves/tasks.json";

function getTasks() {
  try {
    // Read the data
    const data = fs.readFileSync(SAVEFILE, 'utf-8');
    // Convert to Json object and return the result
    return JSON.parse(data);
  } catch(err) {
    throw err;
  }
}

function saveTasks(data) {
  try {
    // Covert data to Json string
    data = JSON.stringify(data); 
    // Write Json string to filez
    fs.writeFileSync(SAVEFILE, data, 'utf-8');
    console.log("Saved!");
  } catch(err) {
    throw err;
  }
}

// Export modules (allows importing in other files:
// Ex. const { getTasks } = require('./json_io.js');
module.exports = {
  getTasks,
  saveTasks,
};
