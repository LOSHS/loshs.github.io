CREATE DATABASE  IF NOT EXISTS `mi_mural` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mi_mural`;
-- MySQL dump 10.13  Distrib 5.6.28, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: mi_mural
-- ------------------------------------------------------
-- Server version	5.7.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actions`
--

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actions` (
  `action_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `school_id` int(10) unsigned NOT NULL,
  `action_timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `poster_id` bigint(20) unsigned NOT NULL,
  `title` varchar(400) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `problem` varchar(2000) DEFAULT NULL,
  `goal` varchar(2000) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `results` varchar(2000) DEFAULT NULL,
  `category` tinyint(1) unsigned NOT NULL,
  `stars_total` int(10) unsigned NOT NULL DEFAULT '0',
  `stars_users` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`action_id`),
  UNIQUE KEY `action_id_UNIQUE` (`action_id`),
  KEY `schoolid_idx` (`school_id`),
  KEY `posterid_idx` (`poster_id`),
  KEY `actiontimestamp_idx` (`action_timestamp`),
  KEY `duedate_idx` (`due_date`),
  KEY `status_idx` (`status`),
  KEY `category_idx` (`category`),
  KEY `starstotal_idx` (`stars_total`),
  KEY `starsusers_idx` (`stars_users`),
  FULLTEXT KEY `title_idx` (`title`),
  FULLTEXT KEY `description_idx` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,1,'2016-08-05 15:16:40.120705',1,'Paseos mensuales','Esta actividad servirá para unir al grupo de 3B del turno matutino, permitirá crear lazos entre los alumnos y conocerse más a fondo, esto con el fin...',NULL,NULL,NULL,NULL,1,'5 papás reportan que sus hijos han pedido permiso para invitar compañeros de su grupo',1,5,2),(2,1,'2016-09-11 19:27:28.977513',4,'Mejora de divisiones','Esta actividad tiene como proposito desarrollar en el alumno habilidades para dividir y mejorar sus calificaciones en la prueba que realizamos ante la sep para...',NULL,NULL,NULL,NULL,1,'71 % de los alumnos son capaces de realizar divisiones de dos cifras',2,10,4);
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actionsstars_peruser`
--

