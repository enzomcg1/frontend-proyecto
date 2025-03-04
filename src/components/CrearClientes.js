import React, { useState } from 'react';
import axios from 'axios';

const CrearClientes = () => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [CI, setCi] = useState('');
    const [mensaje, setMensaje] = useState('');  // Inicializamos correctamente la variable

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Objeto de datos para enviar al backend
        const nuevoCliente = {
            nombre,
            direccion,
            telefono,
            CI,
            creditoAcumulado: 0, // Aseguramos que sea 'creditoAcumulado' para que coincida con el modelo
        };

        try {
            // Llamada a la API para agregar un nuevo cliente
            const respuesta = await axios.post('http://localhost:4000/api/clientes', nuevoCliente);
            setMensaje(respuesta.data.message);  // Se muestra el mensaje de éxito
            // Limpiar el formulario
            setNombre('');
            setDireccion('');
            setTelefono('');
            setCi('');
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
                        value={CI} 
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
