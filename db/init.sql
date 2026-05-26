CREATE DATABASE IF NOT EXISTS proyecto_db;

USE proyecto_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL
);

INSERT INTO usuarios (nombre, correo) VALUES
('Juan Pérez', 'juan@example.com'),
('María Gómez', 'maria@example.com'),
('Carlos López', 'carlos@example.com');
