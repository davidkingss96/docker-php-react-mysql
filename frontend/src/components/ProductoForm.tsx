import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import productoService from '../services/productoService';

const ProductoForm = ({ producto, onProductoCreado, onProductoEditado, onClose }) => {
    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [loading, setLoading] = useState(false); // 🆕 Estado de carga

    useEffect(() => {
        if (producto) {
            setId(producto.id || null);
            setNombre(producto.nombre);
            setPrecio(producto.precio);
            setCantidad(producto.cantidad);
        } else {
            setId(null);
            setNombre('');
            setPrecio('');
            setCantidad('');
        }
    }, [producto]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // 🟡 Inicia carga

        const nuevoProducto = {
            id,
            nombre,
            precio: parseFloat(precio),
            cantidad: parseInt(cantidad)
        };

        try {
            let data;
            if (id) {
                data = await productoService.actualizar(nuevoProducto);
                onProductoEditado(data);
            } else {
                data = await productoService.guardar(nuevoProducto);
                onProductoCreado(data);
            }
            onClose(); // ✅ cerrar modal
        } catch (error) {
            console.error('Error guardando producto:', error);
        } finally {
            setLoading(false); // 🔴 termina carga
        }
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            disabled={loading} // 🚫 deshabilita durante carga
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type="number"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" role="status" className="me-2" />
                                Guardando...
                            </>
                        ) : (
                            id ? 'Actualizar' : 'Guardar'
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ProductoForm;
