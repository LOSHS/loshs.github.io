var mySql = require('../conf/mysqldb');
var queries = require('../conf/mysql_queries');
var user;
var actions = [], posts = [];
var actionsFinished = false, postsFinished = false;

var mural = {
  all: function (request, response) {
    console.log('Request to Mural ALL');
    if (!mySql || !mySql.pool) {
      console.log('mySql: ' + mySql);
      console.log('mySql.pool: ' + mySql.pool);
      if (!response.headersSent) {
        response.sendStatus(500);
        return;
      }
    } else {
      user = (request.cookies && request.cookies.userLoginToken &&
              request.cookies.userLoginToken.user);
      // For test
      if (!user) {
        user = queries.userForTest;
        //response.sendStatus(500);
      }

      // Clear
      actions = [];
      posts = [];
      actionsFinished = false;
      postsFinished = false;

      //var keys = Object.keys(muralResponse);
      //lastItemIdx = keys.length; // 0

      // Acciones de la ruta de mejora con sus tareas especificas
      mural.getActionsMySQL(request, response);
      // Publicaciones de los usuarios para compartir, registrar y consultar informacion diversa
      mural.getPostsMySQL(request, response);
    }
  },
  getActionsMySQL: function (request, response) {
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
            actionsFinished = true;
            //response.json(actions);
            mural.returnAllMural(response);
          }
          connection.release();
        });
      }
    });
  },
  getPostsMySQL: function (request, response) {
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
        connection.query(queries.mysqlQueryPosts, [user.id, queries.fecha, user.cct], function (err, rows) {
          if (err) {
            console.log('err: ' + err);
            if (!response.headersSent) {
              response.sendStatus(500);
              return;
            }
            //throw err;
          } else {
            totalPosts = rows.length;
            var postId = 0;
            var commentId = 0;
            var lastpostid = 0;
            for (var idx = 0; idx < totalPosts; idx++) {
              //postId = rows[idx].post_id;
              if (rows[idx].post_id !== lastpostid && idx !== 0) {
                postId++;
              }
              if (!posts[postId]) {
                posts[postId] = {};
                posts[postId].comments = [];
                posts[postId].post_id = rows[idx].post_id;
                posts[postId].school_id = rows[idx].school_id;
                posts[postId].post_timestamp = new Date(rows[idx].post_timestamp);
                posts[postId].poster_id = rows[idx].poster_id;
                posts[postId].poster_name = rows[idx].poster_name;
                posts[postId].poster_role = rows[idx].poster_role;
                posts[postId].content = rows[idx].content;
                posts[postId].photo = rows[idx].photo;
                posts[postId].stars_avg = rows[idx].stars_avg;
                posts[postId].stars_given = rows[idx].stars_given;
                posts[postId].category = rows[idx].category;
                commentId = 0;
                lastpostid = rows[idx].post_id;
              }
              if (!rows[idx].comment_id) {
                continue;
              }
              //commentId = rows[idx].comment_id;
              if (!posts[postId].comments[commentId]) {
                posts[postId].comments[commentId] = {};
                posts[postId].comments[commentId].comment_id = rows[idx].comment_id;
                posts[postId].comments[commentId].comment_timestamp = rows[idx].comment_timestamp;
                posts[postId].comments[commentId].commenter_id = rows[idx].commenter_id;
                posts[postId].comments[commentId].commenter_name = rows[idx].commenter_name;
                posts[postId].comments[commentId].comment_content = rows[idx].comment_content;
                commentId++;
              }
            }
            postsFinished = true;
            //response.json(posts);
            mural.returnAllMural(response);
          }
          connection.release();
        });
      }
    });
  },
  returnAllMural: function (response) {
    if (!actionsFinished || !postsFinished) {
      return;
    }
    // Mezclar todo por su timestamp
    var i = 0,
            j = 0,
            k = 0;
    var feed = [];
    while (i < actions.length && j < posts.length) {
      if (actions[i].action_timestamp.getTime() > posts[j].post_timestamp.getTime()) {
        feed[k] = {'action': actions[i]};
        i++;
      } else {
        feed[k] = {'post': posts[j]};
        j++;
      }
      k++;
    }
    while (i < actions.length) {
      feed[k] = {'action': actions[i]};
      i++;
      k++;
    }
    while (j < posts.length) {
      feed[k] = {'post': posts[j]};
      j++;
      k++;
    }
    //response.sendStatus(200);
    response.json(feed);
  }
};

module.exports = mural;