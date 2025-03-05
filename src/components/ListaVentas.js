import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListaVentas = () => {
    const [ventas, setVentas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerVentas = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/ventas');
                setVentas(res.data);
            } catch (error) {
                console.error('Error al obtener las ventas:', error);
            }
        };

        obtenerVentas();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Registro de Ventas</h2>
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/pagina-principal')}>
                Volver a la Página Principal
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th>Tipo de Venta</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta._id}>
                            <td>{venta._id}</td>
                            <td>{venta.clienteId?.nombre || 'Cliente no disponible'}</td>
                            <td>
                                <ul>
                                    {venta.productos.map((producto, index) => (
                                        <li key={index}>
                                            {producto.nombre} - Cantidad: {producto.cantidad} - Precio: {producto.precio}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>{venta.total}</td>
                            <td>{venta.tipoVenta}</td>
                            <td>{new Date(venta.fecha).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaVentas;