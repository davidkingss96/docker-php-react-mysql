<?php
require_once __DIR__ . '/controllers/ProductoController.php';

header('Content-Type: application/json'); // Asegura que todas las respuestas sean JSON
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$controller = new ProductoController();

$route = $_GET['url'];

switch ($route) {
    case 'api/productos': 
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $controller->listar();
        }
        break;

    case 'api/productos/guardar':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            $controller->guardar($data);
        }
        break;

    case 'api/productos/actualizar':
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $data = json_decode(file_get_contents('php://input'), true);
            $id = $data['id'] ?? null; // Obtener el ID desde el cuerpo de la solicitud
            if ($id) {
                $controller->actualizar($id, $data);
            } else {
                echo json_encode(["error" => "ID no proporcionado"]);
                http_response_code(400);
            }
        }
        break;

    case 'api/productos/eliminar':
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $data = json_decode(file_get_contents("php://input"), true);
            $id = $data['id'] ?? null;
        
            if ($id) {
                $controller->eliminar($id);
                echo json_encode(["mensaje" => "Producto eliminado correctamente"]);
            } else {
                http_response_code(400);
                echo json_encode(["error" => "ID no proporcionado"]);
            }
        }
        
        break;

    default:
        echo json_encode(["error" => "Ruta no encontrada"]);
        http_response_code(404);
        break;
}
