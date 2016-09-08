// CREACION DE LA BASE DE DATOS

CREATE KEYSPACE IF NOT EXISTS mi_mural
WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE mi_mural;

// CREAR TABLAS DE ESTRELLAS PARA PUBLICACIONES

CREATE TABLE IF NOT EXISTS posts_stars  (
  school_id int,
  posted_date date,
  posted_time time,

  total_stars counter,
  total_users counter,
 
  PRIMARY KEY (school_id, posted_date, posted_time)
) WITH CLUSTERING ORDER BY (posted_date DESC, posted_time DESC);

CREATE TABLE IF NOT EXISTS posts_stars_users (
  school_id int,
  posted_date date,
  posted_time time,
 
  user_id bigint,
  post_stars_user tinyint,
 
  PRIMARY KEY (school_id, user_id, posted_date, posted_time)
) WITH CLUSTERING ORDER BY (user_id ASC, posted_date DESC, posted_time DESC);


// CREACION DE INDICES SECUNDARIOS Y SASI PARA BUSQUEDAS MAS COMPLEJAS
CREATE INDEX IF NOT EXISTS psu_uid_idx ON posts_stars_users(user_id);
CREATE INDEX IF NOT EXISTS psu_psu_idx ON posts_stars_users(post_stars_user);
CREATE CUSTOM INDEX IF NOT EXISTS psu_psu_sasi_idx ON posts_stars_users(post_stars_user) USING 'org.apache.cassandra.index.sasi.SASIIndex';


// SELECCIONA TODO DE LA TABLA
SELECT * FROM posts_stars_users;
SELECT * FROM posts_stars;


// CALIFICACIONES A LA PUBLICACION 'POST 1 user 1001 school 11'
// USUARIO 1001 : 5 ESTRELLAS, 1002 : 4 ESTRELLAS, 1003 : 5 ESTRELLAS
INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user)
VALUES (11, '2016-08-26', '10:12:24.000', 1001, 5);
UPDATE posts_stars SET total_stars = total_stars + 5, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-08-26' AND posted_time = '10:12:24.000';
INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user)
VALUES (11, '2016-08-26', '10:12:24.000', 1002, 4);
UPDATE posts_stars SET total_stars = total_stars + 4, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-08-26' AND posted_time = '10:12:24.000';
INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user)
VALUES (11, '2016-08-26', '10:12:24.000', 1003, 5);
UPDATE posts_stars SET total_stars = total_stars + 5, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-08-26' AND posted_time = '10:12:24.000';


// CALIFICACIONES A LA PUBLICACION 'POST 2 user 1001 school 11'
// USUARIO 1001 : 5 ESTRELLAS, 1003 : 3 ESTRELLAS, 1004 : 3 ESTRELLAS, 1006 : 3 ESTRELLAS
INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user)
VALUES (11, '2016-08-26', '12:15:16.000', 1001, 5);
UPDATE posts_stars SET total_stars = total_stars + 5, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-08-26' AND posted_time = '12:15:16.000';
INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user)
VALUES (11, '2016-08-26', '12:15:16.000', 1003, 3);
UPDATE posts_stars SET total_stars = total_stars + 3, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-08-26' AND posted_time = '12:15:16.000';
INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user)
VALUES (11, '2016-08-26', '12:15:16.000', 1004, 2);
UPDATE posts_stars SET total_stars = total_stars + 2, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-08-26' AND posted_time = '12:15:16.000';
INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user)
VALUES (11, '2016-08-26', '12:15:16.000', 1006, 3);
UPDATE posts_stars SET total_stars = total_stars + 3, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-08-26' AND posted_time = '12:15:16.000';


// CALIFICACIONES LA PUBLICACION 'POST 5 user 1001 school 11 with comments'
// USUARIO 1006 : 3 ESTRELLAS, 1007 : 4 ESTRELLAS, 1010 : 2 ESTRELLAS
INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user)
VALUES (11, '2016-09-01', '15:21:01.000', 1006, 3);
UPDATE posts_stars SET total_stars = total_stars + 3, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-09-01' AND posted_time = '15:21:01.000';
INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user)
VALUES (11, '2016-09-01', '15:21:01.000', 1007, 4);
UPDATE posts_stars SET total_stars = total_stars + 4, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-09-01' AND posted_time = '15:21:01.000';
INSERT INTO posts_stars_users (school_id, posted_date, posted_time, user_id, post_stars_user)
VALUES (11, '2016-09-01', '15:21:01.000', 1010, 2);
UPDATE posts_stars SET total_stars = total_stars + 2, total_users = total_users + 1
WHERE school_id = 11 AND posted_date = '2016-09-01' AND posted_time = '15:21:01.000';



