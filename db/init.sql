CREATE DATABASE IF NOT EXISTS almacen;
USE almacen;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    cantidad INT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de logs
CREATE TABLE IF NOT EXISTS logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    accion ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    producto_id INT,
    nombre VARCHAR(255),
    precio DECIMAL(10,2),
    cantidad INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para INSERT
DELIMITER //
CREATE TRIGGER after_producto_insert
AFTER INSERT ON productos
FOR EACH ROW
BEGIN
    INSERT INTO logs (accion, producto_id, nombre, precio, cantidad)
    VALUES ('INSERT', NEW.id, NEW.nombre, NEW.precio, NEW.cantidad);
END;
//
DELIMITER ;

-- Trigger para UPDATE
DELIMITER //
CREATE TRIGGER after_producto_update
AFTER UPDATE ON productos
FOR EACH ROW
BEGIN
    INSERT INTO logs (accion, producto_id, nombre, precio, cantidad)
    VALUES ('UPDATE', NEW.id, NEW.nombre, NEW.precio, NEW.cantidad);
END;
//
DELIMITER ;

-- Trigger para DELETE
DELIMITER //
CREATE TRIGGER after_producto_delete
AFTER DELETE ON productos
FOR EACH ROW
BEGIN
    INSERT INTO logs (accion, producto_id, nombre, precio, cantidad)
    VALUES ('DELETE', OLD.id, OLD.nombre, OLD.precio, OLD.cantidad);
END;
//
DELIMITER ;
