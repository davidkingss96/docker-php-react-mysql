<?php
// app/models/Producto.php

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'productos'; // Nombre de la tabla

    // Campos que se pueden asignar masivamente
    protected $fillable = ['nombre', 'precio', 'cantidad'];

    // Opcional: si no usás timestamps (created_at / updated_at)
    public $timestamps = false;
}
