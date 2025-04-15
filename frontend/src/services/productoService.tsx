// src/services/productoService.js
import axios from 'axios';

const API_BASE = '/api/productos';

const productoService = {
    listar: async () => {
        const response = await axios.get(API_BASE);
        return response.data.productos;
    },

    guardar: async (producto) => {
        const response = await axios.post(`${API_BASE}/guardar`, producto);
        return response.data.producto;
    },

    actualizar: async (producto) => {
        const response = await axios.put(`${API_BASE}/actualizar`, producto);
        return response.data.producto;
    },

    eliminar: async (id) => {
        await axios.delete(`${API_BASE}/eliminar`, { data: { id } });
    }
};

export default productoService;
