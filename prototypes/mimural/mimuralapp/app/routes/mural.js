var mySql = require('../conf/mysqldb');
var queries = require('../conf/mysql_queries');


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
        posts = [];


var actionsFinished = false,
        actionsStarsFinished = false,
        actionsStarsFinishedUser = false,
        postsFinished = false;

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
          id: 1001, //1
          name: 'LAAH000000XXX',
          role: 'Directivo',
          nombre: 'Hugo',
          apellido: 'Labra'
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
  getPostsMySQL: function (request, response) {
    postsFinished = false;
    posts = [];
    // For test
    if (!user) {
      user = {
        id: 1, //1
        name: 'LAAH000000XXX',
        role: 'Directivo',
        nombre: 'Hugo',
        apellido: 'Labra'
      };
      //response.sendStatus(500);
    }
    if (!mySql || !mySql.pool) {
      console.log('mySql: ' + mySql);
      console.log('mySql.pool: ' + mySql.pool);
      response.sendStatus(500);
      //throw err;
    }
    mySql.pool.getConnection(function (err, connection) {
      if (err || !connection) {
        console.log('err: ' + err);
        console.log('connection: ' + connection);
        response.sendStatus(500);
        //throw err;
      } else {
        connection.query(queries.mysqlQueryPosts, function (err, rows) {
          if (err) {
            console.log('err: ' + err);
            response.sendStatus(500);
            //throw err;
          } else {
            totalPosts = rows.length;
            var postId = 0;
            var commentId = 0;
            var lastpostid = 0;
            for (var idx = 0; idx < totalPosts; idx++) {
              //postId = rows[idx].post_id;
              if(rows[idx].post_id !== lastpostid && idx !== 0) {
                postId++;
              }
              if (!posts[postId]) {
                posts[postId] = {};
                posts[postId].comments = [];
                posts[postId].post_id = rows[idx].post_id;
                posts[postId].school_id = rows[idx].school_id;
                posts[postId].post_timestamp = rows[idx].post_timestamp;
                posts[postId].poster_id = rows[idx].poster_id;
                posts[postId].poster_name = rows[idx].poster_name;
                posts[postId].content = rows[idx].content;
                posts[postId].photo = rows[idx].photo;
                posts[postId].stars_avg = rows[idx].stars_avg;
                posts[postId].stars_given = rows[idx].stars_given;
                posts[postId].category = rows[idx].category;
                commentId = 0;
                lastpostid = rows[idx].post_id;
              }
              if(!rows[idx].comment_id) {
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
            //response.sendStatus(200);
            response.json(posts);
            //mural.returnAllMural(response);
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