import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditarProducto from './EditarProducto';
import './ListaProductos.css'; // Importa el archivo CSS

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormularioCategoria, setMostrarFormularioCategoria] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaEditando, setCategoriaEditando] = useState(null);

  // Obtener la lista de productos y categorías al cargar el componente
  useEffect(() => {
    const getProductos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/producto');
        setProductos(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const getCategorias = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/categorias');
        setCategorias(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getProductos();
    getCategorias();
  }, []);

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/producto/${id}`);
      setProductos(productos.filter(producto => producto._id !== id));
      alert('Producto eliminado con éxito');
    } catch (error) {
      console.error('Error eliminando el producto:', error);
      alert('Hubo un error eliminando el producto. Inténtalo nuevamente.');
    }
  };

  // Función para manejar la edición de un producto
  const editarProductoHandler = (producto) => {
    setProductoEditando(producto);
  };

  // Función para manejar el éxito de la edición
  const handleEditSuccess = () => {
    setProductoEditando(null);
    const getProductos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/producto');
        setProductos(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProductos();
  };

  // Función para agregar una nueva categoría
  const agregarCategoria = async () => {
    if (!nuevaCategoria) {
      alert('Por favor, ingresa el nombre de la categoría.');
      return;
    }

    try {
      await axios.post('http://localhost:4000/api/categorias', { nombre: nuevaCategoria });
      alert('Categoría agregada con éxito');
      setNuevaCategoria('');
      setMostrarFormularioCategoria(false);
      const res = await axios.get('http://localhost:4000/api/categorias');
      setCategorias(res.data);
    } catch (error) {
      console.error('Error agregando la categoría:', error);
      alert('Hubo un error agregando la categoría. Inténtalo nuevamente.');
    }
  };

  // Función para eliminar una categoría
  const eliminarCategoria = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/categorias/${id}`);
      alert('Categoría eliminada con éxito');
      const res = await axios.get('http://localhost:4000/api/categorias');
      setCategorias(res.data);
    } catch (error) {
      console.error('Error eliminando la categoría:', error);
      alert('Hubo un error eliminando la categoría. Inténtalo nuevamente.');
    }
  };

  // Función para editar una categoría
  const editarCategoria = async () => {
    if (!nuevaCategoria) {
      alert('Por favor, ingresa el nombre de la categoría.');
      return;
    }

    try {
      await axios.put(`http://localhost:4000/api/categorias/${categoriaEditando._id}`, {
        nombre: nuevaCategoria,
      });
      alert('Categoría editada con éxito');
      setNuevaCategoria('');
      setCategoriaEditando(null);
      const res = await axios.get('http://localhost:4000/api/categorias');
      setCategorias(res.data);
    } catch (error) {
      console.error('Error editando la categoría:', error);
      alert('Hubo un error editando la categoría. Inténtalo nuevamente.');
    }
  };

  // Función para agrupar productos por categoría
  const agruparPorCategoria = (productos) => {
    return productos.reduce((resultado, producto) => {
      (resultado[producto.categoria] = resultado[producto.categoria] || []).push(producto);
      return resultado;
    }, {});
  };

  // Agrupar los productos antes de renderizar
  const productosPorCategoria = agruparPorCategoria(productos);

  return (
    <div className="container-fluid p-4 bg-dark text-light">
      {productoEditando ? (
        <EditarProducto producto={productoEditando} onEditSuccess={handleEditSuccess} />
      ) : (
        <>
          {/* Botón para mostrar/ocultar el formulario de nueva categoría */}
          <button
            className='btn btn-primary hover-3d mb-3'
            onClick={() => {
              setMostrarFormularioCategoria(!mostrarFormularioCategoria);
              setCategoriaEditando(null);
            }}
          >
            {mostrarFormularioCategoria ? 'Ocultar Formulario' : 'Agregar Nueva Categoría'}
          </button>

          {/* Formulario para agregar o editar una categoría */}
          {mostrarFormularioCategoria && (
            <div className='card p-3 mb-3 shadow-sm' style={{ maxWidth: '400px', margin: '0 auto' }}>
              <h4 className="text-center">{categoriaEditando ? 'Editar Categoría' : 'Agregar Nueva Categoría'}</h4>
              <div className='form-group'>
                <label>Nombre de la categoría:</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ingresa el nombre de la categoría'
                  value={nuevaCategoria}
                  onChange={(e) => setNuevaCategoria(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button
                  className='btn btn-primary hover-3d'
                  onClick={categoriaEditando ? editarCategoria : agregarCategoria}
                >
                  {categoriaEditando ? 'Guardar Cambios' : 'Guardar Categoría'}
                </button>
                {categoriaEditando && (
                  <button
                    className='btn btn-secondary hover-3d'
                    onClick={() => {
                      setCategoriaEditando(null);
                      setNuevaCategoria('');
                    }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Lista de categorías con botones para editar y eliminar */}
          <div className='mb-4'>
            <h3>Categorías</h3>
            <ul className='list-group'>
              {categorias.map((categoria) => (
                <li key={categoria._id} className='list-group-item d-flex justify-content-between align-items-center bg-dark text-light'>
                  {categoria.nombre}
                  <div>
                    <button
                      className='btn btn-warning btn-sm me-2 hover-3d'
                      onClick={() => {
                        setCategoriaEditando(categoria);
                        setNuevaCategoria(categoria.nombre);
                        setMostrarFormularioCategoria(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className='btn btn-danger btn-sm hover-3d'
                      onClick={() => eliminarCategoria(categoria._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Lista de productos agrupados por categoría */}
          {Object.keys(productosPorCategoria).map(categoria => (
            <div key={categoria} className='mb-4'>
              <h3>{categoria.replace(/-/g, ' ')}</h3>
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
                          className='btn btn-danger me-2 hover-3d'
                          onClick={() => eliminarProducto(producto._id)}
                        >
                          Eliminar
                        </button>
                        <button
                          className='btn btn-warning hover-3d'
                          onClick={() => editarProductoHandler(producto)}
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ListaProductos;