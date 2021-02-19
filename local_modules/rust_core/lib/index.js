// Main entry point for the node module

var addon = require('../native');

module.exports = addon.threadCount;
