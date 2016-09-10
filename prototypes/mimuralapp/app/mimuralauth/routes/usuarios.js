var mySql = require('../conf/mysqldb');

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
        connection.query("SELECT user_id AS id, CONCAT(first_name, " +
                "IFNULL(CONCAT(' ', middle_names), ''), ' ', father_lastname, " +
                "IFNULL(CONCAT(' ', mother_lastname), '')) AS nombre, user_code AS rfc, " +
                "user_cct AS ct, IF(status > 0, 'Activo', 'Inactivo') AS 'status', " +
                "register_date AS registro, rol FROM mi_mural.users;", function (err, rows) {
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