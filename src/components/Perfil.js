import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
    const [usuario, setUsuario] = useState({ email: '', password: '', username: '' });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const onChange = e => setUsuario({ ...usuario, [e.target.name]: e.target.value });

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
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h2 className="text-center mb-4">Perfil</h2>
                <form onSubmit={updateUser}>
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <button type="submit" className="btn btn-primary form-control mt-4">Actualizar</button>
                </form>
                {mensaje && <p className="mt-3 text-success text-center">{mensaje}</p>}
                {error && <p className="mt-3 text-danger text-center">{error}</p>}
                <button className="btn btn-danger form-control mt-4" onClick={deleteUser}>Eliminar Cuenta</button>
            </div>
        </div>
    );
};

export default Perfil;
