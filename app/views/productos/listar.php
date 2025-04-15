<?php
// app/views/productos/listar.php
echo "<h1>Lista de Productos</h1>";
echo "<ul>";
foreach ($productos as $producto) {
    echo "<li>";
    echo "{$producto['nombre']} - {$producto['precio']} - {$producto['cantidad']}";
    
    // Botón para editar
    echo " <a href='/productos/editar?id={$producto['id']}'>Editar</a>";
    
    // Botón para eliminar
    echo " <a href='/productos/eliminar?id={$producto['id']}'>Eliminar</a>";
    
    echo "</li>";
}
echo "</ul>";
echo "<a href='/productos/crear'>Crear Producto</a>";