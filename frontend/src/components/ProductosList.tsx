import React, { useEffect, useState } from 'react';
import ProductoForm from './ProductoForm';
import productoService from '../services/productoService';
import { Button, Table, Spinner, Alert } from 'react-bootstrap';

const ProductosList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const data = await productoService.listar();
            setProductos(data);
        } catch (error) {
            console.error('Error fetching productos:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleProductoCreado = (nuevoProducto) => {
        setProductos([...productos, nuevoProducto]);
    };

    const handleProductoEditado = (productoEditado) => {
        setProductos(productos.map(prod => prod.id === productoEditado.id ? productoEditado : prod));
    };

    const handleEliminarProducto = async (id) => {
        try {
            await productoService.eliminar(id);
            setProductos(productos.filter(producto => producto.id !== id));
        } catch (error) {
            console.error('Error eliminando producto:', error);
            setError(error.message);
        }
    };

    const handleAbrirModalParaNuevo = () => {
        setProductoEditando(null);
        setMostrarModal(true);
    };

    const handleAbrirModalParaEditar = (producto) => {
        setProductoEditando(producto);
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Lista de Productos</h1>

            {loading && <div className="text-center"><Spinner animation="border" /></div>}
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

            {!loading && !error && (
                <>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(producto => (
                                <tr key={producto.id}>
                                    <td>{producto.id}</td>
                                    <td>{producto.nombre}</td>
                                    <td>${producto.precio}</td>
                                    <td>{producto.cantidad}</td>
                                    <td>
                                        <Button variant="secondary" size="sm" className="me-2" onClick={() => handleAbrirModalParaEditar(producto)}>
                                            Editar
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleEliminarProducto(producto.id)}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="text-center">
                        <Button variant="primary" onClick={handleAbrirModalParaNuevo}>
                            Agregar Producto
                        </Button>
                    </div>
                </>
            )}

            {mostrarModal && (
                <ProductoForm
                    producto={productoEditando}
                    onProductoCreado={handleProductoCreado}
                    onProductoEditado={handleProductoEditado}
                    onClose={handleCerrarModal}
                />
            )}
        </div>
    );
};

export default ProductosList;
