import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navegacion from './components/Navegacion';
import ListaProductos from './components/ListaProductos';
import Registro from './components/Registro';
import Login from './components/Login';
import CrearProductos from './components/CrearProductos';
import Perfil from './components/Perfil';
import VentaDeProductos from './components/VentaDeProductos';
import PaginaPrincipal from './components/PaginaPrincipal';
import Clientes from './components/Clientes';
import ListaVentas from './components/ListaVentas'; // Importar el nuevo componente

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <div className="App">
            <Navegacion />
            <div className="container p-4">
                <Routes>
                    {isAuthenticated ? (
                        <>
                            <Route path="/pagina-principal" element={<PaginaPrincipal />} />
                            <Route path="/ListaProductos" element={<ListaProductos />} />
                            <Route path="/CrearProducto" element={<CrearProductos />} />
                            <Route path="/perfil" element={<Perfil />} />
                            <Route path="/POS" element={<VentaDeProductos />} />
                            <Route path="/clientes" element={<Clientes />} />
                            <Route path="/lista-ventas" element={<ListaVentas />} /> {/* Nueva ruta para ListaVentas */}
                            <Route path="*" element={<Navigate to="/pagina-principal" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/registro" element={<Registro />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
            </div>
        </div>
    );
};

export default App;