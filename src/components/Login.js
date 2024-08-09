import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [usuario, setUsuario] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', usuario);
            localStorage.setItem('token', response.data.token);
            alert('Inicio de sesión exitoso');
            navigate('components/ListaProductos.js'); // Redirige a la página de ListaProductos
        } catch (error) {
            console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
            alert(`Error al iniciar sesión: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h2 className="text-center mb-4">Inicio de Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Ingrese su email"
                            value={usuario.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                name="password"
                                placeholder="Ingrese su contraseña"
                                value={usuario.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary form-control mt-4">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
