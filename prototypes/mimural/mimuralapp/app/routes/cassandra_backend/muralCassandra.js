var cassandra = require('../conf/cassandradb');

var queryActions = 'SELECT * FROM actions WHERE school_id = ? AND posted_date >= ?';
var queryActionsStars = 'SELECT * FROM actions_stars WHERE school_id = ? AND posted_date >= ?';
var queryActionsStarsUsers = 'SELECT * FROM actions_stars_users WHERE user_id = ? AND school_id = ? AND posted_date >= ?';
var queryPosts = 'SELECT * FROM posts   WHERE school_id = ? AND posted_date >= ?';
var queryPostsStars = 'SELECT * FROM posts_stars WHERE school_id = ? AND posted_date >= ?';
var queryPostsStarsUsers = 'SELECT * FROM posts_stars_users WHERE user_id = ? AND school_id = ? AND posted_date >= ?';
var escuela = 11;
var fecha = '2016-08-01';
var user;

var actions = [],
        actionsStars = [],
        actionsStarsUser = [],
        posts = [],
        postsStars = [],
        postsStarsUser = [];


var actionsFinished = false,
        actionsStarsFinished = false,
        actionsStarsFinishedUser = false,
        postsFinished = false,
        postsStarsFinished = false,
        postsStarsFinishedUser = false;

