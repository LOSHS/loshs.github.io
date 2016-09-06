var mySql = require('../conf/mysqldb');
var cassandra = require('../conf/cassandradb');

var escuela = 11;
var fecha = '2016-08-01';
var queryActions = 'SELECT * FROM actions WHERE school_id = ? AND posted_date >= ?';
var paramActions = [escuela, fecha];
var queryPosts =   'SELECT * FROM posts   WHERE school_id = ? AND posted_date >= ?';
var paramPosts = [escuela, fecha];

var actions = {};
var posts = {};
var actionsFinished = false;
var postsFinished = false;

var mural = {
  all: function (request, response) {
    if (!cassandra || !cassandra.client) {
      response.sendStatus(500);
    } else {
      
      // Clear
      actions = {};
      posts = {};
      actionsFinished = false;
      postsFinished = false;

      //var keys = Object.keys(muralResponse);
      //lastItemIdx = keys.length; // 0

      // Acciones de la ruta de mejora con sus tareas especificas
      cassandra.client.execute(queryActions, paramActions, {prepare: true}, function (err, result) {
        if (err) {
          if(!response.headersSent){
            response.sendStatus(500);
          }
        } else {
          totalActions = result.rowLength;
          var action_idx = 1;
          var task_idx = 1;
          for (var idx = 0; idx < totalActions; idx++) {
            if (!actions[action_idx]) {
              actions[action_idx] = {};
              actions[action_idx].tasks = {};
              task_idx = 1;
            }

            // Action
            // Comparar primero tiempo para mayor eficiencia pues mas frecuentemente
            // este sera el primero en diferir
            if (result.rows[idx].posted_time.equals(result.rows[idx].task_time) &&
                    result.rows[idx].posted_date.equals(result.rows[idx].task_date)) {
              //actions[action_idx].school_id = result.rows[idx].school_id;
              actions[action_idx].timeid = result.rows[idx].posted_date + ' ' + result.rows[idx].posted_time;
              actions[action_idx].timestamp = {
                date: result.rows[idx].posted_date,
                timenanos: result.rows[idx].posted_time
              };
              //actions[action_idx].poster_id = result.rows[idx].poster_id;
              actions[action_idx].category = result.rows[idx].category;
              actions[action_idx].title = result.rows[idx].title;
              actions[action_idx].description = result.rows[idx].description;
              //actions[action_idx].problem = result.rows[idx].problem;
              //actions[action_idx].goal = result.rows[idx].goal;
              //actions[action_idx].start_date = result.rows[idx].start_date;
              actions[action_idx].due_date = result.rows[idx].due_date;
              actions[action_idx].status = result.rows[idx].status;
              actions[action_idx].results = result.rows[idx].results;
              action_idx++;
            }
            // Tarea especifica de la accion
            else {
              //actions[action_idx].tasks = {};
              actions[action_idx].tasks[task_idx] = {};
              actions[action_idx].tasks[task_idx].tasktimeid = result.rows[idx].task_date + ' ' + result.rows[idx].task_time;
              actions[action_idx].tasks[task_idx].tasktimestamp = {
                date: result.rows[idx].task_date,
                timenanos: result.rows[idx].task_time
              };
              actions[action_idx].tasks[task_idx].task_description = result.rows[idx].task_description;
              //actions[action_idx].tasks[task_idx].task_involved_ids = result.rows[idx].task_involved_ids;
              //actions[action_idx].tasks[task_idx].task_start_date = result.rows[idx].task_start_date;
              //actions[action_idx].tasks[task_idx].task_due_date = result.rows[idx].task_due_date;
              //actions[action_idx].tasks[task_idx].task_status = result.rows[idx].task_status;
              task_idx++;
            }
          }
          actionsFinished = true;
          mural.returnAllMural(response);
          //response.json(actions);
        }
      });

      cassandra.client.execute(queryPosts, paramPosts, {prepare: true}, function (err, result) {
        if (err) {
          if(!response.headersSent){
            response.sendStatus(500);
          }
        } else {
          totalPosts = result.rowLength;
          var post_idx = 1;
          var comment_idx = 1;
          for (var idx = 0; idx < totalPosts; idx++) {
            if (!posts[post_idx]) {
              posts[post_idx] = {};
              posts[post_idx].comments = {};
              comment_idx = 1;
            }

            // Publicacion
            // Comparar primero tiempo para mayor eficiencia pues mas frecuentemente
            // este sera el primero en diferir
            if (result.rows[idx].posted_time.equals(result.rows[idx].comment_time) &&
                    result.rows[idx].posted_date.equals(result.rows[idx].comment_date)) {
              posts[post_idx].school_id = result.rows[idx].school_id;
              posts[post_idx].timeid = result.rows[idx].posted_date + ' ' + result.rows[idx].posted_time;
              posts[post_idx].timestamp = {
                date: result.rows[idx].posted_date,
                timenanos: result.rows[idx].posted_time
              };
              posts[post_idx].poster_id = result.rows[idx].poster_id;
              posts[post_idx].content = result.rows[idx].content;
              posts[post_idx].photo = result.rows[idx].photo;
              post_idx++;
            }
            // Comentario en la publicacion
            else {
              //posts[post_idx].comments = {};
              posts[post_idx].comments[comment_idx] = {};
              posts[post_idx].comments[comment_idx].commenttimeid = result.rows[idx].comment_date 
                      + ' ' + result.rows[idx].comment_time;
              posts[post_idx].comments[comment_idx].commenttimestamp = {
                date: result.rows[idx].comment_date,
                timenanos: result.rows[idx].comment_time
              };
              posts[post_idx].comments[comment_idx].commenter_id = result.rows[idx].commenter_id;
              posts[post_idx].comments[comment_idx].comment_content = result.rows[idx].comment_content;
              comment_idx++;
            }
          }
          postsFinished = true;
          mural.returnAllMural(response);
          //response.json(actions);
        }
      });

    }
  },
  returnAllMural : function (response) {
    if(!actionsFinished || !postsFinished) {
      return;
    }
    response.json(posts);
  },
  new : function (req, res) {

  },
  delete: function (req, res) {

  }
};

module.exports = mural;