var cassandra = require('../conf/cassandradb');

var queryPosts = 'SELECT * FROM posts   WHERE school_id = ? AND posted_date >= ?';
var queryPostsStars = 'SELECT * FROM posts_stars WHERE school_id = ? AND posted_date >= ?';
var queryPostsStarsUsers = 'SELECT * FROM posts_stars_users WHERE user_id = ? AND school_id = ? AND posted_date >= ?';
var escuela = 11;
var fecha = '2016-08-01';
var user;

var queryNewPost = "INSERT INTO posts (school_id, posted_date, posted_time, poster_id, poster_name, content, comment_date, comment_time) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

var posts = [],
        postsStars = [],
        postsStarsUser = [];

var postsFinished = false,
        postsStarsFinished = false,
        postsStarsFinishedUser = false;

var publicaciones = {
  all: function (request, response) {
    if (!cassandra || !cassandra.client) {
      response.sendStatus(500);
    } else {

      user = (request.cookies && request.cookies.userLoginToken &&
              request.cookies.userLoginToken.user);

      // For test
      if (!user) {
        user = {
          id: 1,
          name: 'LAAH000000XXX',
          role: 'Directivo',
          nombre: 'Hugo',
          apellido: 'Labra', //'Labra'
          cct: 1
        };
        //response.sendStatus(500);
      }

      posts = [];
      postsStars = [];
      postsStarsUser = [];
      postsFinished = false;
      postsStarsFinished = false;
      postsStarsFinishedUser = false;

      //var keys = Object.keys(muralResponse);
      //lastItemIdx = keys.length; // 0

      // Publicaciones de los usuarios para compartir, registrar y consultar informacion diversa
      publicaciones.getPosts(response);
      // Calificaciones totales para el promedio a las publicaciones
      publicaciones.getPostsStars(response);
      // Calificaciones a las publicaciones del usuario en particular
      publicaciones.getPostsStarsUsers(response);

    }
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
        publicaciones.returnPosts(response);
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
        publicaciones.returnPosts(response);
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
        publicaciones.returnPosts(response);
      }
    });
  },
  returnPosts: function (response) {
    if (!postsFinished || !postsStarsFinished || !postsStarsFinishedUser) {
      return;
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
    response.json(posts);
  },
  new : function (request, response) {
    if (!cassandra || !cassandra.client) {
      response.sendStatus(500);
    } else {
      user = (request.cookies && request.cookies.userLoginToken &&
              request.cookies.userLoginToken.user);
      // For test
      if (!user) {
        user = {
          id: 1,
          name: 'LAAH000000XXX',
          role: 'Directivo',
          nombre: 'Hugo',
          apellido: 'Labra', //'Labra'
          cct: 1
        };
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
    }
  },
  delete: function (req, res) {

  }
};

module.exports = publicaciones;