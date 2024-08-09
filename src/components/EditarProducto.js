import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditarProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState({ nombre: '', descripcion: '', precio: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const getProducto = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/producto/${id}`);
                setProducto(res.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        getProducto();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/producto/${id}`, producto);
            alert('Producto actualizado con éxito');
            navigate('/');
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Hubo un error actualizando el producto. Inténtalo nuevamente.');
        }
    };

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h2 className="text-center mb-4">Editar Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre del Producto</label>
                        <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            value={producto.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción del Producto</label>
                        <input
                            type="text"
                            name="descripcion"
                            className="form-control"
                            value={producto.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio del Producto</label>
                        <input
                            type="number"
                            name="precio"
                            className="form-control"
                            value={producto.precio}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary form-control mt-4">Actualizar Producto</button>
                </form>
            </div>
        </div>
    );
};

export default EditarProducto;
