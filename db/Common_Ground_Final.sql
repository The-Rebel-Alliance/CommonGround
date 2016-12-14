# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.5.5-10.1.19-MariaDB)
# Database: CommonGround
# Generation Time: 2016-12-14 05:26:33 +0000
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

DROP TABLE IF EXISTS `messages`;

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

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;

INSERT INTO `messages` (`id`, `to_profile_id`, `from_profile_id`, `message`, `status`, `created_at`, `updated_at`)
VALUES
	(1,1,10,'I\'d like to chat!','unread','2016-12-13 16:30:38',NULL),
	(2,10,1,'Hi, Jaimariev! How are you?','unread','2016-12-13 16:31:36',NULL),
	(3,10,1,'I am good, I am interested in setting up a video chat. ','unread','2016-12-13 16:32:45',NULL),
	(4,1,10,'when do you wnat to video chat?','unread','2016-12-13 16:38:19',NULL);

/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table profiles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `profiles`;

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

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;

INSERT INTO `profiles` (`id`, `first_name`, `last_name`, `city`, `state`, `avatar`, `user_Id`, `created_at`, `updated_at`, `political_affiliation`)
VALUES
	(1,'Jaimarie','Valasco','Las Vegas','NV','http://res.cloudinary.com/dxpodvk7x/image/upload/v1481672858/b62h4zq1va71jdry0nos.jpg',1,'2016-12-13 15:47:53',NULL,''),
	(2,'Tim','Lee','Las Vegas','NV','http://res.cloudinary.com/dxpodvk7x/image/upload/v1481673440/cpzdw5fxk73uw04msmfu.jpg',2,'2016-12-13 15:56:55','2016-12-13 16:02:51',''),
	(3,'Gabe','Shephard','Las Vegas','NV','http://res.cloudinary.com/dxpodvk7x/image/upload/v1481673837/jiexxf6mmzllcktwgr4b.jpg',3,'2016-12-13 16:04:10',NULL,''),
	(4,'Jason','Shabo','Las Vegas','NV','http://res.cloudinary.com/dxpodvk7x/image/upload/v1481673916/ern6umcxjapptjbrl6fp.jpg',4,'2016-12-13 16:05:33',NULL,''),
	(5,'Jason','Shabo','Las Vegas','NV','http://res.cloudinary.com/dxpodvk7x/image/upload/v1481674079/m203bur4i4oyeoi4ncxz.jpg',5,'2016-12-13 16:07:30','2016-12-13 16:08:05',''),
	(6,'Mike','Sweeney','Las Vegas','NV','http://res.cloudinary.com/dxpodvk7x/image/upload/v1481674142/vnzaiwrmi1fyzmkz1wyj.jpg',6,'2016-12-13 16:09:14',NULL,''),
	(7,'Dustin','Rudy','Las Vegas','NV','http://res.cloudinary.com/dxpodvk7x/image/upload/v1481674223/krsvqqu456pzaminzmbj.jpg',7,'2016-12-13 16:10:37',NULL,''),
	(8,'Ryan','Lee','Las Vegas','NV','http://res.cloudinary.com/dxpodvk7x/image/upload/v1481674286/lsvpz5r4wtsqnrqs1wus.jpg',8,'2016-12-13 16:11:38',NULL,''),
	(9,'Jeff','Newburn','Las Vegas','NV','http://res.cloudinary.com/dxpodvk7x/image/upload/v1481674468/qunvwdjmlytzr5ohndio.jpg',9,'2016-12-13 16:14:05','2016-12-13 16:14:31',''),
	(10,'Carrie','Smidt','Las Vegas','NV','http://res.cloudinary.com/dxpodvk7x/image/upload/v1481691454/sdxjztvzlj3a2jq5r1fp.jpg',10,'2016-12-13 16:28:32','2016-12-13 20:57:36','');

/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;

