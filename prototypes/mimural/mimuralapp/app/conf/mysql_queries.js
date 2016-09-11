var mysqlQueryPosts = "SELECT post_id, school_id, post_timestamp, poster_id, " +
        "CONCAT(up.first_name,' ', up.father_lastname) AS poster_name, " +
        " p.content, photo, " +
        "IFNULL((stars_total / stars_users), 0) AS stars_avg, " +
        " IFNULL(stars_given, 0) AS stars_given, category, comment_id, " +
        "comment_timestamp, commenter_id, " +
        "CONCAT(uc.first_name,' ', uc.father_lastname) AS commenter_name, " +
        " c.content AS comment_content " +
        "FROM posts p " +
        "JOIN comments c ON p.post_id = c.parentpost_id " +
        "JOIN users up ON p.poster_id = up.user_id " +
        " JOIN users uc ON c.commenter_id = uc.user_id " +
        "LEFT JOIN postsstars_peruser stars ON p.post_id = stars.postid AND stars.userid = 2 " +
        "WHERE post_timestamp >= '2016-08-01' " +
        "AND p.school_id = 1;";
var queryActions = 'SELECT * FROM actions WHERE school_id = ? AND posted_date >= ?';
var queryActionsStars = 'SELECT * FROM actions_stars WHERE school_id = ? AND posted_date >= ?';
var queryActionsStarsUsers = 'SELECT * FROM actions_stars_users WHERE user_id = ? AND school_id = ? AND posted_date >= ?';
var queryPosts = 'SELECT * FROM posts   WHERE school_id = ? AND posted_date >= ?';
var queryPostsStars = 'SELECT * FROM posts_stars WHERE school_id = ? AND posted_date >= ?';
var queryPostsStarsUsers = 'SELECT * FROM posts_stars_users WHERE user_id = ? AND school_id = ? AND posted_date >= ?';
var escuela = 11;
var fecha = '2016-08-01';
var user;
var queries = {
  mysqlQueryPosts: "SELECT post_id, school_id, post_timestamp, poster_id, " +
          "CONCAT(up.first_name,' ', up.father_lastname) AS poster_name, " +
          " p.content, photo, " +
          "IFNULL((stars_total / stars_users), 0) AS stars_avg, " +
          " IFNULL(stars_given, 0) AS stars_given, category, comment_id, " +
          "comment_timestamp, commenter_id, " +
          "CONCAT(uc.first_name,' ', uc.father_lastname) AS commenter_name, " +
          " c.content AS comment_content " +
          "FROM posts p " +
          "LEFT JOIN comments c ON p.post_id = c.parentpost_id " +
          "JOIN users up ON p.poster_id = up.user_id " +
          "LEFT JOIN users uc ON c.commenter_id = uc.user_id " +
          "LEFT JOIN postsstars_peruser stars ON p.post_id = stars.postid AND stars.userid = 2 " +
          "WHERE post_timestamp >= '2016-08-01' " +
          "AND p.school_id = 1 " +
          "ORDER BY post_timestamp DESC, comment_timestamp DESC",
  delete: function (req, res) {

  }
};
module.exports = queries;