var mural = {
  all: function (request, response) {
    if (!cassandra || !cassandra.client) {
      response.sendStatus(500);
    } else {

      user_id = (request.cookies && request.cookies.userLoginToken &&
              request.cookies.userLoginToken.user);

      // For test
      if (!user) {
        user = {
          id: 1, //1
          name: 'LAAH000000XXX',
          role: 'Directivo',
          nombre: 'Hugo',
          apellido: 'Labra', //'Labra'
          cct: 1
        };
        //response.sendStatus(500);
      }

      // Clear
      actions = [];
      actionsStars = [];
      actionsStarsUser = [];

      posts = [];
      postsStars = [];
      postsStarsUser = [];

      actionsFinished = false;
      actionsStarsFinished = false;
      actionsStarsFinishedUser = false;
      postsFinished = false;
      postsStarsFinished = false;
      postsStarsFinishedUser = false;

      //var keys = Object.keys(muralResponse);
      //lastItemIdx = keys.length; // 0

      // Acciones de la ruta de mejora con sus tareas especificas
      mural.getActions(response);
      // Calificaciones de los usuarios a las acciones o actividades de la ruta de mejora
      mural.getActionsStars(response);
      // Calificaciones a las actividades del usuario en particular
      mural.getActionsStarsUsers(response);
      // Publicaciones de los usuarios para compartir, registrar y consultar informacion diversa
      mural.getPosts(response);
      // Calificaciones totales para el promedio a las publicaciones
      mural.getPostsStars(response);
      // Calificaciones a las publicaciones del usuario en particular
      mural.getPostsStarsUsers(response);

    }
  },
  getActions: function (response) {
    // Acciones de la ruta de mejora con sus tareas especificas
    cassandra.client.execute(queryActions, [escuela, fecha], {prepare: true}, function (err, result) {
      if (err) {
        if (!response.headersSent) {
          response.sendStatus(500);
        }
      } else {
        totalActions = result.rowLength;
        var action_idx = 0;
        var task_idx = 0;
        for (var idx = 0; idx < totalActions; idx++) {
          if (!actions[action_idx]) {
            actions[action_idx] = {};
            actions[action_idx].tasks = [];
            task_idx = 0;
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
      }
    });
  },
  getActionsStars: function (response) {
    // Calificaciones totales para el promedio a las publicaciones
    cassandra.client.execute(queryActionsStars, [escuela, fecha], {prepare: true}, function (err, result) {
      if (err) {
        if (!response.headersSent) {
          response.sendStatus(500);
        }
      } else {
        totalActions = result.rowLength;
        var action_idx = 0;
        for (var idx = 0; idx < totalActions; idx++) {
          if (!actionsStars[action_idx]) {
            actionsStars[action_idx] = {};
          }

          // Accion o actividad con estrellas
          actionsStars[action_idx].school_id = result.rows[idx].school_id;
          actionsStars[action_idx].timeid = result.rows[idx].posted_date + ' ' + result.rows[idx].posted_time;
          actionsStars[action_idx].timestamp = {
            date: result.rows[idx].posted_date,
            timenanos: result.rows[idx].posted_time
          };
          actionsStars[action_idx].total_stars = result.rows[idx].total_stars;
          actionsStars[action_idx].total_users = result.rows[idx].total_users;
          action_idx++;
        }
        actionsStarsFinished = true;
        mural.returnAllMural(response);
      }
    });
  },
  getActionsStarsUsers: function (response) {
    // Calificaciones totales para el promedio a las publicaciones
    cassandra.client.execute(queryActionsStarsUsers, [user.id, escuela, fecha], {prepare: true}, function (err, result) {
      if (err) {
        if (!response.headersSent) {
          response.sendStatus(500);
        }
      } else {
        totalActions = result.rowLength;
        var action_idx = 0;
        for (var idx = 0; idx < totalActions; idx++) {
          if (!actionsStarsUser[action_idx]) {
            actionsStarsUser[action_idx] = {};
          }

          // Accion o actividad con estrellas
          actionsStarsUser[action_idx].school_id = result.rows[idx].school_id;
          actionsStarsUser[action_idx].timeid = result.rows[idx].posted_date + ' ' + result.rows[idx].posted_time;
          actionsStarsUser[action_idx].timestamp = {
            date: result.rows[idx].posted_date,
            timenanos: result.rows[idx].posted_time
          };
          actionsStarsUser[action_idx].user_id = result.rows[idx].user_id;
          actionsStarsUser[action_idx].action_stars_user = result.rows[idx].action_stars_user;
          action_idx++;
        }
        actionsStarsFinishedUser = true,
                mural.returnAllMural(response);
      }
    });
  },
  getPosts: function (response) {
    // Publicaciones de los usuarios para compartir, registrar y consultar informacion diversa
    cassandra.client.execute(queryPosts, [escuela, fecha], {prepare: true}, function (err, result) {
      if (err) {
        if (!response.headersSent) {
          response.sendStatus(500);
        }
      } else {
        totalPosts = result.rowLength;
        var post_idx = 0;
        var comment_idx = 0;
        for (var idx = 0; idx < totalPosts; idx++) {
          if (!posts[post_idx]) {
            posts[post_idx] = {};
            posts[post_idx].comments = [];
            comment_idx = 0;
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
            posts[post_idx].poster_name = result.rows[idx].poster_name;
            posts[post_idx].content = result.rows[idx].content;
            if (result.rows[idx].photo) {
              posts[post_idx].photo = result.rows[idx].photo;
            }
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
            posts[post_idx].comments[comment_idx].commenter_name = result.rows[idx].commenter_name;
            comment_idx++;
          }
        }
        postsFinished = true;
        mural.returnAllMural(response);
      }
    });
  },
  getPostsStars: function (response) {
    // Calificaciones totales para el promedio a las publicaciones
    cassandra.client.execute(queryPostsStars, [escuela, fecha], {prepare: true}, function (err, result) {
      if (err) {
        if (!response.headersSent) {
          response.sendStatus(500);
        }
      } else {
        totalPosts = result.rowLength;
        var post_idx = 0;
        for (var idx = 0; idx < totalPosts; idx++) {
          if (!postsStars[post_idx]) {
            postsStars[post_idx] = {};
          }
          // Publicacion
          postsStars[post_idx].school_id = result.rows[idx].school_id;
          postsStars[post_idx].timeid = result.rows[idx].posted_date + ' ' + result.rows[idx].posted_time;
          postsStars[post_idx].timestamp = {
            date: result.rows[idx].posted_date,
            timenanos: result.rows[idx].posted_time
          };
          postsStars[post_idx].total_stars = result.rows[idx].total_stars;
          postsStars[post_idx].total_users = result.rows[idx].total_users;
          post_idx++;

        }
        postsStarsFinished = true;
        mural.returnAllMural(response);
      }
    });
  },
  getPostsStarsUsers: function (response) {
    // Calificaciones a las publicaciones del usuario en particular
    cassandra.client.execute(queryPostsStarsUsers, [user.id, escuela, fecha], {prepare: true}, function (err, result) {
      if (err) {
        if (!response.headersSent) {
          response.sendStatus(500);
        }
      } else {
        totalPosts = result.rowLength;
        var post_idx = 0;
        for (var idx = 0; idx < totalPosts; idx++) {
          if (!postsStarsUser[post_idx]) {
            postsStarsUser[post_idx] = {};
          }
          // Publicacion
          postsStarsUser[post_idx].school_id = result.rows[idx].school_id;
          postsStarsUser[post_idx].timeid = result.rows[idx].posted_date + ' ' + result.rows[idx].posted_time;
          postsStarsUser[post_idx].timestamp = {
            date: result.rows[idx].posted_date,
            timenanos: result.rows[idx].posted_time
          };
          postsStarsUser[post_idx].user_id = result.rows[idx].user_id;
          postsStarsUser[post_idx].post_stars_user = result.rows[idx].post_stars_user;
          post_idx++;

        }
        postsStarsFinishedUser = true;
        mural.returnAllMural(response);
      }
    });
  },
  returnAllMural: function (response) {
    if (!actionsFinished || !actionsStarsFinished || !actionsStarsFinishedUser ||
            !postsFinished || !postsStarsFinished || !postsStarsFinishedUser) {
      return;
    }

    // Estrellas de todos los usuarios para la accion
    var i = 0,
            j = 0,
            k = 0;
    // Merge in linear time to get stars average
    // j no puede ser mayor a i nunca
    // j puede ser solamente menor o igual i 
    while (j < actionsStars.length) {
      // Los arreglos de estrellas solo tendran elementos que ya esten en el arreglo de acciones
      // No hay elementos en los arreglos de estrellas que no esten en el de acciones
      // Por lo tanto recorremos en base al arreglo de acciones y comparamos para ver si tienen alguna calificacion
      if (actions[i].timestamp.date.equals(actionsStars[j].timestamp.date) &&
              actions[i].timestamp.timenanos.equals(actionsStars[j].timestamp.timenanos)) {
        // Coincidencia, la accion con este timestamp id tiene calificaciones (estrellas)
        actions[i].average = actionsStars[j].total_stars / actionsStars[j].total_users;

        // Estrellas del usuario para la accion
        if (k < actionsStarsUser.length && actions[i].timestamp.date.equals(actionsStarsUser[k].timestamp.date) &&
                actions[i].timestamp.timenanos.equals(actionsStarsUser[k].timestamp.timenanos)) {
          actions[i].userStars = actionsStarsUser[k].action_stars_user;
          k++;
        } else {
          actions[i].userStars = 0;
        }
        i++;
        j++; // Incrementar los dos para pasar la siguiente accion
      } else {
        // No coinciden, como en el arreglo de estrellas solo hay elementos que ya estan en el de posts,
        // incrementar el indice de acciones solamente para seguir buscando aquellas con estrellas
        actions[i].average = 0;
        actions[i].userStars = 0;
        i++;
      }
    }


    // Estrellas de todos los usuarios para la publicacion y comentarios
    i = 0;
    j = 0;
    k = 0;
    while (j < postsStars.length) {
      if (posts[i].timestamp.date.equals(postsStars[j].timestamp.date) &&
              posts[i].timestamp.timenanos.equals(postsStars[j].timestamp.timenanos)) {
        posts[i].average = postsStars[j].total_stars / postsStars[j].total_users;

        if (k < postsStarsUser.length && posts[i].timestamp.date.equals(postsStarsUser[k].timestamp.date) &&
                posts[i].timestamp.timenanos.equals(postsStarsUser[k].timestamp.timenanos)) {
          posts[i].userStars = postsStarsUser[k].post_stars_user;
          k++;
        } else {
          posts[i].userStars = 0;
        }
        i++;
        j++;
      } else {
        posts[i].average = 0;
        posts[i].userStars = 0;
        i++;
      }
    }


    // Mezclar todo por su timestamp
    i = 0;
    j = 0;
    k = 0;
    var feed = [];
    var comparation = 0;
    while (i < actions.length && j < posts.length) {
      comparation = actions[i].timestamp.date.compare(posts[j].timestamp.date);
      if (comparation > 0) {
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

    response.json(feed);
  },
  new : function (req, res) {

  },
  delete: function (req, res) {

  }
};

module.exports = mural;