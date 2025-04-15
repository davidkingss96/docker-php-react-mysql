<?php
// app/models/ProductoModel.php

require_once __DIR__ . '/../config/db.php';
require_once 'Producto.php';

class ProductoModel
{
    // Obtener todos los productos
    public function listarProductos()
    {
        return Producto::all(); // Devuelve todos los productos como colección
    }

    // Crear un nuevo producto
    public function crearProducto($nombre, $precio, $cantidad)
    {
        $producto = Producto::create([
            'nombre' => $nombre,
            'precio' => $precio,
            'cantidad' => $cantidad
        ]);
        return $producto->id; // Retorna el ID generado
    }

    // Actualizar un producto
    public function actualizarProducto($id, $nombre, $precio, $cantidad)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return 0;
        }

        $producto->update([
            'nombre' => $nombre,
            'precio' => $precio,
            'cantidad' => $cantidad
        ]);

        return 1;
    }

    // Eliminar un producto
    public function eliminarProducto($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return 0;
        }

        $producto->delete();
        return 1;
    }
}
