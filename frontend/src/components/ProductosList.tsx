import React, { useEffect, useState } from 'react';
import ProductoForm from './ProductoForm';

const ProductosList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await fetch('/api/productos');
            if (!response.ok) {
                throw new Error('Error al obtener productos');
            }
            const data = await response.json();
            setProductos(data.productos);
        } catch (error) {
            console.error('Error fetching productos:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleProductoCreado = (nuevoProducto) => {
        setProductos([...productos, nuevoProducto]);
        setMostrarFormulario(false);
    };

    const handleProductoEditado = (productoEditado) => {
        setProductos(productos.map(prod => prod.id === productoEditado.id ? productoEditado : prod));
        setProductoEditando(null);
        setMostrarFormulario(false);
    };

    const handleEliminarProducto = async (id) => {
        try {
            const response = await fetch(`/api/productos/eliminar`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
    
            if (!response.ok) {
                throw new Error('Error al eliminar producto');
            }
    
            setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
        } catch (error) {
            console.error('Error eliminando producto:', error);
            setError(error.message);
        }
    };

    const handleEditarProducto = (producto) => {
        setProductoEditando(producto);
        setMostrarFormulario(true);
    };

    if (mostrarFormulario) {
        return <ProductoForm producto={productoEditando} onProductoCreado={handleProductoCreado} onProductoEditado={handleProductoEditado} />;
    }

    if (loading) return <p className="text-center mt-5">Cargando productos...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="mb-4">Lista de Productos</h1>
            <ul className="list-group w-75">
                {productos.map(producto => (
                    <li key={producto.id} className="list-group-item">
                        <div className="row">
                            <div className="col-md-4">
                                <h5 className="fw-bold">{producto.nombre}</h5>
                            </div>
                            <div className="col-md-4">
                                <ul className="list-unstyled mb-0">
                                    <li><strong>Precio:</strong> <span className="badge bg-success">${producto.precio}</span></li>
                                    <li><strong>Cantidad:</strong> <span className="badge bg-primary">{producto.cantidad}</span></li>
                                </ul>
                            </div>
                            <div className="col-md-4 d-flex justify-content-end">
                                <button className="btn btn-secondary btn-sm me-2" onClick={() => handleEditarProducto(producto)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="btn btn-primary mt-3" onClick={() => { setMostrarFormulario(true); setProductoEditando(null); }}>Agregar Producto</button>
        </div>
    );
};

export default ProductosList;