INSERT INTO `tokens` (`id`, `user_id`, `token`, `created_at`, `updated_at`)
VALUES
	(1,1,'8d9db70d-1c3a-4f3f-8ff3-6cf9cd8e6adc','2016-12-13 15:48:03','2016-12-13 16:38:48'),
	(2,2,'b878c8bb-120a-47cb-b1ca-06cff84db3c7','2016-12-13 15:57:04',NULL),
	(3,3,'bce487da-e4f6-4747-a149-422dacc81260','2016-12-13 16:04:17','2016-12-13 20:08:05'),
	(4,5,'abbed450-892b-48ab-a3b3-356cb9b87c39','2016-12-13 16:07:44','2016-12-13 21:14:04'),
	(5,6,'065f9266-07ad-4eec-b4ce-88839d88138e','2016-12-13 16:09:28','2016-12-13 20:00:22'),
	(6,7,'39091a6c-56a9-4f97-904d-93a3d6b5ee37','2016-12-13 16:10:44','2016-12-13 19:33:31'),
	(7,8,'ce34c9ab-2fd6-4e81-8b20-2e416c8189a5','2016-12-13 16:11:45','2016-12-13 20:24:43'),
	(8,9,'afe6606c-692d-4fb3-96ac-a4d5b19297f3','2016-12-13 16:14:12','2016-12-13 20:35:27'),
	(9,10,'0cd21d2a-038b-4810-ae8e-ef30cca0e56b','2016-12-13 16:28:39','2016-12-13 20:56:16');

/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table topics
# ------------------------------------------------------------

DROP TABLE IF EXISTS `topics`;

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
	(1,'2016 Election','2016-12-13 15:39:53',NULL),
	(2,'Foreign Policy','2016-12-13 15:40:05',NULL),
	(3,'Drug Policy','2016-12-13 15:40:16',NULL),
	(4,'Gun Control','2016-12-13 15:40:21',NULL),
	(5,'Race Relations','2016-12-13 15:40:27',NULL),
	(6,'LGBTQ Rights','2016-12-13 15:40:37',NULL),
	(7,'Immigration','2016-12-13 15:40:46',NULL),
	(8,'Environmental Issues','2016-12-13 15:41:02',NULL),
	(9,'Economy','2016-12-13 15:41:08',NULL),
	(10,'Healthcare','2016-12-13 15:41:14',NULL),
	(11,'Women\'s Issues','2016-12-13 15:41:19',NULL),
	(12,'Income Inequality','2016-12-13 15:41:26',NULL),
	(13,'Taxes','2016-12-13 15:41:30',NULL),
	(14,'Death Penalty','2016-12-13 15:41:37',NULL);

/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_topics_link
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_topics_link`;

CREATE TABLE `user_topics_link` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `topic_id` int(11) unsigned NOT NULL,
  `profile_id` int(11) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `stance` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user_topics_link` WRITE;
/*!40000 ALTER TABLE `user_topics_link` DISABLE KEYS */;

