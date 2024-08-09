import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaUsuario = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const getProductos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/producto');
        console.log('Datos recibidos:', res.data); // Imprime los datos para ver la estructura
        setLista(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProductos();
  }, []);

  const EliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/producto/${id}`);
      setLista(lista.filter(producto => producto._id !== id)); // Actualiza la lista después de eliminar
      alert('Producto eliminado con éxito');
    } catch (error) {
      console.error('Error eliminando el producto:', error);
      alert('Hubo un error eliminando el producto. Inténtalo nuevamente.');
    }
  };

  const EditarProducto = (id) => {
    // Aquí puedes implementar la lógica para editar el producto
    alert(`Editar producto con ID: ${id}`);
  };

  return (
    <div className='row'>
      {lista.map(producto => (
        <div className='col-md-4 p-2' key={producto._id}>
          <div className='card'>
            <div className='card-header'>
              <h4>Nombre del producto: {producto.nombre}</h4> {/* Usa los nombres correctos aquí */}
              <p>Descripción del producto: {producto.descripcion}</p>
              <p>Precio del producto: {producto.precio} PYG</p>
            </div>
            <div className='card-footer'>
              <button
                className='btn btn-danger'
                onClick={() => EliminarProducto(producto._id)}
              >
                Eliminar
              </button>
              <button
                className='btn btn-warning ml-2'
                onClick={() => EditarProducto(producto._id)}
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaUsuario;
