import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const CrearClientes = () => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ci, setCi] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoCliente = {
            nombre,
            direccion,
            telefono,
            ci,
            creditoAcumulado: 0,
        };

        try {
            const respuesta = await axios.post(`${API_URL}/clientes`, nuevoCliente);
            setMensaje(respuesta.data.message || 'Cliente agregado correctamente');

            // Limpiar campos
            setNombre('');
            setDireccion('');
            setTelefono('');
            setCi('');

            // Redirigir a clientes y forzar reload para ver el nuevo cliente
            setTimeout(() => {
                window.location.href = '/clientes';
            }, 1000);
        } catch (error) {
            console.error('Error al agregar cliente:', error);
            setMensaje('Hubo un problema al agregar el cliente.');
        }
    };

    return (
        <div className="container">
            <h2>Crear Nuevo Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        id="telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ci" className="form-label">CI</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ci"
                        value={ci}
                        onChange={(e) => setCi(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Agregar Cliente</button>
            </form>
            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
    );
};

export default CrearClientes;
