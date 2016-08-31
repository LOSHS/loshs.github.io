var http = require('http');
var url = require('url');
var assert = require('assert') 

const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'mi_mural'});
const query = 'SELECT JSON * FROM posts';


var express = require('express');
var app = express();

app.get('/', function (req, res) {
  if (!client) {
    res.writeHead(500);
    res.end('Error occurred, sorry.');
    console.error('Error sending 500', request.url);
	}
	else{
	  //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.end('Hello World');
    
    client.execute(query, { prepare : true }, function(err, result) {
       //assert.ifError(err);
	    if (err) {
	      res.writeHead(500);
        res.end('Error occurred, sorry.');
        console.error('Error sending 500', request.url);	      
      }
	    else {
	      m = result.rows[0].get('[json]');
	      //m = result.rows[0].get(0);
        console.log('JSON string: ' + m);
	      res.writeHead(200, {'Content-Type': 'application/json'});		
	      res.write(m);	
        res.end();	
      }
    });
    
    
    
  }
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Listening at http://%s:%s", host, port)

})
