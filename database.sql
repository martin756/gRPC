-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema retroshop
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `retroshop` ;

-- -----------------------------------------------------
-- Schema retroshop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `retroshop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `retroshop` ;

-- -----------------------------------------------------
-- Table `retroshop`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `retroshop`.`usuario` ;

CREATE TABLE IF NOT EXISTS `retroshop`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `dni` BIGINT(8) UNSIGNED ZEROFILL NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `contraseña` VARCHAR(45) NOT NULL,
  `saldo` FLOAT UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `retroshop`.`carrito`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `retroshop`.`carrito` ;

CREATE TABLE IF NOT EXISTS `retroshop`.`carrito` (
  `idcarrito` INT NOT NULL AUTO_INCREMENT,
  `total` FLOAT NULL DEFAULT NULL,
  `cliente_idusuario` INT NOT NULL,
  PRIMARY KEY (`idcarrito`),
  INDEX `fk_carrito_usuario1_idx` (`cliente_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_carrito_usuario1`
    FOREIGN KEY (`cliente_idusuario`)
    REFERENCES `retroshop`.`usuario` (`idusuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `retroshop`.`tipo_categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `retroshop`.`tipo_categoria` ;

CREATE TABLE IF NOT EXISTS `retroshop`.`tipo_categoria` (
  `idtipocategoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idtipocategoria`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `retroshop`.`producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `retroshop`.`producto` ;

CREATE TABLE IF NOT EXISTS `retroshop`.`producto` (
  `idproducto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `descripcion` VARCHAR(45) NULL DEFAULT NULL,
  `idtipocategoria` INT NULL DEFAULT NULL,
  `precio` FLOAT NULL DEFAULT NULL,
  `cantidad_disponible` INT NULL DEFAULT NULL,
  `fecha_publicacion` VARCHAR(45) NULL DEFAULT NULL,
  `publicador_idusuario` INT NULL DEFAULT NULL,
  `url_foto1` TEXT NULL DEFAULT NULL,
  `url_foto2` TEXT NULL DEFAULT NULL,
  `url_foto3` TEXT NULL DEFAULT NULL,
  `url_foto4` TEXT NULL DEFAULT NULL,
  `url_foto5` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idproducto`),
  INDEX `fk_idtipocategoria_idx` (`idtipocategoria` ASC) VISIBLE,
  INDEX `fk_producto_usuario1_idx` (`publicador_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_idtipocategoria`
    FOREIGN KEY (`idtipocategoria`)
    REFERENCES `retroshop`.`tipo_categoria` (`idtipocategoria`),
  CONSTRAINT `fk_producto_usuario1`
    FOREIGN KEY (`publicador_idusuario`)
    REFERENCES `retroshop`.`usuario` (`idusuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `retroshop`.`producto_carrito`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `retroshop`.`producto_carrito` ;

CREATE TABLE IF NOT EXISTS `retroshop`.`producto_carrito` (
  `idproducto_carrito` INT NOT NULL AUTO_INCREMENT,
  `idproducto` INT NULL DEFAULT NULL,
  `idcarrito` INT NULL DEFAULT NULL,
  `cantidad` INT NULL DEFAULT NULL,
  `subtotal` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`idproducto_carrito`),
  INDEX `fk_idproducto_idx` (`idproducto` ASC) VISIBLE,
  INDEX `fk_idcarrito_idx` (`idcarrito` ASC) VISIBLE,
  CONSTRAINT `fk_idcarrito`
    FOREIGN KEY (`idcarrito`)
    REFERENCES `retroshop`.`carrito` (`idcarrito`),
  CONSTRAINT `fk_idproducto`
    FOREIGN KEY (`idproducto`)
    REFERENCES `retroshop`.`producto` (`idproducto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `tipo_categoria` VALUES (1,'Videojuegos'),(2,'Musica'),(3,'Revistas'),(4,'Diarios'),(5,'Adornos');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
