import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearProducto = () => {
  const valorInicial = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    proveedor: '', // Nuevo campo para el proveedor
  };

  const [producto, setProducto] = useState(valorInicial);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]); // Estado para almacenar los proveedores

  // Obtener las categorías y proveedores al cargar el componente
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/categorias');
        setCategorias(res.data);
      } catch (error) {
        console.error('Error obteniendo categorías:', error);
      }
    };

    const obtenerProveedores = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/proveedores');
        setProveedores(res.data);
      } catch (error) {
        console.error('Error obteniendo proveedores:', error);
      }
    };

    obtenerCategorias();
    obtenerProveedores();
  }, []);

  // Función para capturar los datos del formulario
  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: name === 'precio' ? parseFloat(value) : value,
    });
  };

  // Función para guardar los datos del producto
  const guardarDatos = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/producto', producto);
      setProducto(valorInicial); // Limpiar el formulario después de guardar
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

          {/* Campo para el nombre del producto */}
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

          {/* Campo para la descripción del producto */}
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

          {/* Campo para el precio del producto */}
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

          {/* Campo para seleccionar la categoría */}
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

          {/* Campo para seleccionar el proveedor */}
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

          {/* Botón para guardar el producto */}
          <button className="btn btn-primary form-control" type="submit">
            Guardar producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearProducto;