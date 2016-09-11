var mySql = require('../conf/mysqldb');
var queries = require('../conf/mysql_queries');
var user;

var actions = {
  all: function (request, response) {
    if (!mySql || !mySql.pool) {
      console.log('mySql: ' + mySql);
      console.log('mySql.pool: ' + mySql.pool);
      if (!response.headersSent) {
        response.sendStatus(500);
        return;
      }
    }
    user = (request.cookies && request.cookies.userLoginToken &&
            request.cookies.userLoginToken.user);
    // For test
    if (!user) {
      user = queries.userForTest;
      //response.sendStatus(500);
    }
    var actions = [];
    mySql.pool.getConnection(function (err, connection) {
      if (err || !connection) {
        console.log('err: ' + err);
        console.log('connection: ' + connection);
        if (!response.headersSent) {
          response.sendStatus(500);
          return;
        }
        //throw err;
      } else {
        connection.query(queries.mysqlQueryActions, [user.id, queries.fecha, user.cct], function (err, rows) {
          if (err) {
            console.log('err: ' + err);
            if (!response.headersSent) {
              response.sendStatus(500);
              return;
            }
            //throw err;
          } else {
            totalActions = rows.length;
            var actionId = 0;
            var taskId = 0;
            var lastactionid = 0;
            for (var idx = 0; idx < totalActions; idx++) {
              //actionId = rows[idx].action_id;
              if (rows[idx].action_id !== lastactionid && idx !== 0) {
                actionId++;
              }
              if (!actions[actionId]) {
                actions[actionId] = {};
                actions[actionId].tasks = [];
                actions[actionId].action_id = rows[idx].action_id;
                actions[actionId].school_id = rows[idx].school_id;
                actions[actionId].action_timestamp = new Date(rows[idx].action_timestamp);
                actions[actionId].poster_id = rows[idx].poster_id;
                actions[actionId].poster_name = rows[idx].poster_name;
                actions[actionId].poster_role = rows[idx].poster_role;
                actions[actionId].title = rows[idx].title;
                actions[actionId].description = rows[idx].description;
                actions[actionId].problem = rows[idx].problem;
                actions[actionId].goal = rows[idx].goal;
                actions[actionId].start_date = rows[idx].start_date;
                actions[actionId].due_date = rows[idx].due_date;
                actions[actionId].status = rows[idx].status;
                actions[actionId].results = rows[idx].results;
                actions[actionId].category = rows[idx].category;
                actions[actionId].stars_avg = rows[idx].stars_avg;
                actions[actionId].stars_given = rows[idx].stars_given;
                taskId = 0;
                lastactionid = rows[idx].action_id;
              }
              if (!rows[idx].task_id) {
                continue;
              }
              //taskId = rows[idx].task_id;
              if (!actions[actionId].tasks[taskId]) {
                actions[actionId].tasks[taskId] = {};
                actions[actionId].tasks[taskId].task_id = rows[idx].task_id;
                actions[actionId].tasks[taskId].task_timestamp = rows[idx].task_timestamp;
                actions[actionId].tasks[taskId].ownerid = rows[idx].ownerid;
                actions[actionId].tasks[taskId].task_ownername = rows[idx].task_ownername;
                actions[actionId].tasks[taskId].task_description = rows[idx].task_description;
                actions[actionId].tasks[taskId].task_startdate = rows[idx].task_startdate;
                actions[actionId].tasks[taskId].task_duedate = rows[idx].task_duedate;
                actions[actionId].tasks[taskId].task_status = rows[idx].task_status;
                taskId++;
              }
            }
            response.json(actions);
          }
          connection.release();
        });
      }
    });
  },
  new : function (request, response) {
    response.sendStatus(500);
    /*if (!cassandra || !cassandra.client) {
     response.sendStatus(500);
     } else {
     user = (request.cookies && request.cookies.userLoginToken &&
     request.cookies.userLoginToken.user);
     // For test
     if (!user) {
     user = queries.userForTest;
     //response.sendStatus(500);
     }
     
     // For Test
     console.log('request.body: ' + JSON.stringify(request.body));
     var content = (request.body && request.body.Contenido) ||
     (request.body && request.body.content) || (request.query && request.query.content);
     if (!content) {
     content = '';
     }
     //var queryNewPost = "INSERT INTO posts (school_id, posted_date, posted_time, poster_id, poster_name, content, comment_date, comment_time) " +
     // "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
     
     var post_date = cassandra.driver.types.LocalDate.now();
     var post_time = cassandra.driver.types.LocalTime.now();
     console.log('New post content: ' + content + ' ' + post_date + ' ' + post_time);
     cassandra.client.execute(queryNewPost, [escuela, post_date, post_time, user.id, user.nombre + ' ' + user.apellido,
     content, post_date, post_time], {prepare: true}, function (err, result) {
     if (err) {
     if (!response.headersSent) {
     response.sendStatus(500);
     }
     } else {
     response.sendStatus(200);
     }
     });
     */
  }
};
module.exports = actions;