const mongoose = require('mongoose')
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017/WebSci-Project';

// Use connect method to connect to the server
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
});