DROP TABLE IF EXISTS `actionsstars_peruser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actionsstars_peruser` (
  `actionid` bigint(20) unsigned NOT NULL,
  `userid` bigint(20) unsigned NOT NULL,
  `stars_given` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`actionid`,`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actionsstars_peruser`
--

LOCK TABLES `actionsstars_peruser` WRITE;
/*!40000 ALTER TABLE `actionsstars_peruser` DISABLE KEYS */;
INSERT INTO `actionsstars_peruser` VALUES (1,1,4),(1,3,1),(2,1,3),(2,2,1),(2,3,1),(2,4,5);
/*!40000 ALTER TABLE `actionsstars_peruser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `comment_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `parentpost_id` bigint(20) unsigned NOT NULL,
  `comment_timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `commenter_id` bigint(20) unsigned NOT NULL,
  `content` varchar(2000) NOT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id_UNIQUE` (`comment_id`),
  KEY `parentpost_idx` (`parentpost_id`),
  KEY `comment_timestamp_idx` (`comment_timestamp`),
  KEY `commenterid_idx` (`commenter_id`),
  FULLTEXT KEY `commentcontent_idx` (`content`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,'2016-09-11 03:05:42.568075',2,'Claro que sí amigo, yo te apoyo!'),(2,1,'2016-09-11 03:05:42.570352',4,'¡De acuerdo!'),(3,1,'2016-09-11 03:05:42.570953',3,'OK'),(4,1,'2016-09-11 04:48:14.704108',1,'Perfecto!'),(5,2,'2016-09-11 04:51:13.500585',1,'Solo falta decidir la fecha amigo');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `post_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `school_id` int(10) unsigned NOT NULL,
  `post_timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `poster_id` bigint(20) unsigned NOT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `photo` blob,
  `stars_total` int(10) unsigned NOT NULL DEFAULT '0',
  `stars_users` int(10) unsigned NOT NULL DEFAULT '0',
  `category` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id_UNIQUE` (`post_id`),
  KEY `school_id_idx` (`school_id`),
  KEY `poster_id_idx` (`poster_id`),
  KEY `post_timestamp_idx` (`post_timestamp`),
  KEY `stars_total_idx` (`stars_total`),
  KEY `stars_users_idx` (`stars_users`),
  KEY `category_idx` (`category`),
  FULLTEXT KEY `content_idx` (`content`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'2016-09-11 03:30:39.342368',1,'Compañeros, cómo ven? Estaba pensando que podríamos realizar un convivio en mi casa para que nuestros hijos se conozcan más y evitemos cualquier comportamiento de bullying que pueda existir, yo puedo poner un terreno, nos podemos cooperar para rentar unos inflables y ponerlos y una carnita asada.',NULL,9,2,1),(2,1,'2016-09-11 04:09:28.256168',2,'¿Oigan entonces cuando quedó lo de la carne asada?',NULL,0,0,1),(3,1,'2016-09-11 05:04:58.535696',4,'Ya quiero que sea la carne asada!',NULL,0,0,1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postsstars_peruser`
--

DROP TABLE IF EXISTS `postsstars_peruser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `postsstars_peruser` (
  `postid` bigint(20) unsigned NOT NULL,
  `userid` bigint(20) unsigned NOT NULL,
  `stars_given` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`postid`,`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postsstars_peruser`
--

LOCK TABLES `postsstars_peruser` WRITE;
/*!40000 ALTER TABLE `postsstars_peruser` DISABLE KEYS */;
INSERT INTO `postsstars_peruser` VALUES (1,1,5),(1,2,4);
/*!40000 ALTER TABLE `postsstars_peruser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `task_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parentaction_id` bigint(20) unsigned NOT NULL,
  `timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `ownerid` bigint(20) unsigned NOT NULL,
  `description` varchar(2000) NOT NULL,
  `startdate` date DEFAULT NULL,
  `duedate` date DEFAULT NULL,
  `status` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`task_id`),
  UNIQUE KEY `task_id_UNIQUE` (`task_id`),
  KEY `parentaction_idx` (`parentaction_id`),
  KEY `timestamp_idx` (`timestamp`),
  KEY `owner_idx` (`ownerid`),
  KEY `startdate_idx` (`startdate`),
  KEY `duedate_idx` (`duedate`),
  KEY `status_idx` (`status`),
  FULLTEXT KEY `description_idx` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,1,'2016-09-11 19:21:42.000045',1,'Salida al boliche',NULL,NULL,1),(2,1,'2016-09-11 19:21:42.002159',1,'Salida a otro estado',NULL,NULL,1),(3,1,'2016-09-11 19:21:42.002576',1,'Presentación de trabajos artísticos',NULL,NULL,1),(4,2,'2016-09-11 19:28:32.376422',4,'Realizar divisiones de 1 cifra',NULL,NULL,1),(5,2,'2016-09-11 19:28:32.376422',4,'Realizar ejemplos usando objetos cotidianos',NULL,NULL,1),(6,2,'2016-09-11 19:28:32.376422',4,'Realizar divisiones de 2 cifras',NULL,NULL,1),(7,2,'2016-09-11 19:28:32.376422',4,'Realizar problemas razonados de divisiones',NULL,NULL,1),(8,2,'2016-09-11 19:28:32.376422',4,'Realizar divisiones de 3 cifras',NULL,NULL,1),(9,2,'2016-09-11 19:28:32.376422',4,'Explicar la similitud con la operacion de multiplicacion',NULL,NULL,1);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `father_lastname` varchar(45) NOT NULL,
  `mother_lastname` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) NOT NULL,
  `middle_names` varchar(45) DEFAULT NULL,
  `user_code` varchar(45) NOT NULL,
  `password_hash` varchar(70) NOT NULL,
  `user_photo` blob,
  `user_cct` varchar(45) DEFAULT NULL,
  `rol` varchar(45) NOT NULL,
  `status` int(11) NOT NULL,
  `register_date` date DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `user_mail` varchar(45) DEFAULT NULL,
  `reputation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `users_id_UNIQUE` (`user_id`),
  UNIQUE KEY `user_code_UNIQUE` (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Labra','Aguilar','Hugo','Daniel','LAAH000000XXX','$2a$10$X28.6hLDPTvhjw2L.NW7K.33vvC8WaL5sHD0Fz13YtnIHGRxJpsVS',NULL,'1','Director',1,'2016-08-30','2020-01-01','hugo@loshs.com','5'),(2,'Herrera','Perez','Hector',NULL,'HEPH000000XXX','$2a$10$9ALDis7VYIw7QkWZM3M.Nu77hkRjHgsxKr3FTa00f/CvNvyxp.hPq',NULL,'1','Super Administrador',1,'2016-08-30','2020-01-01','hector@loshs.com','5'),(3,'Perez','Ramirez','Hector','Giovanni','PERH000000XXX','$2a$10$Kh/f54aGivz67M7SJJTV1O2r1liStdlzc5/E0JJpstYMnATxt.7q6',NULL,'1','Padre de familia',1,'2016-08-30','2020-01-01','gio@loshs.com','5'),(4,'Kurata','Hernandez','Mari','Kimi','KUHM000000XXX','$2a$10$0sc0iT9Dn4vPpyyTIY7obuXyXrTfRsYk3SCX8qZnEhp6cqjw88LBK',NULL,'1','Docente',1,'2016-08-30','2020-01-01','kimi@loshs.com','5'),(5,'Renteria','Guevara','Cynthia','Mireya','REGC000000XXX','$2a$10$qmUiVhuzydLA1HlyF2i.bO3GJ9VgH/qg7JFI89d1MKoP76cmTGyHG',NULL,'1','Tester',1,'2016-08-30','2020-01-01','','5');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-14  0:05:18
