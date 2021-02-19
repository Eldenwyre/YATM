// Require jquery so it can be used below
const $ = require('jquery');
// Require path so we can use it to load our 
// local node module
const path = require('path');

// Get the directory of our local modules
const localModDir = path.join(__dirname, 'local_modules/');
// Load the module
const threadCount = require(localModDir + 'rust_core')

// Set the value of our <a> tag with id thread-count to 
// the output of the threadCount function, imported from 
// rust_core above
$(() => {
  $(`#thread-count`).text(threadCount())
})
