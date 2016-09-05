var mySql = require('../conf/mysqldb');
var cassandra = require('../conf/cassandradb');

var query = 'SELECT * FROM actions WHERE school_id = ?';
var param = [11];

var mural = {
  all: function (request, response) {
    if (!cassandra || !cassandra.client) {
      response.sendStatus(500);
    } else {

      //var lastItemIdx;
      var muralResponse = {
        1: {
          id: 1234,
          test: 'test',
          tipo: 'post'
        },
        2: {
          id: 789,
          tipo: 'accion'
        }
      };

      var actions = {};
      var posts = {};

      //var keys = Object.keys(muralResponse);
      //lastItemIdx = keys.length; // 0

      cassandra.client.execute(query, param, {prepare: true}, function (err, result) {
        if (err) {
          response.sendStatus(500);
        } else {
          totalActions = result.rowLength;
          
          var actionTimeStamp = {
            date : result.rows[0].posted_date,
            time : result.rows[0].posted_time
          };
          var actionTimeStamp2 = result.rows[0].posted_date + ' ' + result.rows[0].posted_time;
          var respo = {
            1: actionTimeStamp,
            2: actionTimeStamp2
          };

          
          //result = result.rows[0];
          //m = result.rows[0].get('[json]');
          //m = result.rows[0].get(0);
          //response.writeHead(200, {'Content-Type': 'application/json'});
          //response.write(m);
          //response.end();

          response.json(respo);
        }
      });
    }
  },
  new : function (req, res) {

  },
  delete: function (req, res) {

  }
};

module.exports = mural;