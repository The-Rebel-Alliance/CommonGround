# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.5.5-10.1.19-MariaDB)
# Database: CommonGround
# Generation Time: 2016-11-30 17:24:28 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table messages
# ------------------------------------------------------------

CREATE TABLE `messages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `to_profile_id` int(11) unsigned NOT NULL,
  `from_profile_id` int(11) unsigned NOT NULL,
  `message` varchar(10000) DEFAULT NULL,
  `status` enum('unread','read','deleted') DEFAULT 'unread',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table profiles
# ------------------------------------------------------------

CREATE TABLE `profiles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `user_Id` int(11) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `political_affiliation` enum('D','R','I','O') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tokens
# ------------------------------------------------------------

CREATE TABLE `tokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table topics
# ------------------------------------------------------------

CREATE TABLE `topics` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;

INSERT INTO `topics` (`id`, `name`, `created_at`, `updated_at`)
VALUES
	(1,'Abortion','2016-11-29 10:37:35',NULL),
	(2,'2016 Election','2016-11-29 10:37:35',NULL),
	(3,'Foreign Policy','2016-11-29 10:37:35',NULL),
	(4,'Drug Policy','2016-11-29 10:37:35',NULL),
	(5,'Gun Control','2016-11-29 10:37:35',NULL),
	(6,'Race Relations','2016-11-29 10:37:35',NULL),
	(7,'Gay Rights','2016-11-29 10:37:35',NULL),
	(8,'Immigration','2016-11-29 10:37:35',NULL),
	(9,'Environmental Issues','2016-11-29 10:37:35',NULL),
	(10,'Economy','2016-11-29 10:37:35',NULL),
	(11,'Healthcare','2016-11-29 10:37:35',NULL),
	(12,'Women\'s Issues','2016-11-29 10:37:35',NULL),
	(13,'Income Inequality','2016-11-29 10:37:35',NULL),
	(14,'Taxes','2016-11-29 10:37:35',NULL),
	(15,'Death Penalty','2016-11-29 10:37:35',NULL);

/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_topics_link
# ------------------------------------------------------------

CREATE TABLE `user_topics_link` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `topic_id` int(11) unsigned NOT NULL,
  `profile_id` int(11) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users
# ------------------------------------------------------------

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table video_links
# ------------------------------------------------------------

CREATE TABLE `video_links` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) DEFAULT NULL,
  `initiated_by_id` int(11) unsigned NOT NULL,
  `invited_id` int(11) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
