<?php
// app/config/db.php
$host = 'db'; // Nombre del servicio en docker-compose.yml
$dbname = 'almacen';
$user = 'almacen_user';
$password = 'almacen_pass';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}