// BUSQUEDAS SIN NECESIDAD DE INDICE
// LA GRAN MAYORIA DE LAS BUSQUEDAS SERAN DE ESTE TIPO, CASSANDRA Y SU ALMACENAMIENTO INTERNO 
// HACE QUE ESTE TIPO DE BUSQUEDAS SEAN MUY EFICIENTES SIN NECESIDAD DE USAR UN INDICE

// SELECCIONA TODO DE LA TABLA
SELECT * FROM posts_stars_users;
SELECT * FROM posts_stars;

// SELECCIONA SOLO DE UNA ESCUELA (CARGA TODOS CALIFACIONES EN EL MURAL DE LA ESCUELA)
SELECT * FROM posts_stars WHERE school_id = 11;
SELECT * FROM posts_stars_users WHERE school_id = 11;

// SELECCIONA SOLO DE UNA ESCUELA Y USUARIO (CARGA TODOS LAS PUBLICACIONES CON SUS COMENTARIOS CADA UNO CON
// SUS CALIFACIONES EN EL MURAL DE LA ESCUELA PARA LA VISTA DE UN USUARIO ESPECIFICO)
SELECT * FROM posts_stars_users WHERE school_id = 11 AND user_id = 1006;
SELECT * FROM posts_stars WHERE school_id = 11;

// SELECCIONA SOLO DE UNA ESCUELA Y USUARIO SOLO EN SEPTIEMBRE (CARGA TODOS LAS PUBLICACIONES CON SUS COMENTARIOS 
// CADA UNO CON SUS CALIFACIONES EN EL MURAL DE LA ESCUELA PARA LA VISTA DE UN USUARIO ESPECIFICO SOLO DEL MES SEPTIEMBRE
// MUY UTIL PARA HACER PAGINADO Y DESPLEGAR INMEDIATAMENTE LA VISTA DE LA RED SOCIAL
// EL DRIVER PUEDE HACER PAGINADO AUTOMATICO PARA SOLO REGRESAR CIERTA CANTIDAD DE RESULTADOS Y POSTERIORMENTE REGRESAR LOS SIGUIENTES
SELECT * FROM posts_stars_users WHERE school_id = 11 AND user_id = 1006 AND posted_date >= '2016-09-01';
SELECT * FROM posts_stars WHERE school_id = 11 AND posted_date >= '2016-09-01';



// SELECCIONA SOLO DE UNA ESCUELA Y USUARIO MENOR A CIERTO DIA (MUY UTIL PARA EL PAGINADO QUE SE HARA
// EN PARALELO PARA CUANDO EL USUARIO HAGA SCROLL A PUBLICACIONES MAS ANTIGUAS)
SELECT * FROM posts_stars_users WHERE school_id = 11 AND user_id = 1006 AND posted_date <= '2016-08-31' AND posted_date >= '2016-08-01';
SELECT * FROM posts_stars WHERE school_id = 11 AND posted_date <= '2016-08-31' AND posted_date >= '2016-08-01';


// CUENTA TODAS LAS CALIFICACIONES (PARA LAS ESTADISTICAS DE USO)
SELECT COUNT(*) FROM posts_stars_users;
SELECT COUNT(*) FROM posts_stars;
// CUENTA TODAS LAS CALIFICACIONES  POR ESCUELA (PARA LAS ESTADISTICAS DE USO)
SELECT COUNT(*) FROM posts_stars_users WHERE school_id = 11;
SELECT COUNT(*) FROM posts_stars_users WHERE school_id = 12;
SELECT COUNT(*) FROM posts_stars WHERE school_id = 11;
SELECT COUNT(*) FROM posts_stars WHERE school_id = 12;

