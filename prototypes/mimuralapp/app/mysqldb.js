var mysql  = require('mysql');

var pool =  mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'loshs123',
  database : 'mi_mural'
});	

exports.pool = pool;











