// CREACION DE LA BASE DE DATOS

CREATE KEYSPACE IF NOT EXISTS mi_mural
WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE mi_mural;

// CREAR TABLAS DE ESTRELLAS PARA ACTIVIDADES

CREATE TABLE IF NOT EXISTS actions_stars  (
  school_id int,
  posted_date date,
  posted_time time,

  total_stars counter,
  total_users counter,
 
  PRIMARY KEY (school_id, posted_date, posted_time)
) WITH CLUSTERING ORDER BY (posted_date DESC, posted_time DESC);

CREATE TABLE IF NOT EXISTS actions_stars_users (
  school_id int,
  posted_date date,
  posted_time time,
 
  user_id bigint,
  action_stars_user tinyint,
 
  PRIMARY KEY (school_id, user_id, posted_date, posted_time)
) WITH CLUSTERING ORDER BY (user_id ASC, posted_date DESC, posted_time DESC);


// CREACION DE INDICES SECUNDARIOS Y SASI PARA BUSQUEDAS MAS COMPLEJAS
CREATE CUSTOM INDEX IF NOT EXISTS asu_uid_sasi_idx ON actions_stars_users(user_id) USING 'org.apache.cassandra.index.sasi.SASIIndex';
CREATE CUSTOM INDEX IF NOT EXISTS asu_asu_sasi_idx ON actions_stars_users(action_stars_user) USING 'org.apache.cassandra.index.sasi.SASIIndex';


// CALIFICACIONES A LA ACCION 'Mejora de Divisiones'
// USUARIO 1001 : 5 ESTRELLAS, 1002 : 4 ESTRELLAS, 1003 : 3 ESTRELLAS
INSERT INTO actions_stars_users (school_id, posted_date, posted_time, user_id, action_stars_user)
VALUES (11, '2016-09-02', '15:00:00.000', 1001, 5);
UPDATE actions_stars SET total_stars = total_stars + 5, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-09-02' AND posted_time = '15:00:00.000';
INSERT INTO actions_stars_users (school_id, posted_date, posted_time, user_id, action_stars_user)
VALUES (11, '2016-09-02', '15:00:00.000', 1002, 4);
UPDATE actions_stars SET total_stars = total_stars + 4, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-09-02' AND posted_time = '15:00:00.000';
INSERT INTO actions_stars_users (school_id, posted_date, posted_time, user_id, action_stars_user)
VALUES (11, '2016-09-02', '15:00:00.000', 1003, 3);
UPDATE actions_stars SET total_stars = total_stars + 3, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-09-02' AND posted_time = '15:00:00.000';


// CALIFICACIONES A LA ACCION 'Paseos mensuales'
// USUARIO 1001 : 4 ESTRELLAS, 1002 : 5 ESTRELLAS
INSERT INTO actions_stars_users (school_id, posted_date, posted_time, user_id, action_stars_user)
VALUES (11, '2016-08-25', '11:00:00.000', 1001, 4);
UPDATE actions_stars SET total_stars = total_stars + 4, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-08-25' AND posted_time = '11:00:00.000';
INSERT INTO actions_stars_users (school_id, posted_date, posted_time, user_id, action_stars_user)
VALUES (11, '2016-08-25', '11:00:00.000', 1002, 5);
UPDATE actions_stars SET total_stars = total_stars + 5, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-08-25' AND posted_time = '11:00:00.000';


SELECT * FROM actions_stars;
SELECT * FROM actions_stars_users;