INSERT INTO `user_topics_link` (`id`, `topic_id`, `profile_id`, `created_at`, `updated_at`, `stance`)
VALUES
	(1,1,1,'2016-12-13 15:47:53','2016-12-13 15:55:31','I am not a Trump supporter, I am worried about the fate of our country. '),
	(2,3,1,'2016-12-13 15:47:53','2016-12-13 15:55:31','It was recently reported that the state of Oregon has made millions since legalizing marijuana, I believe that our school systems would benefit greatly from that type of cash infusion. '),
	(3,5,1,'2016-12-13 15:47:53','2016-12-13 15:55:31','I am an advocate of equal rights and whole-heartedly support BLM'),
	(4,7,1,'2016-12-13 15:47:53','2016-12-13 15:55:31','Aside from the small population of Native Americans, this entire country is comprised of immigrants. While I believe we should allow immigration, we should enforce proper immigration and reel in illegal immigration. '),
	(5,9,1,'2016-12-13 15:47:53','2016-12-13 15:55:31','I am very concerned about the impact that this new president will have on our ecoomy. '),
	(6,11,1,'2016-12-13 15:47:53','2016-12-13 15:55:31','As a woman, I am very, very concerned about the continuance of men making decisions about women\'s rights. '),
	(7,13,1,'2016-12-13 15:47:53','2016-12-13 15:55:31','I am in favor of corporate taxing. '),
	(8,14,1,'2016-12-13 15:47:53','2016-12-13 15:55:31','I am a staunch supporter of the death penalty. '),
	(9,4,1,'2016-12-13 15:55:31',NULL,''),
	(10,1,2,'2016-12-13 15:56:55','2016-12-13 16:02:51','I am very, very disappointed int he outcome of the election. I have no confidence in Trump\'s ability to run this country. '),
	(11,3,2,'2016-12-13 15:56:55','2016-12-13 16:02:51','I don\'t see that giving free reign to people who are already struggling with drug use will benefit anyone. I believe that by legalizing marijuana, we are opening pandora\'s box. '),
	(12,6,2,'2016-12-13 15:56:55','2016-12-13 16:02:51','All humans should have equal rights, regardless of their sexual identification or orientation. '),
	(13,4,2,'2016-12-13 15:56:55','2016-12-13 16:02:51','If we take guns off the streets, everyone will be safer. '),
	(14,7,2,'2016-12-13 15:56:55','2016-12-13 16:02:51','Our country was built on immigration, we should honor the foundation our country was built on and allow immigration. '),
	(15,10,2,'2016-12-13 15:56:55','2016-12-13 16:02:51','I firmly believe that everyone should have access to free health care. \n'),
	(16,8,2,'2016-12-13 15:56:55','2016-12-13 16:02:51','If we don\'t take care of  our world, where will things be for our grandkids?'),
	(17,1,3,'2016-12-13 16:04:10','2016-12-13 20:24:25','We send people into space yet we have one of the poorest census tracts in the state, if not the country. We have high-paying jobs in the space industry and minimum wage jobs, not a lot in between. Our unemployment is no longer high but underemployment is a serious problem. ... So the short answer is anger. Anger at a broken system, a do-nothing Congress, and the feeling that working hard is no guarantee that you will get ahead.'),
	(18,4,3,'2016-12-13 16:04:10','2016-12-13 20:24:25',' look at places like Japan and you realize they have extremely lower gun homicide and suicide rates. In Japan it is really hard to get a gun because they do a background check on not just you, but your whole family to make sure they aren\'t mentally ill, something Americans would never do even if it were an amendment in the constitution'),
	(19,7,3,'2016-12-13 16:04:10','2016-12-13 20:24:25','San Francisco\'s elected officials may be moving toward hiring attorneys to represent the city\'s illegal immigrant population. Activists recently gathered outside city hall to demand that detainees have access to immigration lawyers, and to voice their concerns about President-elect Donald Trump.\nOnce again wanting to steal from citizens and reward illegals instead of helping the feds get rid of them.'),
	(20,10,3,'2016-12-13 16:04:10','2016-12-13 20:24:25','The Affordable Care Act contains provisions for \"death panels,\" which decide which critically-ill patients receive care and which won\'t, according to Mark Halperin, senior political analyst for Time magazine. \n\n\"It\'s built into the plan. It\'s not like a guess or like a judgment. That\'s going to be part of how costs are controlled,\" '),
	(21,13,3,'2016-12-13 16:04:10','2016-12-13 20:24:25','higher taxes for the rich and middle class, lower for the poor people '),
	(22,14,3,'2016-12-13 16:04:10','2016-12-13 20:24:25','The death penalty doesn\'t deter further murders, it\'s not meant to deter further murders. It\'s a punishment for the crime of murder.It\'s a huge drain on limited public funds.\n\n'),
	(23,11,3,'2016-12-13 16:04:10',NULL,NULL),
	(24,8,3,'2016-12-13 16:04:10','2016-12-13 20:24:25','Energy efficiency upgrades and design elements in buildings have the potential to drastically lower U.S. energy demand while providing benefits such as cost savings, carbon pollution reduction, and decreased water use. '),
	(25,5,3,'2016-12-13 16:04:10','2016-12-13 20:24:25','\"White\'s have caused this problem and take full responsibility, what is needed to mend the people?\".\n\nSo in the opinion of a minority person.....what is needed?\n\nMoney has been given hand over fist so that can\'t be it. (To people and to many communities)\nLaws have been past making racism illegal for 50ish years or more.\nLaws have been past making it supposedly easier for a minority to get a job, so that shouldn\'t be it.\nThere are far more scholarships available to non-whites for college.\nMinorities go to the same public school system that most white\'s in the country attend so they should all be getting roughly equal education. (I know some schools in districts are better than others)'),
	(26,12,4,'2016-12-13 16:05:33',NULL,NULL),
	(27,9,4,'2016-12-13 16:05:33',NULL,NULL),
	(28,6,4,'2016-12-13 16:05:33',NULL,NULL),
	(29,3,4,'2016-12-13 16:05:33',NULL,NULL),
	(30,2,4,'2016-12-13 16:05:33',NULL,NULL),
	(31,5,4,'2016-12-13 16:05:33',NULL,NULL),
	(32,8,4,'2016-12-13 16:05:33',NULL,NULL),
	(33,11,4,'2016-12-13 16:05:33',NULL,NULL),
	(34,14,4,'2016-12-13 16:05:33',NULL,NULL),
	(35,1,4,'2016-12-13 16:05:33',NULL,NULL),
	(36,3,5,'2016-12-13 16:07:30','2016-12-13 21:23:55','The corporate lobby is out in full force against legalization measures in this state. Unsurprising considering that 20% of Arizona\'s prison population is in for drug offenses. For weeks now I\'ve been seeing these excrement filled ads on TV preaching all sorts of nonsense about how bad it\'s been for Colorado and to \"please think of the children\". Thankfully public opinion is shifting to the point where less and less are going to believe the reefer madness rhetoric spewed forth by the private prisons and opiate manufactures. '),
	(37,6,5,'2016-12-13 16:07:30','2016-12-13 21:23:55','It is pretty hysterical watching trump the racist screw over the reich-wingers on this issue. They\'re so motivated by his bigotry that they\'re willing to suck up his pro-gay speech.\n\nIf you have to choose a moron racist against a anti-gay neo-con, they\'ll choose trump. You gotta have priorities when you\'re that filled with hatred.'),
	(38,9,5,'2016-12-13 16:07:30','2016-12-13 21:23:55','Trans-Pacific Partnership Seen as Door for Foreign Suits Against U.S., New York Times, March 25, 2015\n\nAn ambitious 12-nation trade accord pushed by President Obama would allow foreign corporations to sue the United States government for actions that undermine their investment “expectations” and hurt their business, according to a classified document.\n\nThe Trans-Pacific Partnership — a cornerstone of Mr. Obama’s remaining economic agenda — would grant broad powers to multinational companies operating in North America, South America and Asia. Under the accord, still under negotiation but nearing completion, companies and investors would be empowered to challenge regulations, rules, government actions and court rulings — federal, state or local — before tribunals organized under the World Bank or the United Nations.'),
	(39,12,5,'2016-12-13 16:07:30',NULL,NULL),
	(40,14,5,'2016-12-13 16:07:30',NULL,NULL),
	(41,11,5,'2016-12-13 16:07:30',NULL,NULL),
	(42,8,5,'2016-12-13 16:07:30',NULL,NULL),
	(43,5,5,'2016-12-13 16:07:30',NULL,NULL),
	(44,2,5,'2016-12-13 16:07:30',NULL,NULL),
	(45,13,5,'2016-12-13 16:07:30',NULL,NULL),
	(46,10,5,'2016-12-13 16:07:30',NULL,NULL),
	(47,7,5,'2016-12-13 16:07:30','2016-12-13 21:23:55','We need to start prosecuting companies who hire illegals. That will have the greatest impact on the flow of illegals from Central and South America.'),
	(48,4,5,'2016-12-13 16:07:30','2016-12-13 21:23:55','It is predicted that within this century that due to the ever increasing population that most, if not every, government with turn into some for a totalitarian government. By that point it won\'t matter who has gun control. Most likely in that situation all guns will be taken away and given to the military and defense, and not the general public.'),
	(49,1,5,'2016-12-13 16:07:30','2016-12-13 21:23:55','I am very hopeful about the upcoming election. I think we finally have a chance to save our system. In my experience, my generation (millennials) are fed up with how badly previous generations have screwed up our system, and how politicians and special interests have been able to game the system.'),
	(50,1,6,'2016-12-13 16:09:14','2016-12-13 20:07:48','The No. 1 thing we heard was Trump. Everybody that we talked to was anxious about Trump and equal to that people were anxious about the media as it pertained to Trump. ... they were anxious about other things that Trump was exploiting, they were anxious about being disconnected from each other.'),
	(51,4,6,'2016-12-13 16:09:14','2016-12-13 20:07:48','Guns aren\'t the problem, social dynamics are. solve those problems & crime goes virtually goes away. Where I live outside of Philadelphia we have many guns & hunters but no murders since 1997. Obviously, it\'s not about having guns around.'),
	(52,7,6,'2016-12-13 16:09:14','2016-12-13 20:07:48','To illegal aliens in the country: please take the advice of your enablers and do not leave the countryÂ…we want you to stay put. This way we can find you more easily when we get ready to deport you. '),
	(53,10,6,'2016-12-13 16:09:14','2016-12-13 20:07:48','Big countries, with bigger populations; i.e. the United States, China, India---cannot fund and support large public healthcare programs. Those who try to do so find the costs unabsorbable.'),
	(54,13,6,'2016-12-13 16:09:14','2016-12-13 20:07:48','lower taxes for the rich, higher taxes for the middle class and poor people 4%'),
	(55,14,6,'2016-12-13 16:09:14','2016-12-13 20:07:48','The death penalty doesn\'t deter further murders\nIt\'s a huge drain on limited public funds\nInnocent people have been executed before and will be executed again\nIt\'s a huge toll on those involved in the process.\nIt\'s incredibly biased against African-Americans and the poor.\n'),
	(56,11,6,'2016-12-13 16:09:14',NULL,NULL),
	(57,8,6,'2016-12-13 16:09:14',NULL,NULL),
	(58,5,6,'2016-12-13 16:09:14','2016-12-13 20:07:48','The dems have done this for over 240 years. Andrew Jackson, the founder of the democrats, started with the Indians, but since they got wiped out, dems turned to the slaves, pitting white slaves and black slaves against each other. Their entire basis to hold power is to play on humans emotions of self worth capered to others. The easiest method of identifying superiority over someone is by skin color. You could know nothing else about the other person, but the left brainwashed the ignorant to believe that \"even if you are dirt poor and live in a trailer, you\'re still better than the black man who owns his own field of slaves because you\'re white.\" Its the easiest path to power is by dividing the ignorant into groups and picking a side you think you can have more power over. That\'s why they want a pure democracy, ie \"democrats\" or mob rule, or the majority suppressing the minority.'),
	(59,2,6,'2016-12-13 16:09:14',NULL,NULL),
	(60,3,7,'2016-12-13 16:10:37','2016-12-13 19:59:38','I think crime would be lower if they legalized marijuana. It would put the drug dealers out of business'),
	(61,6,7,'2016-12-13 16:10:37','2016-12-13 19:59:38','The second bombshell was exploded by a top researcher for the American Psychological Association (APA), lesbian activist, Dr. Lisa Diamond, co-author-in-chief of ‘the APA Handbook’ of sexuality and psychology and one of the APA’s most respected members. She admitted that sexual orientation was “fluid” and not unchangeable. By doing so, Dr. Diamond confirmed that the myth that “homosexuals can’t change” is now a dead-end theory'),
	(62,9,7,'2016-12-13 16:10:37','2016-12-13 19:59:38','When Obama took over the National Debt was 9 Trillion Dollars(which George Bush had added 5 Trillion of that debt). Now that 8 years of Obama has passed(thank God we survived) he added 10 Trillion Dollars more to the debt, but we have people going to bed hungry. Why is that? Wasn\'t the Hope and Change, the Fundamental Transformation, supposed to help those in need? Did you know that Warren Buffet(liberal), Bill Gates(liberal), Al Gore(Liberal) Bill Clinton(liberal) and even Barrack Hussein Obama(liberal) got filthy rich.'),
	(63,12,7,'2016-12-13 16:10:37','2016-12-13 19:59:38','Inequality is one of the key challenges of our time. Income inequality specifically is one of the most visible aspects of a broader and more complex issue, one that entails inequality of opportunity and extends to gender, ethnicity, disability, and age, among others. Ranking second in last year’s Outlook, it was identified as the most significant trend of 2015 by our Network’s experts. This affects all countries around the world. In developed and developing countries alike, the poorest half of the population often controls less than 10% of its wealth. This is a universal challenge that the whole world must address.'),
	(64,14,7,'2016-12-13 16:10:37','2016-12-13 19:59:38','Thomas Jefferson had it right. You have a God given right to life.\n'),
	(65,13,7,'2016-12-13 16:10:37','2016-12-13 19:59:38','higher taxes for the rich, lower for middle class and poor people 50%'),
	(66,10,7,'2016-12-13 16:10:37','2016-12-13 19:59:38','\nFood isn\'t a right. Shelter isn\'t a right. Healthcare\nIsn\'t a right. As a compassionate society we should strive to see that everyone gets reasonable healthcare, but we need to understand that that is not a right that people can demand Be fulfilled.It is charity and compassion'),
	(67,7,7,'2016-12-13 16:10:37','2016-12-13 19:59:38','To illegal alien parents with U.S. citizen children: you knew when you came here and decided to reproduce with reckless abandon, there could be a chance you would be deported and separated from your children. You are the only one\'s responsible for tearing your own families apart. Your days of hiding behind your children and using them as pawns to justify remaining in the country are coming to a halt soon.'),
	(68,4,7,'2016-12-13 16:10:37','2016-12-13 19:59:38','There are some real gun nuts on YouTube. I ran across this video of a guy in a cowboy hit showing off his AK-47. He is a walking advertisement for gun control. '),
	(69,1,7,'2016-12-13 16:10:37','2016-12-13 19:59:38','People feel that they don\'t have any control over the process. They have this overwhelming sense — whether they\'re on the right or the left of the spectrum — that elites are controlling the levers of power, and that they don\'t have a say. '),
	(70,2,7,'2016-12-13 16:10:37','2016-12-13 19:59:38','Concerned that the United States is providing the total defense for western Europe and they appear to believe they are entitled to it without any obligation of supporting political positions.'),
	(71,2,8,'2016-12-13 16:11:38',NULL,NULL),
	(72,5,8,'2016-12-13 16:11:38','2016-12-13 20:32:48','Changes need to be made at the personal level more than anything else. Racism affects people in that way far more often than it does coming from some type of authority or administrative apparatus. I don\'t mean to downplay the effects of that institutionalized racism, but that kind of racism is also the easiest to deal with because you can make laws and policies that govern those institutions. Not so for personal interactions and the more subtle ways that human being communicate. '),
	(73,8,8,'2016-12-13 16:11:38','2016-12-13 20:32:48','LEED buildings consume 25-30% less energy and decrease water use by up to 15% compared with a conventional building, while also resulting in higher occupant satisfaction and carbon emission reductions.'),
	(74,11,8,'2016-12-13 16:11:38',NULL,NULL),
	(75,14,8,'2016-12-13 16:11:38','2016-12-13 20:32:48','The most important benefit of the death penalty is that it demonstrates a quest (however weak) for justice.\n\n'),
	(76,7,8,'2016-12-13 16:11:38','2016-12-13 20:32:48','It is beyond any common sense reasoning as to why these supporters and enablers would be giving advice to illegals on how to further skirt around our laws. To go as far as to advise illegals with criminal records to not risk leaving and to remain in the country is simply mind boggling.'),
	(77,1,8,'2016-12-13 16:11:38','2016-12-13 20:32:48','It\'s exciting. People are frustrated and ready for real change. People are tired of the candidates representing the party establishment and lobbyists, instead of the people. This is why Bernie Sanders is doing well, and I believe will be our next president. Integrity matters'),
	(78,6,8,'2016-12-13 16:11:38','2016-12-13 20:32:48','Gender identity confusion is also a symptom of other mental disorders, such as BPD - and not exclusive to transgenders.'),
	(79,9,8,'2016-12-13 16:11:38','2016-12-13 20:32:48','If the government and employers cooperate to boost the minimum wage to a very high figure, more people would spend more money, causing stores and restaurants to hire more people...\n\nMore tax money would go into local, state, and federal programs, so schools and infrastructure would improve.'),
	(80,3,9,'2016-12-13 16:14:05','2016-12-13 20:55:53','\"Legalizing Cannabis: Prison Food Provider Donates To Keep Marijuana Illegal In Arizon \"\nNot surprising at all, prohibitionists profiting off of prohibition, who would have thought\nprohibitionists have no issue with destroying other peoples\' families in the name of profit. '),
	(81,5,9,'2016-12-13 16:14:05','2016-12-13 20:55:53','I can\'t represent minorities, and in fact the idea that one person, even a fictitious one, is a large part of the problem. Placing people of any one minority into one person is fallacious, placing all people of all minorities into one is more so. \n\nI need to be judged on my own, as a person with unique experiences.'),
	(82,7,9,'2016-12-13 16:14:05','2016-12-13 20:55:53','We, as Americans, are good people and we need to show compassion  every day.'),
	(83,11,9,'2016-12-13 16:14:05','2016-12-13 20:55:53','The question, when do legitimate grievances devolve into perpetual, self-imposed victimhood? Try living with a perpetual victim. Jeeez, if the moon turned blue it would have been my fault.'),
	(84,14,9,'2016-12-13 16:14:05','2016-12-13 20:55:53','An important advantage of the death penalty is that is that it helps murderers recognized the significance of their crimes and helps them to focus on their need to save their souls. Even anti-DP crusader Helen Prejean recognized this advantage. Murderers about to be executed have sometimes alluded to that benefit.\n\n'),
	(85,13,9,'2016-12-13 16:14:05','2016-12-13 20:55:53','Same tax rate for all, and no loopholes (i.e. no way to get out of paying your share).'),
	(86,10,9,'2016-12-13 16:14:05','2016-12-13 20:55:53','Under the Unaffordable Care Act did anyone with a job and makes even an average income really expect for ObamaCare to provide you with better healthcare at a lesser cost? The government added over 30 million indigents to the healthcare rolls. Who do you think has to pay for it? Any of you who really thought ObamaCare was going to be affordable must have been very naive. As a nation we are now spending about 20% of our GDP on healthcare. Much more than the other 1st world nations. ObamaCare didn\'t fix that. It only made it worse. Face it....both the Democrats and the Republicans fooled you. Gruber let the cat out of the bag. And the Republicans just approved the Cromnibus Bill that fully funded ObamaCare. So please, if you think the Republicans are going to save you, you need to grow up. Merry Christmas!'),
	(87,2,9,'2016-12-13 16:14:05',NULL,NULL),
	(88,9,9,'2016-12-13 16:14:05','2016-12-13 20:55:53','FACT: The U.S. Government could save $7 billion dollars if companies just paid employees a higher minimum wage.'),
	(89,1,10,'2016-12-13 16:28:32','2016-12-13 21:13:46','I hate it. I hate this entire thing. I\'ve never felt so turned off by the political process. Campaigns started so early, and now I\'m completely burned out four months before my state\'s primary. All the candidates (Dem and Repub) just talk and talk and talk without saying anything.'),
	(90,2,10,'2016-12-13 16:28:32','2016-12-13 21:13:46','The secret to understanding US foreign policy is that there is no secret. Principally, one must come to the realization that the United States strives to dominate the world. Once one understands that, much of the apparent confusion, contradiction, and ambiguity surrounding Washington’s policies fades away.'),
	(91,3,10,'2016-12-13 16:28:32','2016-12-13 21:13:46','States or countries who have put practices of legalization, medicalization, and decriminalization into place have seen a drastic decrease in illicit drug use, as well as an increase in addicts choosing treatment options.'),
	(92,7,10,'2016-12-13 16:28:32','2016-12-13 21:13:46','For more than a century, innumerable studies have confirmed two simple yet powerful truths about the relationship between immigration and crime: immigrants are less likely to commit serious crimes or be behind bars than the native-born, and high rates of immigration are associated with lower rates of violent crime and property crime.'),
	(93,11,10,'2016-12-13 16:28:32','2016-12-13 21:13:46','There is only one workable solution to the gender war. That solution is mutual goodwill. I do not say love, as many people do not have experience of such a thing. I say goodwill, which is a concept that everyone should understand.'),
	(94,14,10,'2016-12-13 16:28:32','2016-12-13 21:13:46','The U.S. has a disgusting rate of reoffending, despite being true fans of the DP. Statistics from other countries are significant evidence that avoiding reoffending without the death penalty is perfectly possible.\n\n'),
	(95,10,10,'2016-12-13 16:28:32','2016-12-13 21:13:46','A recent article cites that forty-six percent of doctors give President Obama\'s healthcare law a \"D\" or an \"F\".'),
	(96,6,10,'2016-12-13 16:28:32','2016-12-13 21:13:46','Just like other Americans, LGBT Americans have families, work hard to earn a living, pay taxes, and serve their communities and their country. '),
	(97,12,6,'2016-12-13 20:07:48',NULL,'Addressing inequality is not only a responsibility but also an opportunity. Addressing inequality is good for business as it creates a new demographic of consumers, thus widening the market for profits and services and increasing profit opportunities,');

