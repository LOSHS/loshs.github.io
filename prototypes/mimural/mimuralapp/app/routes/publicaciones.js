var mySql = require('../conf/mysqldb');
var queries = require('../conf/mysql_queries');
var user;

var publicaciones = {
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
    var posts = [];
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
            response.json(posts);
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
module.exports = publicaciones;