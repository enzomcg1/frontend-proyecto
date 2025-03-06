import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
    const [usuario, setUsuario] = useState({ email: '', password: '', username: '' });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Obtener los datos del usuario al cargar el componente
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/auth/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsuario({ email: res.data.email, username: res.data.username });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    // Función para manejar cambios en los inputs
    const onChange = e => setUsuario({ ...usuario, [e.target.name]: e.target.value });

    // Función para actualizar los datos del usuario
    const updateUser = async e => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:4000/api/auth/user', usuario, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMensaje(response.data.message);
            setError('');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Error al actualizar usuario');
            }
            setMensaje('');
        }
    };

    // Función para eliminar la cuenta del usuario
    const deleteUser = async () => {
        try {
            await axios.delete('http://localhost:4000/api/auth/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            setError('Error al eliminar usuario');
        }
    };

    return (
        <div className="container-fluid p-4">
            <div className="row">
                {/* Cuadro grande para visualizar los datos del perfil */}
                <div className="col-md-8 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white">
                            <h4 className="mb-0">Datos del Perfil</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="fw-bold">Nombre de Usuario:</label>
                                <p>{usuario.username}</p>
                            </div>
                            <div className="mb-3">
                                <label className="fw-bold">Email:</label>
                                <p>{usuario.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cuadro pequeño para modificar los datos del perfil */}
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white">
                            <h4 className="mb-0">Modificar Perfil</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateUser}>
                                <div className="form-group mb-3">
                                    <label>Nombre de Usuario</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Ingrese su nombre de usuario"
                                        value={usuario.username}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Ingrese su email"
                                        value={usuario.email}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Ingrese su contraseña"
                                        value={usuario.password}
                                        onChange={onChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mb-3">
                                    Actualizar
                                </button>
                            </form>
                            <button className="btn btn-danger w-100" onClick={deleteUser}>
                                Eliminar Cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mensajes de éxito o error */}
            {mensaje && <p className="mt-3 text-success text-center">{mensaje}</p>}
            {error && <p className="mt-3 text-danger text-center">{error}</p>}
        </div>
    );
};

export default Perfil;