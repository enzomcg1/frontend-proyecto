import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navegacion.css'; // Archivo CSS personalizado

const Navegacion = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/pagina-principal">
                    ERG SYSTEM
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/pagina-principal">
                                        Página Principal
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/ListaProductos">
                                        Lista de productos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/CrearProducto">
                                        Crear productos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/POS">
                                        POS
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/clientes">
                                        Clientes
                                    </Link>
                                </li>
                                 <li className="nav-item">
                                    <Link className="nav-link hover-3d" to='/GestionarProveedores'>
                                        Proveedores
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/lista-ventas">
                                        Registro de Ventas
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/perfil">
                                        Perfil
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link hover-3d" onClick={handleLogout}>
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/pagina-principal">
                                        Página Principal
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/login">
                                        Iniciar sesión
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/registro">
                                        Registrarse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navegacion;