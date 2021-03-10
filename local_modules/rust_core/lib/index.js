const addon = require('../native/index.node');

// Simply add name of functions here to export them
const {
  threadCount,
} = addon;

module.exports = addon;
