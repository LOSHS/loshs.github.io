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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
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
  `stars_total` int(10) unsigned NOT NULL,
  `stars_users` int(10) unsigned NOT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id_UNIQUE` (`comment_id`),
  KEY `parentpost_idx` (`parentpost_id`),
  KEY `comment_timestamp_idx` (`comment_timestamp`),
  KEY `commenterid_idx` (`commenter_id`),
  KEY `comment_starstotal_idx` (`stars_total`),
  KEY `comment_starsusers_idx` (`stars_users`),
  FULLTEXT KEY `commentcontent_idx` (`content`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
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
  `position` varchar(45) DEFAULT NULL,
  `rol` varchar(45) NOT NULL,
  `status` int(11) NOT NULL,
  `register_date` date DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `user_mail` varchar(45) DEFAULT NULL,
  `reputation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `users_id_UNIQUE` (`user_id`),
  UNIQUE KEY `user_code_UNIQUE` (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Labra','Aguilar','Hugo','Daniel','LAAH000000XXX','$2a$10$8WJvJSaPEkLIN46f2nOgaeH3u/QfqCFpgg0wGuHGKkfENQqpg.0PK',NULL,'11','Director','Directivo',1,'2016-08-30','2020-01-01','hugo@loshs.com','5'),(2,'Herrera','Perez','Hector',NULL,'HEPH000000XXX','$2a$10$byrbl/IC/btdQzox49UPZOkN2UkhAyBg0NKYNvG8NyHGyr7zFv892',NULL,'11','Superadmin','Superadmin',1,'2016-08-30','2020-01-01','hector@loshs.com','5'),(3,'Perez','Ramirez','Hector','Giovanni','PERH000000XXX','$2a$10$ldUg6OCrrcd3wlI80w6YJ.sg7PLFdu.zOA4QLmmEefnFmWoI05FS2',NULL,'12','Director','Directivo',1,'2016-08-30','2020-01-01','gio@loshs.com','5'),(4,'Kurata','Hernandez','Mari','Kimi','KUHM000000XXX','$2a$10$Bixa/fJFZ5vzRPuhHcoqAuq6E/DKL.numA.cVbBiQ40uB9cY2JVjy',NULL,'12','Subirector','Directivo',1,'2016-08-30','2020-01-01','kimi@loshs.com','5');
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

-- Dump completed on 2016-09-10 21:33:54
