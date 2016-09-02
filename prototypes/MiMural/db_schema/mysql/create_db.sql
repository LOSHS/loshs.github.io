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
  UNIQUE KEY `users_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Labra','Aguilar','Hugo','Daniel','LAAH000000XXX','$2a$10$8WJvJSaPEkLIN46f2nOgaeH3u/QfqCFpgg0wGuHGKkfENQqpg.0PK',NULL,'11','Director','Directivo',1,'2016-08-30','2020-01-01','hugo@loshs.com','5'),(2,'Herrera','Perez','Hector',NULL,'HEPH000000XXX','$2a$10$byrbl/IC/btdQzox49UPZOkN2UkhAyBg0NKYNvG8NyHGyr7zFv892',NULL,'12','Director','Directivo',1,'2016-08-30','2020-01-01','hector@loshs.com','5'),(3,'Perez','Ramirez','Hector','Giovanni','PERH000000XXX','$2a$10$ldUg6OCrrcd3wlI80w6YJ.sg7PLFdu.zOA4QLmmEefnFmWoI05FS2',NULL,'11','Subirector','Directivo',1,'2016-08-30','2020-01-01','gio@loshs.com','5'),(4,'Kurata','Hernandez','Mari','Kimi','KUHM000000XXX','$2a$10$Bixa/fJFZ5vzRPuhHcoqAuq6E/DKL.numA.cVbBiQ40uB9cY2JVjy',NULL,'12','Subirector','Directivo',1,'2016-08-30','2020-01-01','kimi@loshs.com','5');
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

-- Dump completed on 2016-09-02  1:12:27
