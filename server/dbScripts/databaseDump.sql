-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `ordered_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (8,1,'2021-09-07 22:50:45');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartItems`
--

DROP TABLE IF EXISTS `cartItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `product_quantity` tinyint DEFAULT NULL,
  `cart_id` int DEFAULT NULL,
  `price` decimal(5,1) DEFAULT NULL,
  `selected_quantity` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  KEY `cart_id` (`cart_id`),
  CONSTRAINT `cartItems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `cartItems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `cartItems_ibfk_3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartItems`
--

LOCK TABLES `cartItems` WRITE;
/*!40000 ALTER TABLE `cartItems` DISABLE KEYS */;
INSERT INTO `cartItems` VALUES (24,1,NULL,1,8,1350.0,2),(27,1,NULL,1,8,675.0,1),(28,1,NULL,1,8,675.0,1),(31,1,NULL,1,8,675.0,1),(42,1,4,1,8,950.0,2),(43,1,8,1,8,1350.0,2);
/*!40000 ALTER TABLE `cartItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catagory`
--

DROP TABLE IF EXISTS `catagory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catagory` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `catagory_name` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catagory`
--

LOCK TABLES `catagory` WRITE;
/*!40000 ALTER TABLE `catagory` DISABLE KEYS */;
INSERT INTO `catagory` VALUES (1,'cake'),(2,'cupcake'),(3,'brownie');
/*!40000 ALTER TABLE `catagory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveryStatus`
--

DROP TABLE IF EXISTS `deliveryStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveryStatus` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `delivery_status` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveryStatus`
--

LOCK TABLES `deliveryStatus` WRITE;
/*!40000 ALTER TABLE `deliveryStatus` DISABLE KEYS */;
INSERT INTO `deliveryStatus` VALUES (1,'waitingForConfirmation'),(2,'accepted'),(3,'onProgress'),(4,'dispatched'),(5,'declined');
/*!40000 ALTER TABLE `deliveryStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `price` decimal(5,1) DEFAULT NULL,
  `order_status` tinyint NOT NULL,
  `ordered_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `delivered_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `order_status` (`order_status`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`order_status`) REFERENCES `deliveryStatus` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(30) DEFAULT NULL,
  `product_quantity` decimal(2,1) DEFAULT NULL,
  `product_price` decimal(6,2) DEFAULT NULL,
  `catagory` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `catagory` (`catagory`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`catagory`) REFERENCES `catagory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Plain Cake',0.5,125.00,1),(2,'Plain Cake',1.0,200.00,1),(3,'Black Forest',0.5,250.00,1),(4,'Black Forest',1.0,475.00,1),(5,'White Forest',0.5,250.00,1),(6,'White Forest',1.0,475.00,1),(7,'Choco Truffle',0.5,350.00,1),(8,'Choco Truffle',1.0,675.00,1),(9,'Vennila Truffle',0.5,300.00,1),(10,'Vennila Truffle',1.0,575.00,1),(11,'Choco Vennila',0.5,400.00,1),(12,'Choco Vennila',1.0,775.00,1),(13,'Red Velvet',0.5,500.00,1),(14,'Red Velvet',1.0,975.00,1),(15,'Butter Scotch',0.5,350.00,1),(16,'Butter Scotch',1.0,675.00,1),(17,'Frosted Cupcake',4.0,100.00,2);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(70) DEFAULT NULL,
  `user_type` tinyint NOT NULL DEFAULT '2',
  `address` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_type` (`user_type`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_type`) REFERENCES `userType` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'arunkumar','arun@gmail.com','$2b$10$.y.vDc4ywKbsP1CmbpWl7uX7U9jYE1V8Ml4OlmKPTVUliuxtS9Fgq',2,NULL),(2,'arunkumar_2','arun+2@gmail.com','$2b$10$vOp2sz5VGywdz2n226Rblu3IrGkL4zoA8PhE0sI1HcvfsvcoyR1vW',2,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userOrder`
--

DROP TABLE IF EXISTS `userOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userOrder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `product_quantity` tinyint DEFAULT NULL,
  `invoice_id` int DEFAULT NULL,
  `price` decimal(5,1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  KEY `invoice_id` (`invoice_id`),
  CONSTRAINT `userOrder_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `userOrder_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `userOrder_ibfk_3` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userOrder`
--

LOCK TABLES `userOrder` WRITE;
/*!40000 ALTER TABLE `userOrder` DISABLE KEYS */;
/*!40000 ALTER TABLE `userOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userType`
--

DROP TABLE IF EXISTS `userType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userType` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `user_type` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userType`
--

LOCK TABLES `userType` WRITE;
/*!40000 ALTER TABLE `userType` DISABLE KEYS */;
INSERT INTO `userType` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `userType` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-21 15:00:38
