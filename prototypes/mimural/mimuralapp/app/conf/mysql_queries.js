var queries = {
  userForTest: {
    id: 1, //1
    name: 'LAAH000000XXX',
    role: 'Directivo',
    nombre: 'Hugo',
    apellido: 'Labra', //'Labra'
    cct: 1
  },
  fecha: '2016-08-01',
  mysqlQueryUsers: "SELECT user_id, CONCAT(first_name, ' ', father_lastname) user_name, " +
          "user_code, user_cct, IF(status > 0, 'Activo', 'Inactivo') AS 'status', " +
          "rol AS user_role, register_date AS registro FROM mi_mural.users",
  mysqlQueryPosts: "SELECT post_id, school_id, post_timestamp, poster_id, " +
          "CONCAT(up.first_name,' ', up.father_lastname) AS poster_name, " +
          " up.rol AS poster_role, p.content, photo, " +
          "IFNULL((stars_total / stars_users), 0) AS stars_avg, " +
          " IFNULL(stars_given, 0) AS stars_given, category, comment_id, " +
          "comment_timestamp, commenter_id, " +
          "CONCAT(uc.first_name,' ', uc.father_lastname) AS commenter_name, " +
          " c.content AS comment_content " +
          "FROM posts p " +
          "LEFT JOIN comments c ON p.post_id = c.parentpost_id " +
          "JOIN users up ON p.poster_id = up.user_id " +
          "LEFT JOIN users uc ON c.commenter_id = uc.user_id " +
          "LEFT JOIN postsstars_peruser stars ON p.post_id = stars.postid AND stars.userid = ? " +
          "WHERE post_timestamp >= ? " +
          "AND p.school_id = ? " +
          "ORDER BY post_timestamp DESC, comment_timestamp DESC",
  mysqlQueryActions: "SELECT action_id, school_id, action_timestamp, poster_id, " +
          "CONCAT(ua.first_name,' ', ua.father_lastname) AS poster_name, ua.rol AS poster_role," +
          "title, act.description, problem, goal, act.start_date, act.due_date, " +
          " act.status, results, category, " +
          "IFNULL((stars_total / stars_users), 0) AS stars_avg,  " +
          "IFNULL(stars_given, 0) AS stars_given, " +
          "task_id, tas.timestamp AS task_timestamp, tas.ownerid,  " +
          "CONCAT(ut.first_name,' ', ut.father_lastname) AS task_ownername, " +
          "tas.description AS task_description, " +
          "tas.startdate AS task_startdate, tas.duedate AS task_duedate, " +
          "tas.status AS task_status " +
          "FROM actions act " +
          "LEFT JOIN tasks tas ON act.action_id = tas.parentaction_id " +
          "JOIN users ua ON act.poster_id = ua.user_id " +
          "LEFT JOIN users ut ON tas.ownerid = ut.user_id " +
          "LEFT JOIN actionsstars_peruser stars ON act.action_id = stars.actionid AND stars.userid = ? " +
          "WHERE action_timestamp >= ? " +
          "AND act.school_id = ? " +
          "ORDER BY action_timestamp DESC, task_timestamp DESC",
  mysqlQueryNewPost: "INSERT INTO posts (school_id, poster_id, content, category) VALUES " +
          "(?, ?, ?, ?)"
};
module.exports = queries;


