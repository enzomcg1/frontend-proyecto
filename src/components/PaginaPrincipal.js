import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaPrincipal.css'; // Archivo CSS personalizado

const PaginaPrincipal = () => {
    const navigate = useNavigate();

    const components = [
        { name: 'Lista de Productos', route: '/listaProductos' },
        { name: 'Crear Productos', route: '/CrearProducto' },
        { name: 'POS', route: '/POS' },
        { name: 'Perfil', route: '/perfil' },
        { name: 'Clientes', route: '/clientes' },
        { name: 'Registro de Ventas', route: '/lista-ventas' }, // Nuevo botón para el registro de ventas
    ];

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Home</h1>
            <div className="row">
                {components.map((component, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <button
                            className="btn btn-primary w-100 hover-3d"
                            onClick={() => navigate(component.route)}
                        >
                            {component.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaginaPrincipal;