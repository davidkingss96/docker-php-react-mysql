<?php
// app/controllers/ProductoController.php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../models/ProductoModel.php';

class ProductoController
{
    private $model;

    public function __construct()
    {
        $this->model = new ProductoModel();
    }

    // Listar todos los productos
    public function listar()
    {
        $productos = $this->model->listarProductos();
        echo json_encode(["status" => "success", "productos" => $productos]);
    }

    // Guardar un nuevo producto
    public function guardar($data)
    {
        if (!$this->validarDatosProducto($data)) {
            echo json_encode(["error" => "Datos inválidos o incompletos"]);
            http_response_code(400);
            return;
        }

        $id = $this->model->crearProducto($data['nombre'], $data['precio'], $data['cantidad']);

        echo json_encode([
            "status" => "success",
            "message" => "Producto creado",
            "producto" => [
                "id" => $id,
                "nombre" => $data['nombre'],
                "precio" => $data['precio'],
                "cantidad" => $data['cantidad']
            ]
        ]);
    }

    // Actualizar un producto existente
    public function actualizar($id, $data)
    {
        if (!$this->validarDatosProducto($data)) {
            echo json_encode(["error" => "Datos inválidos o incompletos"]);
            http_response_code(400);
            return;
        }

        $this->model->actualizarProducto($id, $data['nombre'], $data['precio'], $data['cantidad']);

        echo json_encode([
            "status" => "success",
            "message" => "Producto actualizado",
            "producto" => [
                "id" => $id,
                "nombre" => $data['nombre'],
                "precio" => $data['precio'],
                "cantidad" => $data['cantidad']
            ]
        ]);
    }

    // Eliminar un producto
    public function eliminar($id)
    {
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID inválido"]);
            return;
        }

        $this->model->eliminarProducto($id);

        echo json_encode([
            "status" => "success",
            "message" => "Producto eliminado",
            "productoId" => $id
        ]);
    }

    // Función auxiliar para validar datos
    private function validarDatosProducto($data)
    {
        if (
            !isset($data['nombre'], $data['precio'], $data['cantidad']) ||
            !is_string($data['nombre']) || trim($data['nombre']) === '' ||
            !is_numeric($data['precio']) || $data['precio'] <= 0 ||
            !is_numeric($data['cantidad']) || intval($data['cantidad']) < 0
        ) {
            return false;
        }

        return true;
    }
}