// PROMEDIO DE CALIFICACION (ESTRELLAS TOTALES) DE LAS PUBLICACIONES
SELECT AVG(CAST(total_stars as double)) FROM posts_stars;
// PROMEDIO DE CALIFICACION DE LAS PUBLICACIONES QUE OTORGAN LOS USUARIOS
SELECT AVG(CAST(post_stars_user as double)) FROM posts_stars_users;
// PROMEDIO DE CALIFICACION DE LAS PUBLICACIONES QUE OTORGA UN USUARIO PARTICULAR A SU ESCUELA
SELECT AVG(CAST(post_stars_user as double)) FROM posts_stars_users WHERE school_id = 11 AND user_id = 1003;
// PUBLICACION CON MAS ESTRELLAS
SELECT MAX(total_stars) FROM posts_stars;
// PUBLICACION QUE MAS USUARIOS HAN CALIFICADO
SELECT MAX(total_users) FROM posts_stars;
// PUBLICACION CON MAS ESTRELLAS PARA UNA ESCUELA EN UN MES DETERMINADO
SELECT MAX(total_stars) FROM posts_stars WHERE school_id = 11 AND posted_date <= '2016-08-31' AND posted_date >= '2016-08-01';
// PUBLICACION QUE MAS USUARIOS HAN CALIFICADO PARA UNA ESCUELA EN UN MES DETERMINADO
SELECT MAX(total_users) FROM posts_stars WHERE school_id = 11 AND posted_date <= '2016-08-31' AND posted_date >= '2016-08-01';
// PUBLICACION CON MAS Y MENOS ESTRELLAS PARA UNA ESCUELA EN UN MES DETERMINADO
SELECT MIN (total_stars), MAX (total_stars) FROM posts_stars WHERE school_id = 11 AND posted_date <= '2016-08-31' AND posted_date >= '2016-08-01';


// CUENTA LAS ESCUELAS CON PUBLICACIONES CON CALIFICACIONES (PARA LAS ESTADISTICAS DE USO)
SELECT DISTINCT school_id FROM posts_stars_users;
// SELECCIONA LOS ULTIMOS 5 REGISTROS DE UNA ESCUELA (LOS MAS RECIENTES POR SU ORDEN)
SELECT * FROM posts_stars_users WHERE school_id = 11 LIMIT 5;
// SELECCIONA LOS ULTIMOS 2 REGISTROS DE CADA ESCUELA (LOS MAS RECIENTES POR SU ORDEN)
SELECT * FROM posts_stars_users PER PARTITION LIMIT 2;




// BUSQUEDAS CON FILTRADO
// PUBLICACIONES QUE MAS DE 3 USUARIOS HAYAN CALIFICADO
SELECT * FROM posts_stars WHERE total_users > 3 ALLOW FILTERING;
// BUSQUEDA DE CALIFICACIONES DE CIERTO USUARIO;
SELECT * FROM posts_stars_users WHERE user_id = 1001 ALLOW FILTERING;
// PUBLICACIONES CON MAYOR A CIERTA CANTIDAD DE ESTRELLAS (CALIFICACION)
SELECT * FROM posts_stars WHERE total_stars > 10 ALLOW FILTERING;



// BUSQUEDAS CON INDICE SECUNDARIO (NO REALIZAN FILTRADO POR LO QUE SON MAS RAPIDAS)
// BUSQUEDA DE CALIFICACIONES DE CIERTO USUARIO USANDO UN INDICE SECUNDARIO;
CREATE INDEX IF NOT EXISTS psu_uid_idx ON posts_stars_users(user_id);
SELECT * FROM posts_stars_users WHERE user_id = 1001;

// BUSQUEDA DE CALIFICACIONES DE CIERTO USUARIO USANDO UN INDICE SECUNDARIO;
CREATE INDEX IF NOT EXISTS psu_psu_idx ON posts_stars_users(post_stars_user);
// BUSQUEDA DE PUBLICACIONES A LAS QUE ALGUN USUARIO HAYA CALIFICADO CON SOLO UNA ESTRELLA
SELECT * FROM posts_stars_users WHERE post_stars_user = 2;


// BUSQUEDAS CON INDICE SASI 
// LOS INDICES SASI SON AUN MAS RAPIDOS QUE LOS INDICES SECUNDARIOS
// Y PERMITEN BUSQUEDAS COMPLEJAS
// BUSQUEDA DE PUBLICACIONES A LAS QUE ALGUN USUARIO HAYA CALIFICADO CON MENOS DE TRES ESTRELLAS
CREATE CUSTOM INDEX IF NOT EXISTS psu_psu_sasi_idx ON posts_stars_users(post_stars_user) USING 'org.apache.cassandra.index.sasi.SASIIndex';
SELECT * FROM posts_stars_users WHERE post_stars_user <= 3;


// LIMPIAR Y BORRAR TABLA;

TRUNCATE TABLE posts_stars_users;
TRUNCATE TABLE posts_stars;

DROP INDEX psu_uid_idx;
DROP INDEX psu_psu_idx;
DROP INDEX psu_psu_sasi_idx;


DROP TABLE posts_stars_users;
DROP TABLE posts_stars;


