<?php
// app/views/productos/crear.php
echo "<h1>Crear Producto</h1>";
echo "<form method='POST' action='/productos/guardar'>";
echo "Nombre: <input type='text' name='nombre'><br>";
echo "Precio: <input type='number' name='precio'><br>";
echo "Cantidad: <input type='number' name='cantidad'><br>";
echo "<button type='submit'>Guardar</button>";
echo "</form>";