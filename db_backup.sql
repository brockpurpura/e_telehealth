-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: telehealth_production
-- ------------------------------------------------------
-- Server version	5.7.18

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
  `encrypted_password` varchar(255) NOT NULL DEFAULT '',
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_sent_at` datetime DEFAULT NULL,
  `remember_created_at` datetime DEFAULT NULL,
  `sign_in_count` int(11) NOT NULL DEFAULT '0',
  `current_sign_in_at` datetime DEFAULT NULL,
  `last_sign_in_at` datetime DEFAULT NULL,
  `current_sign_in_ip` varchar(255) DEFAULT NULL,
  `last_sign_in_ip` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `approved` int(11) DEFAULT '1',
  `authorized` int(11) DEFAULT '0',
  `role_type` int(11) DEFAULT '1',
  `client_id` int(11) DEFAULT NULL,
  `client_admin_id` int(11) DEFAULT NULL,
  `invitation_token` varchar(255) DEFAULT NULL,
  `invitation_created_at` datetime DEFAULT NULL,
  `invitation_sent_at` datetime DEFAULT NULL,
  `invitation_accepted_at` datetime DEFAULT NULL,
  `invitation_limit` int(11) DEFAULT NULL,
  `invited_by_type` varchar(255) DEFAULT NULL,
  `invited_by_id` bigint(20) DEFAULT NULL,
  `invitations_count` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_admins_on_email` (`email`),
  UNIQUE KEY `index_admins_on_reset_password_token` (`reset_password_token`),
  UNIQUE KEY `index_admins_on_invitation_token` (`invitation_token`),
  KEY `index_admins_on_invited_by_type_and_invited_by_id` (`invited_by_type`,`invited_by_id`),
  KEY `index_admins_on_invitations_count` (`invitations_count`),
  KEY `index_admins_on_invited_by_id` (`invited_by_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'jschell@incubate.pro','$2a$10$nFKOi/.AGwo7zN9G22/Dm.lOMhIKTkQoANDRIrBX1G1Uj1i9stzlu',NULL,NULL,NULL,37,'2017-06-19 23:23:33','2017-06-19 23:07:40','96.242.88.89','96.242.88.89','2017-02-06 19:27:41','2017-06-19 23:23:33',1,1,3,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(3,'admin@univago.com','$2a$10$Olf26SZXNEZ8v7661Qgcr.oSeJIwJOQyIGcJdTsypcjNtWas28oJe',NULL,NULL,NULL,10,'2017-05-22 23:26:39','2017-05-16 16:35:08','::1','::1','2017-05-09 11:43:52','2017-05-22 23:26:39',1,1,2,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(4,'tech@univago.com','$2a$10$T3moQR8hYnJBmbAO5MUaKe5s.bUzszrcaO0t1TFhCWVAm89x.lgFe',NULL,NULL,NULL,26,'2017-06-16 14:48:19','2017-06-16 14:41:24','174.199.18.34','96.242.88.89','2017-05-09 16:27:17','2017-06-16 14:48:19',1,1,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(5,'jcuster@yorktel.com','$2a$10$T3moQR8hYnJBmbAO5MUaKe5s.bUzszrcaO0t1TFhCWVAm89x.lgFe',NULL,NULL,NULL,28,'2017-06-19 20:39:45','2017-06-19 18:51:16','75.99.97.222','75.99.97.222','2017-05-09 16:27:17','2017-06-19 20:39:45',1,1,0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(16,'jschell18+admin@gmail.com','$2a$10$iqQD0aYlX.gi0RNX8qfhhenVKS1TQHf1EjvCPasNjDwMvpBY/InF2',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'2017-06-15 15:26:06','2017-06-15 15:26:06',1,1,1,1,NULL,'980606f6054eadbfa38c3a6ce635cd11f27c58d96b28c032e4ab9374b910dc4e','2017-06-15 15:26:06','2017-06-15 15:26:06',NULL,NULL,NULL,NULL,0),(17,'jschell+tech@incubate.pro','$2a$10$7kzrdlMnztDuy7T1Cko1NeXB21bUleSJWpRUkzxDvl0oiQkNLmDZa',NULL,NULL,NULL,1,'2017-06-19 19:09:37','2017-06-19 19:09:37','75.99.97.222','75.99.97.222','2017-06-19 19:09:02','2017-06-19 19:09:37',1,1,0,1,NULL,NULL,'2017-06-19 19:09:02','2017-06-19 19:09:02','2017-06-19 19:09:37',NULL,NULL,NULL,0),(18,'jschell+phillips@incubate.pro','$2a$10$WLuxE//8kU9XUL8MSwllluDkB5tGnV.//jbzJs0ET/2bL69NsRKLO',NULL,NULL,NULL,1,'2017-06-19 23:23:23','2017-06-19 23:23:23','96.242.88.89','96.242.88.89','2017-06-19 23:08:37','2017-06-19 23:23:23',1,1,2,NULL,2,NULL,'2017-06-19 23:08:37','2017-06-19 23:08:37','2017-06-19 23:23:23',NULL,NULL,NULL,0),(19,'jschell+phillips2@incubate.pro','$2a$10$zidYCYUCBRb5JC8Af6OQJeeUj67EwPYVkcAj66tlrSrq00v2mMhKy',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'2017-06-19 23:37:37','2017-06-19 23:37:37',1,1,1,2,NULL,'71a649f611f940dcf7b9815622907c4c63bf034eabaf0b4c90135b5cebb02855','2017-06-19 23:37:37','2017-06-19 23:37:37',NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alert_frequencies`
--

DROP TABLE IF EXISTS `alert_frequencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alert_frequencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `endpoint_id` int(11) DEFAULT NULL,
  `a_last_call` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alert_frequencies`
--

LOCK TABLES `alert_frequencies` WRITE;
/*!40000 ALTER TABLE `alert_frequencies` DISABLE KEYS */;
INSERT INTO `alert_frequencies` VALUES (1,6,'2017-04-28 18:29:33','2017-04-28 18:28:37','2017-04-28 18:29:33'),(2,9,'2017-05-09 18:45:55','2017-05-09 18:45:55','2017-05-09 18:45:55'),(3,16,'2017-06-15 21:11:26','2017-06-15 21:11:26','2017-06-15 21:11:26'),(4,17,'2017-06-16 14:24:41','2017-06-16 14:22:33','2017-06-16 14:24:41');
/*!40000 ALTER TABLE `alert_frequencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_keys`
--

DROP TABLE IF EXISTS `api_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_keys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password_digest` varchar(255) DEFAULT NULL,
  `elert_callback` varchar(255) DEFAULT NULL,
  `hangup_callback` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_keys`
--

LOCK TABLES `api_keys` WRITE;
/*!40000 ALTER TABLE `api_keys` DISABLE KEYS */;
INSERT INTO `api_keys` VALUES (2,1,'mercy','$2a$10$SpNw/TJSt38C0C4OA/LHcezMljoSggZtd.KqYVAFnz1ZTVIRl.fDe',NULL,NULL,'2017-05-10 13:05:58','2017-05-10 13:05:58');
/*!40000 ALTER TABLE `api_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ar_internal_metadata`
--

DROP TABLE IF EXISTS `ar_internal_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ar_internal_metadata` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ar_internal_metadata`
--

LOCK TABLES `ar_internal_metadata` WRITE;
/*!40000 ALTER TABLE `ar_internal_metadata` DISABLE KEYS */;
INSERT INTO `ar_internal_metadata` VALUES ('environment','production','2017-05-25 19:50:26','2017-06-05 20:09:18');
/*!40000 ALTER TABLE `ar_internal_metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookmarks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `endpoint_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `internal_name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarks`
--

LOCK TABLES `bookmarks` WRITE;
/*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
INSERT INTO `bookmarks` VALUES (59,6,1,'clock','8dce03350e6d','2017-06-12 21:28:53','2017-06-12 21:28:53');
/*!40000 ALTER TABLE `bookmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buildings`
--

DROP TABLE IF EXISTS `buildings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buildings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buildings`
--

LOCK TABLES `buildings` WRITE;
/*!40000 ALTER TABLE `buildings` DISABLE KEYS */;
INSERT INTO `buildings` VALUES (1,'Yorktel',NULL,NULL,NULL,NULL,NULL,'2017-01-01 00:00:00','2017-01-01 00:00:00',1),(2,'Baltimore','','','','','','2017-06-19 18:45:32','2017-06-19 18:45:32',2);
/*!40000 ALTER TABLE `buildings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_admins`
--

DROP TABLE IF EXISTS `client_admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client_admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_admins`
--

LOCK TABLES `client_admins` WRITE;
/*!40000 ALTER TABLE `client_admins` DISABLE KEYS */;
INSERT INTO `client_admins` VALUES (1,'Yorktel Admin',1,'2016-01-01 00:00:00','2016-01-01 00:00:00'),(2,'Phillips',1,'2017-06-19 23:08:05','2017-06-19 23:08:05');
/*!40000 ALTER TABLE `client_admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `client_admin_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Yorktel',1,'2017-01-01 00:00:00','2017-01-01 00:00:00',1),(2,'Phillips',1,'2017-06-19 23:37:17','2017-06-19 23:37:17',2);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configurables`
--

DROP TABLE IF EXISTS `configurables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configurables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_configurables_on_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configurables`
--

LOCK TABLES `configurables` WRITE;
/*!40000 ALTER TABLE `configurables` DISABLE KEYS */;
INSERT INTO `configurables` VALUES (2,'test_tunnel','https://582be616.ngrok.io','2017-02-16 15:02:18','2017-02-16 15:02:18'),(3,'vmr_on_deck_amount','50','2017-02-16 15:02:18','2017-02-16 15:02:18'),(4,'pexip_api_base_url','192.188.0.66','2017-02-16 15:02:18','2017-02-16 15:02:18'),(5,'server_tag','nahcs','2017-02-16 15:02:18','2017-02-16 15:02:18'),(6,'server_name','healthcare.univago.com:8443','2017-02-16 15:02:18','2017-02-16 15:02:18'),(7,'pexip_api_username','svc-healthcare','2017-02-16 15:02:18','2017-02-16 15:02:18'),(8,'pexip_api_password','H3a!thcare','2017-02-16 15:02:18','2017-02-16 15:02:18');
/*!40000 ALTER TABLE `configurables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delayed_jobs`
--

DROP TABLE IF EXISTS `delayed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delayed_jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `priority` int(11) NOT NULL DEFAULT '0',
  `attempts` int(11) NOT NULL DEFAULT '0',
  `handler` text NOT NULL,
  `last_error` text,
  `run_at` datetime DEFAULT NULL,
  `locked_at` datetime DEFAULT NULL,
  `failed_at` datetime DEFAULT NULL,
  `locked_by` varchar(255) DEFAULT NULL,
  `queue` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `delayed_jobs_priority` (`priority`,`run_at`)
) ENGINE=InnoDB AUTO_INCREMENT=1349 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delayed_jobs`
--

LOCK TABLES `delayed_jobs` WRITE;
/*!40000 ALTER TABLE `delayed_jobs` DISABLE KEYS */;
INSERT INTO `delayed_jobs` VALUES (1348,0,0,'--- !ruby/struct:VmrMonitor\ndesc: run vmr\n',NULL,'2017-05-21 20:30:01',NULL,NULL,NULL,NULL,'2017-05-21 20:20:01','2017-05-21 20:20:01');
/*!40000 ALTER TABLE `delayed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endpoint_statuses`
--

DROP TABLE IF EXISTS `endpoint_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `endpoint_statuses` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `endpoint_id` int(11) DEFAULT NULL,
  `connect_good` int(11) DEFAULT '0',
  `camera_good` int(11) DEFAULT '0',
  `usb0_good` int(11) DEFAULT '0',
  `usb1_good` int(11) DEFAULT '0',
  `in_a_call` int(11) DEFAULT '0',
  `configured` int(11) DEFAULT '0',
  `update_freq` int(11) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `configured_date` datetime DEFAULT NULL,
  `last_update_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endpoint_statuses`
--

LOCK TABLES `endpoint_statuses` WRITE;
/*!40000 ALTER TABLE `endpoint_statuses` DISABLE KEYS */;
INSERT INTO `endpoint_statuses` VALUES (1,6,0,1,1,1,0,1,2,'1.0',NULL,'2017-06-20 00:08:28','2017-06-15 15:19:44','2017-06-20 00:08:28'),(2,16,0,1,1,1,0,1,2,'1.0',NULL,'2017-06-16 16:44:13','2017-06-15 15:41:03','2017-06-16 16:44:13'),(3,17,0,0,1,1,0,1,2,'1.0',NULL,'2017-06-16 17:39:28','2017-06-16 14:23:26','2017-06-16 17:39:28'),(4,18,0,1,1,1,0,1,2,'1.0',NULL,'2017-06-20 00:06:52','2017-06-17 12:10:40','2017-06-20 00:06:52');
/*!40000 ALTER TABLE `endpoint_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endpoint_to_users`
--

DROP TABLE IF EXISTS `endpoint_to_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `endpoint_to_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `endpoint_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endpoint_to_users`
--

LOCK TABLES `endpoint_to_users` WRITE;
/*!40000 ALTER TABLE `endpoint_to_users` DISABLE KEYS */;
INSERT INTO `endpoint_to_users` VALUES (1,1,2,1,'2017-01-01 00:00:00','2017-01-01 00:00:00'),(2,1,3,1,'2017-01-01 00:00:00','2017-01-01 00:00:00'),(3,1,6,1,'2017-01-01 00:00:00','2017-01-01 00:00:00'),(4,1,16,1,'2017-01-01 00:00:00','2017-01-01 00:00:00'),(5,1,17,1,'2017-01-01 00:00:00','2017-01-01 00:00:00'),(6,1,15,1,'2017-01-01 00:00:00','2017-01-01 00:00:00'),(7,1,18,1,'2017-01-01 00:00:00','2017-01-01 00:00:00'),(8,5,16,1,'2017-01-01 00:00:00','2017-01-01 00:00:00'),(9,6,17,1,'2017-01-01 00:00:00','2017-01-01 00:00:00'),(10,6,18,1,'2017-01-01 00:00:00','2017-01-01 00:00:00'),(11,6,19,1,'2017-01-01 00:00:00','2017-01-01 00:00:00');
/*!40000 ALTER TABLE `endpoint_to_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endpoints`
--

DROP TABLE IF EXISTS `endpoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `endpoints` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `protocol` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `pin` int(11) DEFAULT NULL,
  `endpoint_type` varchar(255) DEFAULT NULL,
  `tunnel` varchar(255) DEFAULT NULL,
  `machine_name` varchar(255) DEFAULT NULL,
  `local_ip` varchar(255) DEFAULT NULL,
  `under_maintenance` int(11) DEFAULT '0',
  `conference_node` varchar(255) DEFAULT NULL,
  `default_input` float DEFAULT '6',
  `default_output` float DEFAULT '5',
  `show_icr` int(11) DEFAULT '1',
  `show_camera` int(11) DEFAULT '1',
  `allow_privacy` int(11) DEFAULT '1',
  `elert_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endpoints`
--

LOCK TABLES `endpoints` WRITE;
/*!40000 ALTER TABLE `endpoints` DISABLE KEYS */;
INSERT INTO `endpoints` VALUES (6,1,'Lab-AIO',NULL,NULL,'2017-01-01 00:00:00','2017-01-01 00:00:00',2222,'SONY','','labaio',NULL,0,'proxy.univago.com',6,5,1,1,1,NULL),(16,2,'1','','','2017-06-15 15:26:29','2017-06-15 15:26:29',1726,'SONY',NULL,'hJyB7LdyBBI',NULL,0,'proxy.univago.com',6,5,1,1,1,NULL),(17,1,'Test Alpha 2','','','2017-06-15 15:27:06','2017-06-15 15:27:06',82657764,'SONY',NULL,'8hxgw5MBdgw',NULL,0,'proxy.univago.com',6,5,1,1,1,NULL),(18,1,'Test Alpha 3','','','2017-06-16 18:56:24','2017-06-16 18:56:24',65379288,'SONY',NULL,'DeZioi45Ls',NULL,0,'proxy.univago.com',6,5,1,1,1,NULL),(19,1,'Test Alpha 4','','','2017-06-16 18:56:30','2017-06-16 18:56:30',45065980,'SONY',NULL,'O-JkTFzysWQ',NULL,0,'proxy.univago.com',6,5,1,1,1,NULL);
/*!40000 ALTER TABLE `endpoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `icons`
--

DROP TABLE IF EXISTS `icons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `icons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `banner_color` varchar(255) DEFAULT NULL,
  `font_color` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `client_admin_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `icons`
--

LOCK TABLES `icons` WRITE;
/*!40000 ALTER TABLE `icons` DISABLE KEYS */;
INSERT INTO `icons` VALUES (1,NULL,NULL,1,1,'red','blue','2017-05-25 19:03:11','2017-05-25 19:03:11',NULL),(2,NULL,NULL,NULL,1,'yellow','green','2017-05-25 19:08:19','2017-05-25 19:08:19',1),(3,NULL,NULL,NULL,1,'yellow','green','2017-05-25 19:09:29','2017-05-25 19:09:29',2);
/*!40000 ALTER TABLE `icons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,1,'Eatontown',NULL,NULL,NULL,NULL,NULL,'2017-01-01 00:00:00','2017-01-10 00:00:00'),(2,2,'Phillips','','','','','','2017-06-19 18:45:20','2017-06-19 18:45:20');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `endpoint_id` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `room_info` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `answered_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (3,1,16,'ALERT - Emergency call request from Yorktel - Room 2156 - Test Alpha  [June 15, 2017 17:11:26 -04:00]','Yorktel - Room 2156 - Test Alpha',0,'2017-06-15 21:11:26','2017-06-15 21:21:28',1),(4,1,17,'ALERT - Emergency call request from Yorktel - Room 2156 - Test Alpha 2  [June 16, 2017 10:22:33 -04:00]','Yorktel - Room 2156 - Test Alpha 2',0,'2017-06-16 14:22:33','2017-06-16 14:22:34',1),(5,1,17,'ALERT - Emergency call request from Yorktel - Room 2156 - Test Alpha 2  [June 16, 2017 10:23:25 -04:00]','Yorktel - Room 2156 - Test Alpha 2',0,'2017-06-16 14:23:25','2017-06-16 14:23:31',1),(6,1,17,'ALERT - Emergency call request from Yorktel - Room 2156 - Test Alpha 2  [June 16, 2017 10:24:41 -04:00]','Yorktel - Room 2156 - Test Alpha 2',0,'2017-06-16 14:24:41','2017-06-16 14:24:43',1),(7,1,6,'Alert - Jen\'s notification','Alert - Jen\'s notification',0,'2017-06-16 14:24:41','2017-06-16 14:24:41',NULL);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `building_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,1,'2156','2017-01-01 00:00:00','2017-01-01 00:00:00'),(2,2,'Lab','2017-06-19 18:45:40','2017-06-19 18:45:40');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20170130180450'),('20170130180702'),('20170130180710'),('20170130180714'),('20170130180723'),('20170130202400'),('20170131163123'),('20170202184447'),('20170202184451'),('20170203145420'),('20170221204230'),('20170224180048'),('20170304191025'),('20170308171217'),('20170311171946'),('20170313214639'),('20170316193149'),('20170326174127'),('20170424162510'),('20170424162520'),('20170424163255'),('20170428180347'),('20170504155715'),('20170505182748'),('20170505182813'),('20170507151133'),('20170509193930'),('20170511145152'),('20170520183554'),('20170525194736'),('20170605121529'),('20170613214753'),('20170613215200'),('20170615210210'),('20170617122825'),('20170619191811');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `volume` int(11) DEFAULT NULL,
  `brightness` int(11) DEFAULT NULL,
  `speed` int(11) DEFAULT NULL,
  `privacy` int(11) DEFAULT NULL,
  `announce` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_phones`
--

DROP TABLE IF EXISTS `user_phones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_phones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `cell_phone` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_phones`
--

LOCK TABLES `user_phones` WRITE;
/*!40000 ALTER TABLE `user_phones` DISABLE KEYS */;
INSERT INTO `user_phones` VALUES (1,1,'+17329783827','2017-01-01 00:00:00','2017-01-01 00:00:00');
/*!40000 ALTER TABLE `user_phones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
  `encrypted_password` varchar(255) NOT NULL DEFAULT '',
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_sent_at` datetime DEFAULT NULL,
  `remember_created_at` datetime DEFAULT NULL,
  `sign_in_count` int(11) NOT NULL DEFAULT '0',
  `current_sign_in_at` datetime DEFAULT NULL,
  `last_sign_in_at` datetime DEFAULT NULL,
  `current_sign_in_ip` varchar(255) DEFAULT NULL,
  `last_sign_in_ip` varchar(255) DEFAULT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `confirmation_sent_at` datetime DEFAULT NULL,
  `unconfirmed_email` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `prefix` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `invitation_token` varchar(255) DEFAULT NULL,
  `invitation_created_at` datetime DEFAULT NULL,
  `invitation_sent_at` datetime DEFAULT NULL,
  `invitation_accepted_at` datetime DEFAULT NULL,
  `invitation_limit` int(11) DEFAULT NULL,
  `invited_by_type` varchar(255) DEFAULT NULL,
  `invited_by_id` bigint(20) DEFAULT NULL,
  `invitations_count` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_email` (`email`),
  UNIQUE KEY `index_users_on_reset_password_token` (`reset_password_token`),
  UNIQUE KEY `index_users_on_invitation_token` (`invitation_token`),
  KEY `index_users_on_invited_by_type_and_invited_by_id` (`invited_by_type`,`invited_by_id`),
  KEY `index_users_on_invitations_count` (`invitations_count`),
  KEY `index_users_on_invited_by_id` (`invited_by_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'doctor@univago.com','$2a$10$Olf26SZXNEZ8v7661Qgcr.oSeJIwJOQyIGcJdTsypcjNtWas28oJe',NULL,NULL,NULL,399,'2017-06-19 20:47:54','2017-06-19 20:21:06','69.132.93.17','75.99.97.222','estULcjdD1ZaScSyKguf','2017-02-07 15:24:48','2017-02-07 15:14:33',NULL,'2017-01-01 00:00:00','2017-06-19 21:27:26','Dr.',NULL,'Schell',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(4,'jschell@incubate.pro','$2a$10$BcZ/MOfgCegHM9yKaYQ8..RUCXY5VmMroaT55tCZaY79pj5YyEvei',NULL,NULL,NULL,2,'2017-06-19 19:16:55','2017-06-19 19:02:44','75.99.97.222','75.99.97.222',NULL,'2017-06-19 19:02:44',NULL,NULL,'2017-06-19 18:41:10','2017-06-19 19:17:00','dr','jen','schell',1,NULL,'2017-06-19 18:41:10','2017-06-19 18:41:10','2017-06-19 19:02:44',NULL,NULL,NULL,0),(5,'jcuster@yorktel.com','$2a$10$Olf26SZXNEZ8v7661Qgcr.oSeJIwJOQyIGcJdTsypcjNtWas28oJe',NULL,NULL,NULL,4,'2017-06-19 20:41:21','2017-06-19 20:19:08','69.132.93.17','75.99.97.222','estULcjdD1ZaScSyKguf','2017-02-07 15:24:48','2017-02-07 15:24:48',NULL,'2017-01-01 00:00:00','2017-06-19 20:47:35','Dr','James','Custer',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(6,'dwg@yorktel.com','$2a$10$G4sYRaNruWKSryWhYGMTr.bcE4dDAo2OaF0187NVWLcwwEBQxfC7m',NULL,NULL,'2017-06-19 20:05:18',2,'2017-06-19 20:05:18','2017-06-19 19:55:49','12.71.134.4','12.71.134.4',NULL,'2017-06-19 19:55:49',NULL,NULL,'2017-06-19 19:52:30','2017-06-19 20:05:18','Dr','David','Galas',1,NULL,'2017-06-19 19:52:30','2017-06-19 19:52:30','2017-06-19 19:55:49',NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_to_clients`
--

DROP TABLE IF EXISTS `users_to_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_to_clients` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_to_clients`
--

LOCK TABLES `users_to_clients` WRITE;
/*!40000 ALTER TABLE `users_to_clients` DISABLE KEYS */;
INSERT INTO `users_to_clients` VALUES (1,5,2,'2017-01-01 00:00:00','2017-01-01 00:00:00');
/*!40000 ALTER TABLE `users_to_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vmrs`
--

DROP TABLE IF EXISTS `vmrs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vmrs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `uri` varchar(255) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `destroyed_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `on_deck` int(11) DEFAULT '1',
  `used_by` int(11) DEFAULT NULL,
  `set_info` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1633 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vmrs`
--

LOCK TABLES `vmrs` WRITE;
/*!40000 ALTER TABLE `vmrs` DISABLE KEYS */;
INSERT INTO `vmrs` VALUES (1413,'hc_76680783_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1260/','hc_76680783_nahcs@univago.com','2017-06-12 21:15:59','2017-06-12 21:02:26','2017-06-12 21:15:59',0,1,1),(1414,'hc_18860019_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1261/','hc_18860019_nahcs@univago.com','2017-06-12 21:16:39','2017-06-12 21:04:44','2017-06-12 21:16:39',0,1,1),(1415,'hc_68537530_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1262/','hc_68537530_nahcs@univago.com','2017-06-12 21:21:37','2017-06-12 21:04:45','2017-06-12 21:21:37',0,1,1),(1416,'hc_49932819_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1263/','hc_49932819_nahcs@univago.com','2017-06-13 12:20:51','2017-06-12 21:04:45','2017-06-13 12:20:51',0,1,1),(1417,'hc_31339120_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1264/','hc_31339120_nahcs@univago.com','2017-06-13 12:20:51','2017-06-12 21:07:07','2017-06-13 12:20:51',0,1,1),(1418,'hc_64963176_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1265/','hc_64963176_nahcs@univago.com','1999-01-01 00:00:00','2017-06-12 21:17:45','2017-06-12 21:27:55',0,1,1),(1419,'hc_33337655_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1266/','hc_33337655_nahcs@univago.com','2017-06-12 21:28:58','2017-06-12 21:19:58','2017-06-12 21:28:58',0,1,1),(1420,'hc_05999835_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1267/','hc_05999835_nahcs@univago.com','2017-06-12 21:30:36','2017-06-12 21:22:07','2017-06-12 21:30:36',0,1,1),(1421,'hc_41294255_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1268/','hc_41294255_nahcs@univago.com','2017-06-12 21:32:11','2017-06-12 21:22:08','2017-06-12 21:32:11',0,1,1),(1422,'hc_06358618_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1269/','hc_06358618_nahcs@univago.com','2017-06-12 21:35:44','2017-06-12 21:28:44','2017-06-12 21:35:44',0,1,1),(1423,'hc_41848542_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1270/','hc_41848542_nahcs@univago.com','2017-06-13 00:03:11','2017-06-12 21:28:45','2017-06-13 00:03:11',0,1,1),(1424,'hc_45493596_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1271/','hc_45493596_nahcs@univago.com','2017-06-13 00:51:14','2017-06-12 21:30:46','2017-06-13 00:51:14',0,1,1),(1425,'hc_01331610_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1272/','hc_01331610_nahcs@univago.com','2017-06-13 00:53:00','2017-06-12 21:32:58','2017-06-13 00:53:00',0,1,1),(1426,'hc_40460173_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1273/','hc_40460173_nahcs@univago.com','2017-06-13 00:58:03','2017-06-12 21:35:13','2017-06-13 00:58:03',0,1,1),(1427,'hc_33323590_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1274/','hc_33323590_nahcs@univago.com','1999-01-01 00:00:00','2017-06-12 21:35:15','2017-06-13 01:01:24',0,1,1),(1428,'hc_90287295_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1275/','hc_90287295_nahcs@univago.com','2017-06-13 12:20:52','2017-06-12 21:35:16','2017-06-13 12:20:52',0,1,1),(1429,'hc_76082100_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1276/','hc_76082100_nahcs@univago.com','1999-01-01 00:00:00','2017-06-12 21:35:18','2017-06-13 01:05:24',0,1,1),(1430,'hc_80291227_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1277/','hc_80291227_nahcs@univago.com','2017-06-13 12:20:52','2017-06-12 21:35:19','2017-06-13 12:20:52',0,1,1),(1431,'hc_38672613_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1278/','hc_38672613_nahcs@univago.com','2017-06-13 12:20:52','2017-06-12 21:35:20','2017-06-13 12:20:52',0,1,1),(1432,'hc_57520227_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1279/','hc_57520227_nahcs@univago.com','2017-06-13 12:20:53','2017-06-12 21:35:21','2017-06-13 12:20:53',0,1,1),(1433,'hc_88422632_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1280/','hc_88422632_nahcs@univago.com','2017-06-13 12:20:53','2017-06-12 21:35:22','2017-06-13 12:20:53',0,1,1),(1434,'hc_20254037_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1281/','hc_20254037_nahcs@univago.com','1999-01-01 00:00:00','2017-06-12 21:35:23','2017-06-13 01:13:45',0,1,1),(1435,'hc_69897134_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1282/','hc_69897134_nahcs@univago.com','2017-06-13 01:17:34','2017-06-12 21:35:23','2017-06-13 01:17:34',0,1,1),(1436,'hc_05716365_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1283/','hc_05716365_nahcs@univago.com','2017-06-13 01:19:15','2017-06-12 21:35:24','2017-06-13 01:19:15',0,1,1),(1437,'hc_72904774_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1284/','hc_72904774_nahcs@univago.com','2017-06-13 02:32:37','2017-06-12 21:35:26','2017-06-13 02:32:37',0,1,1),(1438,'hc_75781844_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1285/','hc_75781844_nahcs@univago.com','2017-06-13 02:34:11','2017-06-12 21:35:27','2017-06-13 02:34:11',0,1,1),(1439,'hc_16385748_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1286/','hc_16385748_nahcs@univago.com','1999-01-01 00:00:00','2017-06-12 21:35:27','2017-06-13 02:35:26',0,1,1),(1440,'hc_49406519_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1287/','hc_49406519_nahcs@univago.com','1999-01-01 00:00:00','2017-06-12 21:35:28','2017-06-13 12:22:46',0,1,1),(1441,'hc_35529676_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1288/','hc_35529676_nahcs@univago.com','2017-06-13 18:39:27','2017-06-12 21:35:29','2017-06-13 18:39:27',0,1,1),(1442,'hc_37340394_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1289/','hc_37340394_nahcs@univago.com','1999-01-01 00:00:00','2017-06-12 21:35:30','2017-06-14 18:59:06',0,1,1),(1443,'hc_54860231_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1290/','hc_54860231_nahcs@univago.com','2017-06-15 15:41:09','2017-06-12 21:35:30','2017-06-15 15:41:09',0,1,1),(1444,'hc_57631649_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1291/','hc_57631649_nahcs@univago.com','2017-06-15 15:33:26','2017-06-12 21:35:32','2017-06-15 15:33:26',0,1,1),(1445,'hc_15250289_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1292/','hc_15250289_nahcs@univago.com','2017-06-15 15:42:30','2017-06-12 21:35:33','2017-06-15 15:42:30',0,1,1),(1446,'hc_32949147_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1293/','hc_32949147_nahcs@univago.com','1999-01-01 00:00:00','2017-06-12 21:35:33','2017-06-15 15:49:02',0,1,1),(1447,'hc_26324083_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1294/','hc_26324083_nahcs@univago.com','2017-06-15 15:50:35','2017-06-12 21:35:34','2017-06-15 15:50:35',0,1,1),(1448,'hc_66416146_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1295/','hc_66416146_nahcs@univago.com','2017-06-15 17:04:42','2017-06-12 21:35:35','2017-06-15 17:04:42',0,1,1),(1449,'hc_52624657_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1296/','hc_52624657_nahcs@univago.com','1999-01-01 00:00:00','2017-06-12 21:35:36','2017-06-15 17:15:56',0,1,1),(1450,'hc_48541158_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1297/','hc_48541158_nahcs@univago.com','2017-06-15 17:26:54','2017-06-12 21:35:37','2017-06-15 17:26:54',0,1,1),(1451,'hc_08580176_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1298/','hc_08580176_nahcs@univago.com','2017-06-15 20:19:46','2017-06-12 21:35:38','2017-06-15 20:19:46',0,1,1),(1452,'hc_76329841_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1299/','hc_76329841_nahcs@univago.com','1999-01-01 00:00:00','2017-06-12 21:35:39','2017-06-15 20:29:07',0,1,1),(1453,'hc_06497907_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1300/','hc_06497907_nahcs@univago.com','2017-06-15 20:31:42','2017-06-12 21:35:40','2017-06-15 20:31:42',0,1,1),(1454,'hc_26416918_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1301/','hc_26416918_nahcs@univago.com','1999-01-01 00:00:00','2017-06-12 21:35:40','2017-06-15 21:21:32',0,1,1),(1455,'hc_39305683_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1302/','hc_39305683_nahcs@univago.com','2017-06-15 21:22:47','2017-06-12 21:35:41','2017-06-15 21:22:47',0,1,1),(1456,'hc_33490109_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1303/','hc_33490109_nahcs@univago.com','2017-06-15 21:24:45','2017-06-12 21:35:42','2017-06-15 21:24:45',0,1,1),(1457,'hc_80883808_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1304/','hc_80883808_nahcs@univago.com','1999-01-01 00:00:00','2017-06-12 21:35:42','2017-06-16 11:10:24',0,1,1),(1458,'hc_71867795_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1305/','hc_71867795_nahcs@univago.com','2017-06-16 11:16:22','2017-06-12 21:35:43','2017-06-16 11:16:22',0,1,1),(1459,'hc_34904389_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1306/','hc_34904389_nahcs@univago.com','2017-06-16 14:22:25','2017-06-12 21:35:44','2017-06-16 14:22:25',0,1,1),(1460,'hc_48660654_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1307/','hc_48660654_nahcs@univago.com','2017-06-16 11:16:49','2017-06-12 21:35:45','2017-06-16 11:16:49',0,1,1),(1461,'hc_34536753_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1308/','hc_34536753_nahcs@univago.com','2017-06-16 11:17:03','2017-06-12 21:35:45','2017-06-16 11:17:03',0,1,1),(1462,'hc_93641171_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1309/','hc_93641171_nahcs@univago.com','2017-06-16 11:17:07','2017-06-12 21:35:46','2017-06-16 11:17:07',0,1,1),(1463,'hc_20477296_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1310/','hc_20477296_nahcs@univago.com','2017-06-16 11:30:03','2017-06-12 21:35:47','2017-06-16 11:30:03',0,1,1),(1464,'hc_93062340_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1311/','hc_93062340_nahcs@univago.com','2017-06-16 14:22:25','2017-06-12 21:35:47','2017-06-16 14:22:25',0,1,1),(1465,'hc_40907234_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1312/','hc_40907234_nahcs@univago.com','2017-06-16 14:22:26','2017-06-12 21:35:48','2017-06-16 14:22:26',0,1,1),(1466,'hc_47795550_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1313/','hc_47795550_nahcs@univago.com','2017-06-16 14:22:26','2017-06-12 21:35:49','2017-06-16 14:22:26',0,1,1),(1467,'hc_77107834_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1314/','hc_77107834_nahcs@univago.com','2017-06-16 14:22:26','2017-06-12 21:35:50','2017-06-16 14:22:26',0,1,1),(1468,'hc_26295050_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1315/','hc_26295050_nahcs@univago.com','2017-06-16 14:22:27','2017-06-12 21:35:51','2017-06-16 14:22:27',0,1,1),(1469,'hc_41498068_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1316/','hc_41498068_nahcs@univago.com','2017-06-16 14:22:27','2017-06-12 21:35:52','2017-06-16 14:22:27',0,1,1),(1470,'hc_18055969_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1317/','hc_18055969_nahcs@univago.com','2017-06-16 14:22:28','2017-06-12 21:35:52','2017-06-16 14:22:28',0,1,1),(1471,'hc_04324130_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1318/','hc_04324130_nahcs@univago.com','2017-06-16 14:22:28','2017-06-12 21:35:53','2017-06-16 14:22:28',0,1,1),(1472,'hc_94510301_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1319/','hc_94510301_nahcs@univago.com','2017-06-16 14:22:29','2017-06-12 21:38:00','2017-06-16 14:22:29',0,1,1),(1473,'hc_46936246_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1320/','hc_46936246_nahcs@univago.com','2017-06-16 14:22:29','2017-06-13 00:03:52','2017-06-16 14:22:29',0,1,1),(1474,'hc_37480276_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1321/','hc_37480276_nahcs@univago.com','2017-06-16 14:22:29','2017-06-13 00:51:47','2017-06-16 14:22:29',0,1,1),(1475,'hc_25273426_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1322/','hc_25273426_nahcs@univago.com','2017-06-16 14:22:30','2017-06-13 00:51:48','2017-06-16 14:22:30',0,1,1),(1476,'hc_29322325_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1323/','hc_29322325_nahcs@univago.com','2017-06-16 11:32:22','2017-06-13 00:59:14','2017-06-16 11:32:22',0,1,1),(1477,'hc_52078704_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1324/','hc_52078704_nahcs@univago.com','2017-06-16 14:22:30','2017-06-13 01:01:25','2017-06-16 14:22:30',0,1,1),(1478,'hc_12461546_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1325/','hc_12461546_nahcs@univago.com','2017-06-16 14:22:30','2017-06-13 01:03:52','2017-06-16 14:22:30',0,1,1),(1479,'hc_99280363_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1326/','hc_99280363_nahcs@univago.com','2017-06-16 14:22:31','2017-06-13 01:03:53','2017-06-16 14:22:31',0,1,1),(1480,'hc_90624772_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1327/','hc_90624772_nahcs@univago.com','2017-06-16 14:22:31','2017-06-13 01:06:13','2017-06-16 14:22:31',0,1,1),(1481,'hc_97677912_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1328/','hc_97677912_nahcs@univago.com','2017-06-16 14:22:32','2017-06-13 01:06:14','2017-06-16 14:22:32',0,1,1),(1482,'hc_10195302_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1329/','hc_10195302_nahcs@univago.com','2017-06-16 14:22:32','2017-06-13 01:06:15','2017-06-16 14:22:32',0,1,1),(1483,'hc_52336337_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1330/','hc_52336337_nahcs@univago.com','2017-06-16 11:38:19','2017-06-13 01:06:16','2017-06-16 11:38:19',0,1,1),(1484,'hc_53781341_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1331/','hc_53781341_nahcs@univago.com','2017-06-16 11:42:03','2017-06-13 01:08:43','2017-06-16 11:42:03',0,1,1),(1485,'hc_58469285_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1332/','hc_58469285_nahcs@univago.com','2017-06-16 14:22:32','2017-06-13 01:17:45','2017-06-16 14:22:32',0,1,1),(1486,'hc_08659242_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1333/','hc_08659242_nahcs@univago.com','2017-06-16 14:22:33','2017-06-13 01:20:15','2017-06-16 14:22:33',0,1,1),(1487,'hc_33348045_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1334/','hc_33348045_nahcs@univago.com','2017-06-16 14:22:33','2017-06-13 01:24:29','2017-06-16 14:22:33',0,1,1),(1488,'hc_57919152_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1335/','hc_57919152_nahcs@univago.com','2017-06-16 14:22:34','2017-06-13 02:35:28','2017-06-16 14:22:34',0,1,1),(1489,'hc_96757859_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1336/','hc_96757859_nahcs@univago.com','2017-06-16 14:22:34','2017-06-13 02:35:29','2017-06-16 14:22:34',0,1,1),(1490,'hc_58425215_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1337/','hc_58425215_nahcs@univago.com','2017-06-16 14:22:34','2017-06-13 12:21:32','2017-06-16 14:22:34',0,1,1),(1491,'hc_61231813_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1338/','hc_61231813_nahcs@univago.com','2017-06-16 14:22:35','2017-06-13 18:40:21','2017-06-16 14:22:35',0,1,1),(1492,'hc_16533969_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1341/','hc_16533969_nahcs@univago.com','2017-06-16 14:22:35','2017-06-14 18:58:04','2017-06-16 14:22:35',0,1,1),(1493,'hc_83039800_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1343/','hc_83039800_nahcs@univago.com','2017-06-16 14:22:36','2017-06-15 15:31:36','2017-06-16 14:22:36',0,1,1),(1494,'hc_38759836_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1344/','hc_38759836_nahcs@univago.com','2017-06-16 14:22:36','2017-06-15 15:33:56','2017-06-16 14:22:36',0,1,1),(1495,'hc_66765898_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1345/','hc_66765898_nahcs@univago.com','2017-06-16 14:22:36','2017-06-15 15:43:02','2017-06-16 14:22:36',0,1,1),(1496,'hc_21604886_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1346/','hc_21604886_nahcs@univago.com','2017-06-16 14:22:37','2017-06-15 15:45:12','2017-06-16 14:22:37',0,1,1),(1497,'hc_41161945_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1347/','hc_41161945_nahcs@univago.com','2017-06-16 14:22:37','2017-06-15 15:50:10','2017-06-16 14:22:37',0,1,1),(1498,'hc_81297329_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1348/','hc_81297329_nahcs@univago.com','2017-06-16 14:22:37','2017-06-15 17:03:30','2017-06-16 14:22:37',0,1,1),(1499,'hc_85691998_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1349/','hc_85691998_nahcs@univago.com','2017-06-16 14:22:38','2017-06-15 17:10:30','2017-06-16 14:22:38',0,1,1),(1500,'hc_44396052_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1350/','hc_44396052_nahcs@univago.com','2017-06-16 14:22:38','2017-06-15 17:28:21','2017-06-16 14:22:38',0,1,1),(1501,'hc_32557499_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1351/','hc_32557499_nahcs@univago.com','2017-06-16 14:22:39','2017-06-15 20:19:11','2017-06-16 14:22:39',0,1,1),(1502,'hc_99701209_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1352/','hc_99701209_nahcs@univago.com','2017-06-16 14:22:39','2017-06-15 20:25:22','2017-06-16 14:22:39',0,1,1),(1503,'hc_23022127_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1353/','hc_23022127_nahcs@univago.com','2017-06-16 14:22:39','2017-06-15 20:29:50','2017-06-16 14:22:39',0,1,1),(1504,'hc_18047156_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1354/','hc_18047156_nahcs@univago.com','2017-06-16 14:22:40','2017-06-15 21:22:14','2017-06-16 14:22:40',0,1,1),(1505,'hc_75725562_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1355/','hc_75725562_nahcs@univago.com','2017-06-16 14:22:40','2017-06-15 21:24:20','2017-06-16 14:22:40',0,1,1),(1506,'hc_49666329_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1356/','hc_49666329_nahcs@univago.com','2017-06-16 14:22:40','2017-06-15 21:26:55','2017-06-16 14:22:40',0,1,1),(1507,'hc_92579962_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1357/','hc_92579962_nahcs@univago.com','2017-06-16 12:16:12','2017-06-16 10:40:25','2017-06-16 12:16:12',0,1,1),(1508,'hc_22088771_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1358/','hc_22088771_nahcs@univago.com','2017-06-16 14:21:48','2017-06-16 11:14:51','2017-06-16 14:21:48',0,1,1),(1509,'hc_82276265_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1359/','hc_82276265_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 11:16:57','2017-06-16 14:23:25',0,1,1),(1510,'hc_73061571_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1360/','hc_73061571_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 11:16:58','2017-06-16 14:24:21',0,1,1),(1511,'hc_21005039_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1361/','hc_21005039_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 11:19:13','2017-06-16 14:24:45',0,1,1),(1512,'hc_36493562_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1362/','hc_36493562_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 11:19:14','2017-06-16 14:31:28',0,1,1),(1513,'hc_33908007_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1363/','hc_33908007_nahcs@univago.com','2017-06-16 14:52:20','2017-06-16 11:27:38','2017-06-16 14:52:20',0,1,1),(1514,'hc_56630933_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1364/','hc_56630933_nahcs@univago.com','2017-06-16 15:14:47','2017-06-16 11:30:03','2017-06-16 15:14:47',0,1,1),(1515,'hc_94935536_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1365/','hc_94935536_nahcs@univago.com','2017-06-16 21:41:54','2017-06-16 11:30:04','2017-06-16 21:41:54',0,1,1),(1516,'hc_82992257_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1366/','hc_82992257_nahcs@univago.com','2017-06-16 18:51:05','2017-06-16 11:30:05','2017-06-16 18:51:05',0,1,1),(1517,'hc_72514620_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1367/','hc_72514620_nahcs@univago.com','2017-06-16 21:41:54','2017-06-16 11:30:06','2017-06-16 21:41:54',0,1,1),(1518,'hc_72531364_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1368/','hc_72531364_nahcs@univago.com','2017-06-16 21:41:55','2017-06-16 11:30:07','2017-06-16 21:41:55',0,1,1),(1519,'hc_56861871_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1369/','hc_56861871_nahcs@univago.com','2017-06-16 18:51:38','2017-06-16 11:30:09','2017-06-16 18:51:38',0,1,1),(1520,'hc_51863636_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1370/','hc_51863636_nahcs@univago.com','2017-06-16 21:41:55','2017-06-16 11:30:11','2017-06-16 21:41:55',0,1,1),(1521,'hc_84649158_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1371/','hc_84649158_nahcs@univago.com','2017-06-16 21:41:56','2017-06-16 11:30:14','2017-06-16 21:41:56',0,1,1),(1522,'hc_55022795_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1372/','hc_55022795_nahcs@univago.com','2017-06-16 21:41:56','2017-06-16 11:30:17','2017-06-16 21:41:56',0,1,1),(1523,'hc_55053334_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1373/','hc_55053334_nahcs@univago.com','2017-06-16 21:41:57','2017-06-16 11:30:20','2017-06-16 21:41:57',0,1,1),(1524,'hc_69674051_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1374/','hc_69674051_nahcs@univago.com','2017-06-16 21:41:57','2017-06-16 11:30:21','2017-06-16 21:41:57',0,1,1),(1525,'hc_04094690_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1375/','hc_04094690_nahcs@univago.com','2017-06-16 21:41:57','2017-06-16 11:30:23','2017-06-16 21:41:57',0,1,1),(1526,'hc_63488812_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1376/','hc_63488812_nahcs@univago.com','2017-06-16 21:41:58','2017-06-16 11:32:38','2017-06-16 21:41:58',0,1,1),(1527,'hc_84366065_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1377/','hc_84366065_nahcs@univago.com','2017-06-16 21:41:58','2017-06-16 11:32:39','2017-06-16 21:41:58',0,1,1),(1528,'hc_56725596_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1378/','hc_56725596_nahcs@univago.com','2017-06-16 21:41:59','2017-06-16 11:32:40','2017-06-16 21:41:59',0,1,1),(1529,'hc_31464372_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1379/','hc_31464372_nahcs@univago.com','2017-06-16 21:41:59','2017-06-16 11:32:42','2017-06-16 21:41:59',0,1,1),(1530,'hc_97764873_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1380/','hc_97764873_nahcs@univago.com','2017-06-16 21:41:59','2017-06-16 11:32:44','2017-06-16 21:41:59',0,1,1),(1531,'hc_46237968_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1381/','hc_46237968_nahcs@univago.com','2017-06-16 21:42:00','2017-06-16 11:32:45','2017-06-16 21:42:00',0,1,1),(1532,'hc_16551324_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1382/','hc_16551324_nahcs@univago.com','2017-06-16 21:42:00','2017-06-16 11:32:46','2017-06-16 21:42:00',0,1,1),(1533,'hc_96805608_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1383/','hc_96805608_nahcs@univago.com','2017-06-16 21:42:01','2017-06-16 11:34:51','2017-06-16 21:42:01',0,1,1),(1534,'hc_89581800_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1384/','hc_89581800_nahcs@univago.com','2017-06-16 21:42:36','2017-06-16 11:34:53','2017-06-16 21:42:36',0,1,1),(1535,'hc_76497361_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1385/','hc_76497361_nahcs@univago.com','2017-06-18 19:30:46','2017-06-16 11:43:48','2017-06-18 19:30:46',0,1,1),(1536,'hc_43989919_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1386/','hc_43989919_nahcs@univago.com','2017-06-18 19:31:43','2017-06-16 11:43:50','2017-06-18 19:31:43',0,1,1),(1537,'hc_83138089_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1387/','hc_83138089_nahcs@univago.com','2017-06-18 19:35:54','2017-06-16 11:43:51','2017-06-18 19:35:54',0,1,1),(1538,'hc_97518877_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1388/','hc_97518877_nahcs@univago.com','2017-06-18 19:42:05','2017-06-16 11:43:52','2017-06-18 19:42:05',0,1,1),(1539,'hc_51537350_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1389/','hc_51537350_nahcs@univago.com','2017-06-18 19:47:50','2017-06-16 11:43:53','2017-06-18 19:47:50',0,1,1),(1540,'hc_23080382_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1390/','hc_23080382_nahcs@univago.com','2017-06-18 19:51:43','2017-06-16 11:43:54','2017-06-18 19:51:43',0,1,1),(1541,'hc_74327179_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1391/','hc_74327179_nahcs@univago.com','2017-06-18 19:53:58','2017-06-16 11:43:55','2017-06-18 19:53:58',0,1,1),(1542,'hc_72568401_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1392/','hc_72568401_nahcs@univago.com','2017-06-18 19:57:38','2017-06-16 11:43:56','2017-06-18 19:57:38',0,1,1),(1543,'hc_74452136_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1393/','hc_74452136_nahcs@univago.com','2017-06-18 19:58:44','2017-06-16 11:43:57','2017-06-18 19:58:44',0,1,1),(1544,'hc_41320848_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1394/','hc_41320848_nahcs@univago.com','2017-06-18 20:04:10','2017-06-16 11:43:57','2017-06-18 20:04:10',0,1,1),(1545,'hc_94425190_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1395/','hc_94425190_nahcs@univago.com','2017-06-18 20:06:20','2017-06-16 12:07:28','2017-06-18 20:06:20',0,1,1),(1546,'hc_85435442_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1396/','hc_85435442_nahcs@univago.com','2017-06-18 20:06:53','2017-06-16 12:07:29','2017-06-18 20:06:53',0,1,1),(1547,'hc_36853491_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1397/','hc_36853491_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 12:09:51','2017-06-18 20:07:11',0,1,1),(1548,'hc_54416084_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1398/','hc_54416084_nahcs@univago.com','2017-06-18 21:07:03','2017-06-16 12:09:52','2017-06-18 21:07:03',0,1,1),(1549,'hc_90250854_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1399/','hc_90250854_nahcs@univago.com','2017-06-18 21:11:22','2017-06-16 12:09:52','2017-06-18 21:11:22',0,1,1),(1550,'hc_32468856_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1400/','hc_32468856_nahcs@univago.com','2017-06-18 21:17:36','2017-06-16 12:09:53','2017-06-18 21:17:36',0,1,1),(1551,'hc_76523084_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1401/','hc_76523084_nahcs@univago.com','2017-06-18 21:18:06','2017-06-16 12:09:54','2017-06-18 21:18:06',0,1,1),(1552,'hc_10903160_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1402/','hc_10903160_nahcs@univago.com','2017-06-18 21:18:29','2017-06-16 12:09:55','2017-06-18 21:18:29',0,1,1),(1553,'hc_66545120_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1403/','hc_66545120_nahcs@univago.com','2017-06-18 21:20:11','2017-06-16 12:09:56','2017-06-18 21:20:11',0,1,1),(1554,'hc_73575784_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1404/','hc_73575784_nahcs@univago.com','2017-06-18 21:20:33','2017-06-16 12:09:56','2017-06-18 21:20:33',0,1,1),(1555,'hc_66985886_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1405/','hc_66985886_nahcs@univago.com','2017-06-18 21:21:04','2017-06-16 12:09:57','2017-06-18 21:21:04',0,1,1),(1556,'hc_53213807_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1406/','hc_53213807_nahcs@univago.com','2017-06-18 21:27:13','2017-06-16 12:09:58','2017-06-18 21:27:13',0,1,1),(1557,'hc_34049245_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1407/','hc_34049245_nahcs@univago.com','2017-06-18 21:28:05','2017-06-16 12:17:15','2017-06-18 21:28:05',0,1,1),(1558,'hc_02121405_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1408/','hc_02121405_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 14:23:12','2017-06-18 21:31:26',0,1,1),(1559,'hc_71407674_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1409/','hc_71407674_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 14:23:14','2017-06-18 21:42:06',0,1,1),(1560,'hc_93444268_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1410/','hc_93444268_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 14:25:28','2017-06-19 01:18:46',0,1,1),(1561,'hc_32113498_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1411/','hc_32113498_nahcs@univago.com','2017-06-19 12:31:24','2017-06-16 14:25:29','2017-06-19 12:31:24',0,1,1),(1562,'hc_44967426_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1412/','hc_44967426_nahcs@univago.com','2017-06-19 12:31:51','2017-06-16 14:27:51','2017-06-19 12:31:51',0,1,1),(1563,'hc_23967113_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1413/','hc_23967113_nahcs@univago.com','2017-06-19 12:59:40','2017-06-16 14:52:37','2017-06-19 12:59:40',0,1,1),(1564,'hc_24717288_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1414/','hc_24717288_nahcs@univago.com','2017-06-19 16:54:05','2017-06-16 15:03:44','2017-06-19 16:54:05',0,1,1),(1565,'hc_55064407_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1415/','hc_55064407_nahcs@univago.com','2017-06-19 16:54:16','2017-06-16 18:07:12','2017-06-19 16:54:16',0,1,1),(1566,'hc_76597402_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1416/','hc_76597402_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 18:48:34','2017-06-19 16:55:28',0,1,1),(1567,'hc_87670893_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1417/','hc_87670893_nahcs@univago.com','2017-06-19 16:56:30','2017-06-16 18:51:03','2017-06-19 16:56:30',0,1,1),(1568,'hc_21868068_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1418/','hc_21868068_nahcs@univago.com','2017-06-19 17:05:57','2017-06-16 18:53:27','2017-06-19 17:05:57',0,1,1),(1569,'hc_04148546_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1419/','hc_04148546_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 18:53:28','2017-06-19 18:13:41',0,1,1),(1570,'hc_57465499_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1420/','hc_57465499_nahcs@univago.com','2017-06-19 18:54:51','2017-06-16 18:53:29','2017-06-19 18:54:51',0,1,1),(1571,'hc_14365123_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1421/','hc_14365123_nahcs@univago.com','2017-06-19 19:57:23','2017-06-16 18:53:30','2017-06-19 19:57:23',0,1,1),(1572,'hc_08692308_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1422/','hc_08692308_nahcs@univago.com','2017-06-19 19:57:24','2017-06-16 18:53:31','2017-06-19 19:57:24',0,1,1),(1573,'hc_99732571_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1423/','hc_99732571_nahcs@univago.com','2017-06-19 19:57:34','2017-06-16 18:53:32','2017-06-19 19:57:34',0,1,1),(1574,'hc_24798480_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1424/','hc_24798480_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 18:53:32','2017-06-19 19:59:11',0,1,1),(1575,'hc_73997580_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1425/','hc_73997580_nahcs@univago.com','2017-06-19 20:23:17','2017-06-16 18:53:33','2017-06-19 20:23:17',0,1,1),(1576,'hc_67092792_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1426/','hc_67092792_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 18:53:34','2017-06-19 20:06:11',0,1,1),(1577,'hc_05449440_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1427/','hc_05449440_nahcs@univago.com','2017-06-19 20:23:18','2017-06-16 18:53:35','2017-06-19 20:23:18',0,1,1),(1578,'hc_81097545_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1428/','hc_81097545_nahcs@univago.com','2017-06-19 20:31:49','2017-06-16 18:53:36','2017-06-19 20:31:49',0,1,1),(1579,'hc_99749682_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1429/','hc_99749682_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 18:53:37','2017-06-19 20:33:46',0,1,1),(1580,'hc_61030042_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1430/','hc_61030042_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 18:53:37','2017-06-19 20:48:46',0,1,1),(1581,'hc_91641146_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1431/','hc_91641146_nahcs@univago.com','1999-01-01 00:00:00','2017-06-16 18:53:38','2017-06-19 21:26:27',0,1,1),(1582,'hc_63081533_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1432/','hc_63081533_nahcs@univago.com','2017-06-19 21:27:46','2017-06-16 18:53:39','2017-06-19 21:27:46',0,1,1),(1583,'hc_87892753_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1433/','hc_87892753_nahcs@univago.com',NULL,'2017-06-16 18:53:39','2017-06-16 18:53:40',1,NULL,1),(1584,'hc_50901934_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1434/','hc_50901934_nahcs@univago.com',NULL,'2017-06-16 21:43:54','2017-06-16 21:43:54',1,NULL,1),(1585,'hc_23036525_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1436/','hc_23036525_nahcs@univago.com',NULL,'2017-06-18 19:29:50','2017-06-18 19:29:50',1,NULL,1),(1586,'hc_36058123_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1437/','hc_36058123_nahcs@univago.com',NULL,'2017-06-18 19:32:15','2017-06-18 19:32:16',1,NULL,1),(1587,'hc_62393254_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1438/','hc_62393254_nahcs@univago.com',NULL,'2017-06-18 19:32:16','2017-06-18 19:32:16',1,NULL,1),(1588,'hc_53840073_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1439/','hc_53840073_nahcs@univago.com',NULL,'2017-06-18 19:37:12','2017-06-18 19:37:12',1,NULL,1),(1589,'hc_50307558_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1440/','hc_50307558_nahcs@univago.com',NULL,'2017-06-18 19:43:51','2017-06-18 19:43:51',1,NULL,1),(1590,'hc_07543235_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1441/','hc_07543235_nahcs@univago.com',NULL,'2017-06-18 19:48:40','2017-06-18 19:48:41',1,NULL,1),(1591,'hc_24725745_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1442/','hc_24725745_nahcs@univago.com',NULL,'2017-06-18 19:53:26','2017-06-18 19:53:27',1,NULL,1),(1592,'hc_78524512_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1443/','hc_78524512_nahcs@univago.com',NULL,'2017-06-18 19:55:50','2017-06-18 19:55:51',1,NULL,1),(1593,'hc_41559057_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1444/','hc_41559057_nahcs@univago.com',NULL,'2017-06-18 19:57:53','2017-06-18 19:57:53',1,NULL,1),(1594,'hc_42518922_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1445/','hc_42518922_nahcs@univago.com',NULL,'2017-06-18 20:00:28','2017-06-18 20:00:29',1,NULL,1),(1595,'hc_08254828_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1446/','hc_08254828_nahcs@univago.com',NULL,'2017-06-18 20:04:46','2017-06-18 20:04:47',1,NULL,1),(1596,'hc_80940553_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1447/','hc_80940553_nahcs@univago.com',NULL,'2017-06-18 20:06:53','2017-06-18 20:06:53',1,NULL,1),(1597,'hc_50906040_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1448/','hc_50906040_nahcs@univago.com',NULL,'2017-06-18 20:09:11','2017-06-18 20:09:11',1,NULL,1),(1598,'hc_36813649_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1449/','hc_36813649_nahcs@univago.com',NULL,'2017-06-18 20:31:56','2017-06-18 20:31:57',1,NULL,1),(1599,'hc_16845253_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1450/','hc_16845253_nahcs@univago.com',NULL,'2017-06-18 21:08:16','2017-06-18 21:08:17',1,NULL,1),(1600,'hc_65653243_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1451/','hc_65653243_nahcs@univago.com',NULL,'2017-06-18 21:12:37','2017-06-18 21:12:38',1,NULL,1),(1601,'hc_87077537_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1452/','hc_87077537_nahcs@univago.com',NULL,'2017-06-18 21:19:33','2017-06-18 21:19:34',1,NULL,1),(1602,'hc_92112828_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1453/','hc_92112828_nahcs@univago.com',NULL,'2017-06-18 21:19:34','2017-06-18 21:19:35',1,NULL,1),(1603,'hc_28073369_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1454/','hc_28073369_nahcs@univago.com',NULL,'2017-06-18 21:19:35','2017-06-18 21:19:35',1,NULL,1),(1604,'hc_33514788_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1455/','hc_33514788_nahcs@univago.com',NULL,'2017-06-18 21:21:52','2017-06-18 21:21:52',1,NULL,1),(1605,'hc_96437994_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1456/','hc_96437994_nahcs@univago.com',NULL,'2017-06-18 21:21:53','2017-06-18 21:21:53',1,NULL,1),(1606,'hc_41274512_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1457/','hc_41274512_nahcs@univago.com',NULL,'2017-06-18 21:21:54','2017-06-18 21:21:54',1,NULL,1),(1607,'hc_40270492_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1458/','hc_40270492_nahcs@univago.com',NULL,'2017-06-18 21:28:50','2017-06-18 21:28:51',1,NULL,1),(1608,'hc_86650044_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1459/','hc_86650044_nahcs@univago.com',NULL,'2017-06-18 21:31:06','2017-06-18 21:31:06',1,NULL,1),(1609,'hc_96827568_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1460/','hc_96827568_nahcs@univago.com',NULL,'2017-06-18 21:42:36','2017-06-18 21:42:36',1,NULL,1),(1610,'hc_17736333_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1461/','hc_17736333_nahcs@univago.com',NULL,'2017-06-19 01:19:03','2017-06-19 01:19:04',1,NULL,1),(1611,'hc_68182080_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1463/','hc_68182080_nahcs@univago.com',NULL,'2017-06-19 12:18:08','2017-06-19 12:18:09',1,NULL,1),(1612,'hc_97736899_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1464/','hc_97736899_nahcs@univago.com',NULL,'2017-06-19 12:32:03','2017-06-19 12:32:04',1,NULL,1),(1613,'hc_74979437_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1465/','hc_74979437_nahcs@univago.com',NULL,'2017-06-19 13:01:52','2017-06-19 13:01:53',1,NULL,1),(1614,'hc_06919640_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1479/','hc_06919640_nahcs@univago.com',NULL,'2017-06-19 15:49:54','2017-06-19 15:49:54',1,NULL,1),(1615,'hc_86287849_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1480/','hc_86287849_nahcs@univago.com',NULL,'2017-06-19 16:55:06','2017-06-19 16:55:07',1,NULL,1),(1616,'hc_47489086_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1481/','hc_47489086_nahcs@univago.com',NULL,'2017-06-19 16:55:07','2017-06-19 16:55:07',1,NULL,1),(1617,'hc_50418069_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1482/','hc_50418069_nahcs@univago.com',NULL,'2017-06-19 16:57:27','2017-06-19 16:57:27',1,NULL,1),(1618,'hc_18912469_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1483/','hc_18912469_nahcs@univago.com',NULL,'2017-06-19 17:06:19','2017-06-19 17:06:19',1,NULL,1),(1619,'hc_00847776_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1484/','hc_00847776_nahcs@univago.com',NULL,'2017-06-19 18:13:24','2017-06-19 18:13:25',1,NULL,1),(1620,'hc_96946115_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1486/','hc_96946115_nahcs@univago.com',NULL,'2017-06-19 18:49:20','2017-06-19 18:49:21',1,NULL,1),(1621,'hc_19215529_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1487/','hc_19215529_nahcs@univago.com',NULL,'2017-06-19 18:56:30','2017-06-19 18:56:30',1,NULL,1),(1622,'hc_69026558_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1488/','hc_69026558_nahcs@univago.com',NULL,'2017-06-19 19:58:12','2017-06-19 19:58:12',1,NULL,1),(1623,'hc_32649222_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1489/','hc_32649222_nahcs@univago.com',NULL,'2017-06-19 19:58:13','2017-06-19 19:58:13',1,NULL,1),(1624,'hc_33669366_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1490/','hc_33669366_nahcs@univago.com',NULL,'2017-06-19 19:58:14','2017-06-19 19:58:14',1,NULL,1),(1625,'hc_07843915_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1491/','hc_07843915_nahcs@univago.com',NULL,'2017-06-19 20:03:02','2017-06-19 20:03:03',1,NULL,1),(1626,'hc_36247042_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1492/','hc_36247042_nahcs@univago.com',NULL,'2017-06-19 20:07:53','2017-06-19 20:07:54',1,NULL,1),(1627,'hc_54395206_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1493/','hc_54395206_nahcs@univago.com',NULL,'2017-06-19 20:23:01','2017-06-19 20:23:02',1,NULL,1),(1628,'hc_40840456_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1494/','hc_40840456_nahcs@univago.com',NULL,'2017-06-19 20:25:04','2017-06-19 20:25:05',1,NULL,1),(1629,'hc_06395781_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1495/','hc_06395781_nahcs@univago.com',NULL,'2017-06-19 20:34:00','2017-06-19 20:34:01',1,NULL,1),(1630,'hc_33053794_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1496/','hc_33053794_nahcs@univago.com',NULL,'2017-06-19 20:50:18','2017-06-19 20:50:19',1,NULL,1),(1631,'hc_14955428_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1497/','hc_14955428_nahcs@univago.com',NULL,'2017-06-19 21:25:34','2017-06-19 21:25:35',1,NULL,1),(1632,'hc_03328375_nahcs','https://192.188.0.66/api/admin/configuration/v1/conference/1498/','hc_03328375_nahcs@univago.com',NULL,'2017-06-19 21:27:49','2017-06-19 21:27:49',1,NULL,1);
/*!40000 ALTER TABLE `vmrs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-19 20:08:51