/*!40000 ALTER TABLE `user_topics_link` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `updated_at`)
VALUES
	(1,'jaimariev','9b96622537b6e31c533fa1a031f081cef07574c6f8d48957434daba9838fe181a2b96eebb5bdaf9274b995905063f5a915d073dab122f5b416d514965182d341','2016-12-13 15:47:53',NULL),
	(2,'timlee','9b96622537b6e31c533fa1a031f081cef07574c6f8d48957434daba9838fe181a2b96eebb5bdaf9274b995905063f5a915d073dab122f5b416d514965182d341','2016-12-13 15:56:55',NULL),
	(3,'gabeshep','9b96622537b6e31c533fa1a031f081cef07574c6f8d48957434daba9838fe181a2b96eebb5bdaf9274b995905063f5a915d073dab122f5b416d514965182d341','2016-12-13 16:04:10',NULL),
	(4,'jasonshabo','0dacd9e9333d4ceb446b353ae873ad0705ac1976c1155e72fd69df38e1104e219c172757df342ca8e5557e6f3af358089580f2143b9df5a4e9dd41af4f1c9ee5','2016-12-13 16:05:33',NULL),
	(5,'jasonshabo2','9b96622537b6e31c533fa1a031f081cef07574c6f8d48957434daba9838fe181a2b96eebb5bdaf9274b995905063f5a915d073dab122f5b416d514965182d341','2016-12-13 16:07:30',NULL),
	(6,'overlemike','9b96622537b6e31c533fa1a031f081cef07574c6f8d48957434daba9838fe181a2b96eebb5bdaf9274b995905063f5a915d073dab122f5b416d514965182d341','2016-12-13 16:09:14',NULL),
	(7,'drudy','9b96622537b6e31c533fa1a031f081cef07574c6f8d48957434daba9838fe181a2b96eebb5bdaf9274b995905063f5a915d073dab122f5b416d514965182d341','2016-12-13 16:10:37',NULL),
	(8,'rylee','9b96622537b6e31c533fa1a031f081cef07574c6f8d48957434daba9838fe181a2b96eebb5bdaf9274b995905063f5a915d073dab122f5b416d514965182d341','2016-12-13 16:11:38',NULL),
	(9,'jeffnewburn','9b96622537b6e31c533fa1a031f081cef07574c6f8d48957434daba9838fe181a2b96eebb5bdaf9274b995905063f5a915d073dab122f5b416d514965182d341','2016-12-13 16:14:05',NULL),
	(10,'carriesmidt','9b96622537b6e31c533fa1a031f081cef07574c6f8d48957434daba9838fe181a2b96eebb5bdaf9274b995905063f5a915d073dab122f5b416d514965182d341','2016-12-13 16:28:32',NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
