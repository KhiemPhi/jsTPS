'use strict'
var required = function() {
  throw new Error("Implement Interface's Methods!");
};

var jsTPS_Transaction = {
  doTransaction: required,
  undoTransaction: required
};
