import React, { useState } from 'react';
import axios from 'axios';

const CrearProducto = () => {
  const valorInicial = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: ''  // Agregamos la categoría al valor inicial
  };

  const [producto, setProducto] = useState(valorInicial);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: name === 'precio' ? parseFloat(value) : value
    });
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/producto', producto);
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
              <option value="limpieza">Limpieza</option>
              <option value="gaseosas">Gaseosas</option>
              <option value="bebidas-alcoholicas">Bebidas Alcohólicas</option>
              <option value="embutidos">Embutidos</option>
              <option value="panes">Panes</option>
              <option value="cocina">Cocina</option>
              <option value="remedios-para-mate">Remedios para Mate</option>
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
