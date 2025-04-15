<form method="POST" action="/productos/actualizar?id=<?= $producto['id'] ?>">
    Nombre: <input type="text" name="nombre" value="<?= $producto['nombre'] ?>"><br>
    Precio: <input type="number" name="precio" value="<?= $producto['precio'] ?>"><br>
    Stock: <input type="number" name="cantidad" value="<?= $producto['cantidad'] ?>"><br>
    <button type="submit">Actualizar</button>
</form>