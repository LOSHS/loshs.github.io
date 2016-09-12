var mySql = require('../conf/mysqldb');
var queries = require('../conf/mysql_queries');

var usuarios = {
  all: function (request, response) {
    if (!mySql || !mySql.pool) {
      response.sendStatus(500);
      return;
    }
    mySql.pool.getConnection(function (err, connection) {
      if (err || !connection) {
        response.sendStatus(500);
        //throw err;
      } else {
        connection.query(queries.mysqlQueryUsers, function (err, rows) {
                  if (err) {
                    response.sendStatus(500);
                  } else {
                    if (rows) {
                      response.writeHead(200, {'Content-Type': 'application/json'});
                      response.end(JSON.stringify(rows));
                      //response.json(JSON.stringify(rows));
                    } else {
                      // Vacio
                    }
                  }
                  connection.release();
                });
      }
    });
  },
  new : function (req, res) {

  },
  delete: function (req, res) {

  }
};

module.exports = usuarios;