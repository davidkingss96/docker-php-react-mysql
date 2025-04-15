import React, { useState, useEffect } from 'react';

const ProductoForm = ({ producto, onProductoCreado, onProductoEditado }) => {
    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');

    useEffect(() => {
        if (producto) {
            setId(producto.id || null);
            setNombre(producto.nombre);
            setPrecio(producto.precio);
            setCantidad(producto.cantidad);
        }
    }, [producto]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const nuevoProducto = {
            id, // Se envía el ID si existe
            nombre,
            precio: parseFloat(precio),
            cantidad: parseInt(cantidad)
        };
    
        try {
            let response;
            if (id) {
                // Editar producto existente
                response = await fetch(`/api/productos/actualizar`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevoProducto),
                });
            } else {
                // Crear nuevo producto
                response = await fetch('/api/productos/guardar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevoProducto),
                });
            }
    
            if (!response.ok) throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
    
            const text = await response.text();
            if (!text) {
                console.warn("La respuesta del servidor está vacía.");
                return;
            }
    
            const data = JSON.parse(text);
            if (!data || !data.producto) {
                console.warn("La respuesta del servidor no contiene un producto válido.");
                return;
            }
    
            id ? onProductoEditado(data.producto) : onProductoCreado(data.producto);
        } catch (error) {
            console.error('Error guardando producto:', error);
        }
    };
    

    return (
        <div className="container mt-5">
            <h2>{id ? 'Editar Producto' : 'Agregar Producto'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Campo oculto para el ID */}
                <input type="hidden" value={id || ''} />

                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input type="number" className="form-control" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-success">{id ? 'Actualizar' : 'Guardar'}</button>
            </form>
        </div>
    );
};

export default ProductoForm;
