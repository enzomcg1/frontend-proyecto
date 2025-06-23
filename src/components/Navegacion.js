import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navegacion.css'; // Tu archivo de estilos personalizados

const Navegacion = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');
    const username = localStorage.getItem('username'); // Obtener el nombre del usuario

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    // Función para colapsar el menú (solo en móviles)
    const colapsarMenu = () => {
        const navCollapse = document.getElementById('navbarNav');
        if (navCollapse && navCollapse.classList.contains('show')) {
            new window.bootstrap.Collapse(navCollapse).hide();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/pagina-principal" onClick={colapsarMenu}>
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
                                    <Link className="nav-link hover-3d" to="/pagina-principal" onClick={colapsarMenu}>
                                        Página Principal
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/ListaProductos" onClick={colapsarMenu}>
                                        Lista de productos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/CrearProducto" onClick={colapsarMenu}>
                                        Crear productos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/POS" onClick={colapsarMenu}>
                                        POS
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/clientes" onClick={colapsarMenu}>
                                        Clientes
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/GestionarProveedores" onClick={colapsarMenu}>
                                        Proveedores
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/lista-ventas" onClick={colapsarMenu}>
                                        Registro de Ventas
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/perfil" onClick={colapsarMenu}>
                                        Perfil
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link text-white">
                                        👤 {username}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-link hover-3d"
                                        onClick={() => {
                                            handleLogout();
                                            colapsarMenu();
                                        }}
                                    >
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/pagina-principal" onClick={colapsarMenu}>
                                        Página Principal
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/login" onClick={colapsarMenu}>
                                        Iniciar sesión
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link hover-3d" to="/registro" onClick={colapsarMenu}>
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
