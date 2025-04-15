<?php
// app/models/ProductoModel.php
require_once __DIR__ . '/../config/db.php';

class ProductoModel
{
    private $conn;

    public function __construct()
    {
        global $conn;
        $this->conn = $conn;
    }

    // Obtener todos los productos
    public function listarProductos()
    {
        $query = "SELECT * FROM productos";
        $stmt = $this->conn->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Crear un nuevo producto
    public function crearProducto($nombre, $precio, $cantidad)
    {
        $query = "INSERT INTO productos (nombre, precio, cantidad) VALUES (:nombre, :precio, :cantidad)";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([
            ':nombre' => $nombre,
            ':precio' => $precio,
            ':cantidad' => $cantidad,
        ]);
        return $this->conn->lastInsertId();
    }

    // Actualizar un producto
    public function actualizarProducto($id, $nombre, $precio, $cantidad)
    {
        $query = "UPDATE productos SET nombre = :nombre, precio = :precio, cantidad = :cantidad WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([
            ':id' => $id,
            ':nombre' => $nombre,
            ':precio' => $precio,
            ':cantidad' => $cantidad,
        ]);
        return $stmt->rowCount();
    }

    // Eliminar un producto
    public function eliminarProducto($id)
    {
        $query = "DELETE FROM productos WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount();
    }
}