// CREACION DE LA BASE DE DATOS

CREATE KEYSPACE IF NOT EXISTS mi_mural
WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE mi_mural;

// CREAR TABLA DE ESTRELLAS 

CREATE TABLE IF NOT EXISTS posts_stars  (
  school_id bigint,
  posted_date date,
  posted_time time,

  total_stars counter,
  total_users counter,
 
  comment_date date,
  comment_time time,
  comment_total_stars counter,
  comment_total_stars_users counter,
 
  PRIMARY KEY (school_id, posted_date, posted_time, comment_date, comment_time)
) WITH CLUSTERING ORDER BY (posted_date DESC, posted_time DESC, comment_date DESC, comment_time DESC);

CREATE TABLE IF NOT EXISTS posts_stars_users (
  school_id bigint,
  posted_date date,
  posted_time time,
 
  user_id bigint,
  post_stars_user bigint,
 
  comment_date date,
  comment_time time,
  comment_stars_users bigint,
 
  PRIMARY KEY (school_id, user_id, posted_date, posted_time, comment_date, comment_time)
) WITH CLUSTERING ORDER BY (user_id ASC, posted_date DESC, posted_time DESC, comment_date DESC, comment_time DESC);


// SELECCIONA TODO DE LA TABLA
SELECT * FROM posts_stars_users;
SELECT * FROM posts_stars;

// PUBLICACIONES SIN COMENTARIOS 

INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user, comment_date, comment_time)
VALUES (11, '2016-08-26', '10:12:24.000', 1001, 5, '2016-08-26', '10:12:24.000');
UPDATE posts_stars SET total_stars = total_stars + 5, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-08-26' AND posted_time = '10:12:24.000' 
AND comment_date = '2016-08-26' AND comment_time = '10:12:24.000';

INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user, comment_date, comment_time)
VALUES (11, '2016-08-26', '10:12:24.000', 1002, 4, '2016-08-26', '10:12:24.000');
UPDATE posts_stars SET total_stars = total_stars + 4, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-08-26' AND posted_time = '10:12:24.000' 
AND comment_date = '2016-08-26' AND comment_time = '10:12:24.000';

INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user, comment_date, comment_time)
VALUES (11, '2016-08-26', '10:12:24.000', 1003, 5, '2016-08-26', '10:12:24.000');
UPDATE posts_stars SET total_stars = total_stars + 5, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-08-26' AND posted_time = '10:12:24.000' 
AND comment_date = '2016-08-26' AND comment_time = '10:12:24.000';




