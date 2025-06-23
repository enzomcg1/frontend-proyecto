import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GestionarProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: '',
    contacto: '',
    direccion: '',
  });

  // Obtener los proveedores al cargar el componente
  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/proveedores`);
        setProveedores(res.data);
      } catch (error) {
        console.error('Error obteniendo proveedores:', error);
      }
    };

    obtenerProveedores();
  }, []);

  // Función para capturar los datos del formulario
  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor({
      ...nuevoProveedor,
      [name]: value,
    });
  };

  // Función para guardar un nuevo proveedor
  const guardarProveedor = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/proveedores`, nuevoProveedor);
      setProveedores([...proveedores, res.data]);
      setNuevoProveedor({ nombre: '', contacto: '', direccion: '' });
      alert('Proveedor guardado con éxito');
    } catch (error) {
      console.error('Error guardando el proveedor:', error);
      alert('Hubo un error guardando el proveedor. Inténtalo nuevamente.');
    }
  };

  // Función para eliminar un proveedor
  const eliminarProveedor = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/proveedores/${id}`);
      setProveedores(proveedores.filter((proveedor) => proveedor._id !== id));
      alert('Proveedor eliminado con éxito');
    } catch (error) {
      console.error('Error eliminando el proveedor:', error);
      alert('Hubo un error eliminando el proveedor. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="col-md-8 offset-md-2">
      <div className="card card-body">
        <h2 className="text-center">Gestionar Proveedores</h2>

        {/* Formulario para agregar un nuevo proveedor */}
        <form onSubmit={guardarProveedor}>
          <div className="mb-3">
            <label>Nombre del proveedor</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Ingresar el nombre del proveedor"
              value={nuevoProveedor.nombre}
              onChange={capturarDatos}
              required
            />
          </div>

          <div className="mb-3">
            <label>Contacto</label>
            <input
              type="text"
              name="contacto"
              className="form-control"
              placeholder="Ingresar el contacto del proveedor"
              value={nuevoProveedor.contacto}
              onChange={capturarDatos}
              required
            />
          </div>

          <div className="mb-3">
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              className="form-control"
              placeholder="Ingresar la dirección del proveedor"
              value={nuevoProveedor.direccion}
              onChange={capturarDatos}
              required
            />
          </div>

          <button className="btn btn-primary form-control" type="submit">
            Agregar Proveedor
          </button>
        </form>

        {/* Lista de proveedores */}
        <h3 className="mt-4">Lista de Proveedores</h3>
        <ul className="list-group">
          {proveedores.map((proveedor) => (
            <li
              key={proveedor._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{proveedor.nombre}</strong>
                <br />
                <small>Contacto: {proveedor.contacto}</small>
                <br />
                <small>Dirección: {proveedor.direccion}</small>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => eliminarProveedor(proveedor._id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GestionarProveedores;
