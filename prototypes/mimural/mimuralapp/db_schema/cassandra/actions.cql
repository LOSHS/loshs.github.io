CREATE KEYSPACE IF NOT EXISTS mi_mural
WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE mi_mural;

// CREAR TABLA DE ACCIONES

CREATE TABLE IF NOT EXISTS actions (
  school_id int,
  posted_date date,
  posted_time time,
 
  category int,
  poster_id bigint,
  title text,
  description text,
  problem text,
  goal text,
  start_date date,
  due_date date,
  status tinyint,
  results text,
  
  task_date date,
  task_time time,
  task_description text,
  task_involved_ids set<bigint>,
  task_start_date date,
  task_due_date date,
  task_status tinyint,
 
  PRIMARY KEY (school_id, posted_date, posted_time, task_date, task_time)
) WITH CLUSTERING ORDER BY (posted_date DESC, posted_time DESC, task_date DESC, task_time DESC);


// CREACION DE INDICES SECUNDARIOS Y SASI PARA BUSQUEDAS MAS COMPLEJAS
CREATE CUSTOM INDEX IF NOT EXISTS actions_posterid_idx ON actions(poster_id) USING 'org.apache.cassandra.index.sasi.SASIIndex';
CREATE CUSTOM INDEX IF NOT EXISTS actions_title_idx ON actions(title) USING 'org.apache.cassandra.index.sasi.SASIIndex'
WITH OPTIONS = { 
'mode': 'CONTAINS',
'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.NonTokenizingAnalyzer',
'case_sensitive': 'false'
};
CREATE CUSTOM INDEX IF NOT EXISTS actions_description_idx ON actions(description) USING 'org.apache.cassandra.index.sasi.SASIIndex'
WITH OPTIONS = { 
'mode': 'CONTAINS',
'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.NonTokenizingAnalyzer',
'case_sensitive': 'false'
};
CREATE CUSTOM INDEX IF NOT EXISTS task_description_idx ON actions(task_description) USING 'org.apache.cassandra.index.sasi.SASIIndex'
WITH OPTIONS = { 
'mode': 'CONTAINS',
'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.NonTokenizingAnalyzer',
'case_sensitive': 'false'
};
CREATE INDEX IF NOT EXISTS task_involved_ids_idx ON actions (task_involved_ids);



INSERT INTO actions (school_id, posted_date, posted_time, poster_id, category, title, description, start_date, due_date, status, results, task_date, task_time)
VALUES (11, '2016-09-02', '15:00:00.000', 1001, 1, 'Mejora de Divisiones', 'Esta actividad tiene como proposito desarrollar en el alumno habilidades para dividir y mejorar sus calificaciones en la prueba que realizamos ante la sep para ', '2016-09-02', '2016-09-04', 3, '71 % de los alumnos son capaces de realizar divisiones de dos cifras', '2016-09-02', '15:00:00.000');
INSERT INTO actions (school_id, posted_date, posted_time, poster_id, task_date, task_time, task_description, task_start_date, task_due_date, task_status)
VALUES (11, '2016-09-02', '15:00:00.000', 1001, '2016-09-02', '15:00:01.000', 'Realizar divisiones de 1 cifra', '2016-09-02', '2016-09-03', 3);
INSERT INTO actions (school_id, posted_date, posted_time, poster_id, task_date, task_time, task_description, task_start_date, task_due_date, task_status)
VALUES (11, '2016-09-02', '15:00:00.000', 1001, '2016-09-02', '15:00:02.000', 'Realizar ejemplos usando objetos cotidianos', '2016-09-02', '2016-09-03', 3);
INSERT INTO actions (school_id, posted_date, posted_time, poster_id, task_date, task_time, task_description, task_start_date, task_due_date, task_status)
VALUES (11, '2016-09-02', '15:00:00.000', 1001, '2016-09-02', '15:00:03.000', 'Realizar divisiones de 2 cifras', '2016-09-02', '2016-09-03', 3);
INSERT INTO actions (school_id, posted_date, posted_time, poster_id, task_date, task_time, task_description, task_start_date, task_due_date, task_status)
VALUES (11, '2016-09-02', '15:00:00.000', 1001, '2016-09-02', '15:00:04.000', 'Realizar problemas razonados de divisiones', '2016-09-02', '2016-09-03', 3);
INSERT INTO actions (school_id, posted_date, posted_time, poster_id, task_date, task_time, task_description, task_start_date, task_due_date, task_status)
VALUES (11, '2016-09-02', '15:00:00.000', 1001, '2016-09-02', '15:00:05.000', 'Realizar divisiones de 3 cifras', '2016-09-02', '2016-09-03', 3);
INSERT INTO actions (school_id, posted_date, posted_time, poster_id, task_date, task_time, task_description, task_start_date, task_due_date, task_status)
VALUES (11, '2016-09-02', '15:00:00.000', 1001, '2016-09-02', '15:00:06.000', 'Explicar la similitud con la operacion de multiplicacion', '2016-09-02', '2016-09-03', 3);



INSERT INTO actions (school_id, posted_date, posted_time, poster_id, category, title, description, start_date, due_date, status, results, task_date, task_time)
VALUES (11, '2016-08-25', '11:00:00.000', 1001, 1, 'Paseos mensuales', 'Esta actividad servirá para unir al grupo de 3B del turno matutino, permitirá crear lazos entre los alumnos y conocerse más a fondo, esto con el fin ', '2016-08-25', '2016-09-01', 3, '5 papás reportan que sus hijos han pedido permiso para invitar compañeros de su grupo', '2016-08-25', '11:00:00.000');
INSERT INTO actions (school_id, posted_date, posted_time, poster_id, task_date, task_time, task_description, task_start_date, task_due_date, task_status)
VALUES (11, '2016-08-25', '11:00:00.000', 1001, '2016-08-25', '11:30:01.000', 'Salida al boliche', '2016-08-25', '2016-09-01', 3);
INSERT INTO actions (school_id, posted_date, posted_time, poster_id, task_date, task_time, task_description, task_start_date, task_due_date, task_status)
VALUES (11, '2016-08-25', '11:00:00.000', 1001, '2016-08-25', '11:30:02.000', 'Salida a otro estado', '2016-08-25', '2016-09-01', 3);
INSERT INTO actions (school_id, posted_date, posted_time, poster_id, task_date, task_time, task_description, task_start_date, task_due_date, task_status)
VALUES (11, '2016-08-25', '11:00:00.000', 1001, '2016-08-25', '11:30:03.000', 'Presentación de trabajos artísticos', '2016-08-25', '2016-09-01', 3);





SELECT * FROM actions;

DROP TABLE actions;
