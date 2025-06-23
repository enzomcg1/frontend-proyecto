import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditarProducto from './EditarProducto';
import './ListaProductos.css';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormularioCategoria, setMostrarFormularioCategoria] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [categoriasExpandidas, setCategoriasExpandidas] = useState({});

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getProductos = async () => {
      try {
        const res = await axios.get(`${API_URL}/producto`);
        setProductos(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const getCategorias = async () => {
      try {
        const res = await axios.get(`${API_URL}/categorias`);
        setCategorias(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getProductos();
    getCategorias();
  }, [API_URL]);

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}/producto/${id}`);
      setProductos(productos.filter(producto => producto._id !== id));
      alert('Producto eliminado con éxito');
    } catch (error) {
      console.error('Error eliminando el producto:', error);
      alert('Hubo un error eliminando el producto. Inténtalo nuevamente.');
    }
  };

  const editarProductoHandler = (producto) => {
    setProductoEditando(producto);
  };

  const handleEditSuccess = () => {
    setProductoEditando(null);
    const getProductos = async () => {
      try {
        const res = await axios.get(`${API_URL}/producto`);
        setProductos(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProductos();
  };

  const agregarCategoria = async () => {
    if (!nuevaCategoria) {
      alert('Por favor, ingresa el nombre de la categoría.');
      return;
    }

    try {
      await axios.post(`${API_URL}/categorias`, { nombre: nuevaCategoria });
      alert('Categoría agregada con éxito');
      setNuevaCategoria('');
      setMostrarFormularioCategoria(false);
      const res = await axios.get(`${API_URL}/categorias`);
      setCategorias(res.data);
    } catch (error) {
      console.error('Error agregando la categoría:', error);
      alert('Hubo un error agregando la categoría. Inténtalo nuevamente.');
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      await axios.delete(`${API_URL}/categorias/${id}`);
      alert('Categoría eliminada con éxito');
      const res = await axios.get(`${API_URL}/categorias`);
      setCategorias(res.data);
    } catch (error) {
      console.error('Error eliminando la categoría:', error);
      alert('Hubo un error eliminando la categoría. Inténtalo nuevamente.');
    }
  };

  const editarCategoria = async () => {
    if (!nuevaCategoria) {
      alert('Por favor, ingresa el nombre de la categoría.');
      return;
    }

    try {
      await axios.put(`${API_URL}/categorias/${categoriaEditando._id}`, {
        nombre: nuevaCategoria,
      });
      alert('Categoría editada con éxito');
      setNuevaCategoria('');
      setCategoriaEditando(null);
      const res = await axios.get(`${API_URL}/categorias`);
      setCategorias(res.data);
    } catch (error) {
      console.error('Error editando la categoría:', error);
      alert('Hubo un error editando la categoría. Inténtalo nuevamente.');
    }
  };

  const agruparPorCategoria = (productos) => {
    return productos.reduce((resultado, producto) => {
      (resultado[producto.categoria] = resultado[producto.categoria] || []).push(producto);
      return resultado;
    }, {});
  };

  const toggleCategoria = (categoria) => {
    setCategoriasExpandidas((prevState) => ({
      ...prevState,
      [categoria]: !prevState[categoria],
    }));
  };

  const productosPorCategoria = agruparPorCategoria(productos);

  return (
    <div className="container-fluid p-4 bg-dark text-light">
      {productoEditando ? (
        <EditarProducto producto={productoEditando} onEditSuccess={handleEditSuccess} />
      ) : (
        <>
          <button
            className='btn btn-primary hover-3d mb-3'
            onClick={() => {
              setMostrarFormularioCategoria(!mostrarFormularioCategoria);
              setCategoriaEditando(null);
            }}
          >
            {mostrarFormularioCategoria ? 'Ocultar Formulario' : 'Agregar Nueva Categoría'}
          </button>

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

          {Object.keys(productosPorCategoria).map(categoria => (
            <div key={categoria} className='mb-4'>
              <div
                className='d-flex justify-content-between align-items-center mb-2 cursor-pointer'
                onClick={() => toggleCategoria(categoria)}
              >
                <h3>{categoria.replace(/-/g, ' ')}</h3>
                <span>{categoriasExpandidas[categoria] ? '▲' : '▼'}</span>
              </div>
              {categoriasExpandidas[categoria] && (
                <div className='row'>
                  {productosPorCategoria[categoria].map(producto => (
                    <div className='col-md-4 p-2' key={producto._id}>
                      <div className='card'>
                        <div className='card-header'>
                          <h4>Nombre del producto: {producto.nombre}</h4>
                          <p>Descripción del producto: {producto.descripcion}</p>
                          <p>Precio del producto: {producto.precio} PYG</p>
                          <p>Proveedor: {producto.proveedor?.nombre || 'Sin proveedor'}</p>
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
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ListaProductos;
