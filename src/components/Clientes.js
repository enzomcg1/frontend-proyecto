import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ci, setCI] = useState('');
    const [creditoAcumulado, setCreditoAcumulado] = useState('');
    const [editarId, setEditarId] = useState(null);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const res = await axios.get(`${API_URL}/clientes`);
                setClientes(res.data);
            } catch (error) {
                console.error('Error al obtener los clientes:', error);
            }
        };

        fetchClientes();
    }, []);

    const agregarCliente = async (e) => {
        e.preventDefault();
        try {
            const nuevoCliente = { nombre, direccion, telefono, ci, creditoAcumulado };
            if (editarId) {
                await axios.put(`${API_URL}/clientes/${editarId}`, nuevoCliente);
                setClientes(clientes.map(cliente => (cliente._id === editarId ? { ...cliente, ...nuevoCliente } : cliente)));
                setEditarId(null);
            } else {
                const res = await axios.post(`${API_URL}/clientes`, nuevoCliente);
                setClientes([...clientes, res.data]);
            }
            setNombre('');
            setDireccion('');
            setTelefono('');
            setCI('');
            setCreditoAcumulado('');
        } catch (error) {
            console.error('Error al agregar o actualizar cliente:', error);
        }
    };

    const eliminarCliente = async (id) => {
        try {
            await axios.delete(`${API_URL}/clientes/${id}`);
            setClientes(clientes.filter(cliente => cliente._id !== id));
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
        }
    };

    const iniciarEdicion = (cliente) => {
        setNombre(cliente.nombre);
        setDireccion(cliente.direccion);
        setTelefono(cliente.telefono);
        setCI(cliente.ci);
        setCreditoAcumulado(cliente.creditoAcumulado);
        setEditarId(cliente._id);
    };

    return (
        <div className="container">
            <h2 className="my-4">{editarId ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
            <form onSubmit={agregarCliente} className="mb-4">
                <div className="row">
                    <div className="col-md-3">
                        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="form-control mb-2" />
                    </div>
                    <div className="col-md-3">
                        <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required className="form-control mb-2" />
                    </div>
                    <div className="col-md-2">
                        <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required className="form-control mb-2" />
                    </div>
                    <div className="col-md-2">
                        <input type="text" placeholder="CI" value={ci} onChange={(e) => setCI(e.target.value)} required className="form-control mb-2" />
                    </div>
                    <div className="col-md-2">
                        <input type="number" placeholder="Crédito Acumulado" value={creditoAcumulado} onChange={(e) => setCreditoAcumulado(e.target.value)} required className="form-control mb-2" />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary w-100">
                            {editarId ? 'Actualizar Cliente' : 'Agregar Cliente'}
                        </button>
                    </div>
                </div>
            </form>

            <h3>Lista de Clientes</h3>
            <div className="row">
                {clientes.map(cliente => (
                    <div className="col-md-4 p-2" key={cliente._id}>
                        <div className="card">
                            <div className="card-header">
                                <h4>{cliente.nombre}</h4>
                                <p>{cliente.direccion}</p>
                                <p>{cliente.telefono}</p>
                                <p>CI: {cliente.ci}</p>
                                <p>Crédito Acumulado: {cliente.creditoAcumulado}</p>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-warning w-100 mb-2" onClick={() => iniciarEdicion(cliente)}>
                                    Editar
                                </button>
                                <button className="btn btn-danger w-100" onClick={() => eliminarCliente(cliente._id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clientes;
