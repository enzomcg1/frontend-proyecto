import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearProducto = () => {
  const valorInicial = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    proveedor: '',
  };

  const [producto, setProducto] = useState(valorInicial);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/categorias`);
        setCategorias(res.data);
      } catch (error) {
        console.error('Error obteniendo categorías:', error);
      }
    };

    const obtenerProveedores = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/proveedores`);
        setProveedores(res.data);
      } catch (error) {
        console.error('Error obteniendo proveedores:', error);
      }
    };

    obtenerCategorias();
    obtenerProveedores();
  }, []);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: name === 'precio' ? parseFloat(value) : value,
    });
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/producto`, producto);
      setProducto(valorInicial);
      alert('Producto guardado con éxito');
    } catch (error) {
      console.error('Error guardando el producto:', error);
      alert('Hubo un error guardando el producto. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={guardarDatos}>
          <h2 className="text-center">Agregar producto</h2>

          <div className="mb-3">
            <label>Nombre del producto</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Ingresar el nombre del producto"
              value={producto.nombre}
              onChange={capturarDatos}
              required
            />
          </div>

          <div className="mb-3">
            <label>Descripción</label>
            <input
              type="text"
              name="descripcion"
              className="form-control"
              placeholder="Ingresar la descripción del producto"
              value={producto.descripcion}
              onChange={capturarDatos}
              required
            />
          </div>

          <div className="mb-3">
            <label>Precio</label>
            <input
              type="number"
              name="precio"
              className="form-control"
              placeholder="Ingresar precio del producto"
              value={producto.precio}
              onChange={capturarDatos}
              required
              min="0"
            />
          </div>

          <div className="mb-3">
            <label>Categoría</label>
            <select
              name="categoria"
              className="form-control"
              value={producto.categoria}
              onChange={capturarDatos}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria._id} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Proveedor</label>
            <select
              name="proveedor"
              className="form-control"
              value={producto.proveedor}
              onChange={capturarDatos}
              required
            >
              <option value="">Selecciona un proveedor</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor._id} value={proveedor._id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary form-control" type="submit">
            Guardar producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearProducto;
