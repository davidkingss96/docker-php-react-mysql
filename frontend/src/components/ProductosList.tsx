import React, { useEffect, useState } from 'react';
import ProductoForm from './ProductoForm';
import productoService from '../services/productoService';
import { Button, Table, Spinner, Alert, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ProductosList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);

    const [productoAEliminar, setProductoAEliminar] = useState(null);
    const [eliminandoId, setEliminandoId] = useState(null);

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

    const confirmarEliminarProducto = async (id) => {
        setEliminandoId(id);
        try {
            await productoService.eliminar(id);
            setProductos(productos.filter(producto => producto.id !== id));
            toast.success('Producto eliminado correctamente');
        } catch (error) {
            console.error('Error eliminando producto:', error);
            setError(error.message);
            toast.error('Ocurrió un error al eliminar el producto');
        } finally {
            setEliminandoId(null);
            setProductoAEliminar(null);
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
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleAbrirModalParaEditar(producto)}
                                            disabled={!!eliminandoId}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => setProductoAEliminar(producto)}
                                            disabled={!!eliminandoId}
                                        >
                                            {eliminandoId === producto.id ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : 'Eliminar'}
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

            {productoAEliminar && (
                <Modal show onHide={() => setProductoAEliminar(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar eliminación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Estás seguro de que deseas eliminar <strong>{productoAEliminar.nombre}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setProductoAEliminar(null)} disabled={!!eliminandoId}>
                            Cancelar
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => confirmarEliminarProducto(productoAEliminar.id)}
                            disabled={!!eliminandoId}
                        >
                            {eliminandoId === productoAEliminar.id ? (
                                <Spinner animation="border" size="sm" />
                            ) : 'Eliminar'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default ProductosList;
