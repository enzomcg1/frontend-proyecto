import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditarProducto from './EditarProducto';

const ListaUsuario = () => {
  const [lista, setLista] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);

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

  const EditarProductoHandler = (producto) => {
    setProductoEditando(producto);
  };

  const handleEditSuccess = () => {
    setProductoEditando(null);
    // Refresca la lista de productos después de editar
    const getProductos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/producto');
        setLista(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProductos();
  };

  // Función para agrupar productos por categoría
  const agruparPorCategoria = (productos) => {
    return productos.reduce((resultado, producto) => {
      (resultado[producto.categoria] = resultado[producto.categoria] || []).push(producto);
      return resultado;
    }, {});
  };

  // Agrupar los productos antes de renderizar
  const productosPorCategoria = agruparPorCategoria(lista);

  return (
    <div>
      {productoEditando ? (
        <EditarProducto producto={productoEditando} onEditSuccess={handleEditSuccess} />
      ) : (
        Object.keys(productosPorCategoria).map(categoria => (
          <div key={categoria} className='mb-4'>
            <h3>{categoria.replace(/-/g, ' ')}</h3> {/* Reemplaza guiones con espacios */}
            <div className='row'>
              {productosPorCategoria[categoria].map(producto => (
                <div className='col-md-4 p-2' key={producto._id}>
                  <div className='card'>
                    <div className='card-header'>
                      <h4>Nombre del producto: {producto.nombre}</h4>
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
                        onClick={() => EditarProductoHandler(producto)}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaUsuario;
