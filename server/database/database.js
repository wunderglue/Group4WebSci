const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'WebSci-Project';
 
// Use connect method to connect to the server
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
  
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
  // db.createCollection("practices", function(err, res) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  //   client.close();
  // });
 
  // client.close();
});
