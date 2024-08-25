import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarProducto = ({ producto, onEditSuccess }) => {
  const [nombre, setNombre] = useState(producto.nombre);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [precio, setPrecio] = useState(producto.precio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/producto/${producto._id}`, {
        nombre,
        descripcion,
        precio,
      });
      alert('Producto actualizado con éxito');
      onEditSuccess();
    } catch (error) {
      console.error('Error actualizando el producto:', error);
      alert('Hubo un error actualizando el producto. Inténtalo nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label>Nombre del Producto</label>
        <input
          type='text'
          className='form-control'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label>Descripción</label>
        <textarea
          className='form-control'
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label>Precio</label>
        <input
          type='number'
          className='form-control'
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Guardar Cambios
      </button>
    </form>
  );
};

export default EditarProducto;
