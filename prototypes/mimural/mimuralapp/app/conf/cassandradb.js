var cassandra = require('cassandra-driver');

var client = new cassandra.Client({ 
  contactPoints: ['127.0.0.1'], 
  keyspace: 'mi_mural'
});

exports.client = client;
exports.driver = cassandra;