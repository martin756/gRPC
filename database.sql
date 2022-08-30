-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: retroshop
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `billetera_virtual`
--

DROP TABLE IF EXISTS `billetera_virtual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billetera_virtual` (
  `idbilleteravirtual` int NOT NULL,
  `idusuario` int DEFAULT NULL,
  `saldo` float DEFAULT NULL,
  PRIMARY KEY (`idbilleteravirtual`),
  KEY `fk_idusuario_idx` (`idusuario`),
  CONSTRAINT `fk_idusuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billetera_virtual`
--

LOCK TABLES `billetera_virtual` WRITE;
/*!40000 ALTER TABLE `billetera_virtual` DISABLE KEYS */;
/*!40000 ALTER TABLE `billetera_virtual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `idcarrito` int NOT NULL,
  `idbilleteravirtualcomprador` int NOT NULL,
  `idbilleteravirtualvendedor` int NOT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`idcarrito`),
  KEY `fk_idbilleteravirtual_idx` (`idbilleteravirtualcomprador`),
  KEY `fk_idbilleteravirtualvendedor_idx` (`idbilleteravirtualvendedor`),
  CONSTRAINT `fk_idbilleteravirtualcomprador` FOREIGN KEY (`idbilleteravirtualcomprador`) REFERENCES `billetera_virtual` (`idbilleteravirtual`),
  CONSTRAINT `fk_idbilleteravirtualvendedor` FOREIGN KEY (`idbilleteravirtualvendedor`) REFERENCES `billetera_virtual` (`idbilleteravirtual`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idproducto` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `idtipocategoria` int DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `cantidad_disponible` int DEFAULT NULL,
  `fecha_publicacion` datetime DEFAULT NULL,
  PRIMARY KEY (`idproducto`),
  KEY `fk_idtipocategoria_idx` (`idtipocategoria`),
  CONSTRAINT `fk_idtipocategoria` FOREIGN KEY (`idtipocategoria`) REFERENCES `tipo_categoria` (`idtipocategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_carrito`
--

DROP TABLE IF EXISTS `producto_carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_carrito` (
  `idproducto_carrito` int NOT NULL,
  `idproducto` int DEFAULT NULL,
  `idcarrito` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `subtotal` float DEFAULT NULL,
  PRIMARY KEY (`idproducto_carrito`),
  KEY `fk_idproducto_idx` (`idproducto`),
  KEY `fk_idcarrito_idx` (`idcarrito`),
  CONSTRAINT `fk_idcarrito` FOREIGN KEY (`idcarrito`) REFERENCES `carrito` (`idcarrito`),
  CONSTRAINT `fk_idproducto` FOREIGN KEY (`idproducto`) REFERENCES `producto` (`idproducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_carrito`
--

LOCK TABLES `producto_carrito` WRITE;
/*!40000 ALTER TABLE `producto_carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto_carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_categoria`
--

DROP TABLE IF EXISTS `tipo_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_categoria` (
  `idtipocategoria` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idtipocategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_categoria`
--

LOCK TABLES `tipo_categoria` WRITE;
/*!40000 ALTER TABLE `tipo_categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `dni` bigint(8) unsigned zerofill NOT NULL,
  `email` varchar(45) NOT NULL,
  `usuario` varchar(45) NOT NULL,
  `contraseña` varchar(45) NOT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-30 18:09:16
