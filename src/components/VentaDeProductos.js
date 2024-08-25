import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VentaDeProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [montoIngresado, setMontoIngresado] = useState(0);
  const [vuelto, setVuelto] = useState(null);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    const getProductos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/producto');
        setProductos(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProductos();
  }, []);

  const manejarSeleccionProducto = (e) => {
    const productoId = e.target.value;
    const producto = productos.find(p => p._id === productoId);

    if (producto && !productosSeleccionados.includes(producto)) {
      setProductosSeleccionados([...productosSeleccionados, producto]);
    }
    setVuelto(null);
    setMensajeError('');
  };

  const calcularTotal = () => {
    return productosSeleccionados.reduce((total, producto) => total + producto.precio, 0);
  };

  const manejarCambioMonto = (e) => {
    setMontoIngresado(parseFloat(e.target.value));
  };

  const procesarVenta = () => {
    const total = calcularTotal();

    if (productosSeleccionados.length === 0) {
      setMensajeError('Por favor, selecciona al menos un producto.');
      return;
    }

    if (montoIngresado >= total) {
      const calculoVuelto = montoIngresado - total;
      setVuelto(calculoVuelto);
      setMensajeError('');
    } else {
      setMensajeError('El monto ingresado es insuficiente.');
      setVuelto(null);
    }
  };

  const cancelarVenta = () => {
    setProductosSeleccionados([]);
    setMontoIngresado(0);
    setVuelto(null);
    setMensajeError('');
  };

  const eliminarProductoSeleccionado = (id) => {
    setProductosSeleccionados(productosSeleccionados.filter(producto => producto._id !== id));
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h2 className="text-center">Venta de Productos</h2>

        <div className="mb-3">
          <label>Seleccionar Producto</label>
          <select className="form-control" onChange={manejarSeleccionProducto} value="">
            <option value="" disabled>Selecciona un producto</option>
            {productos.map(producto => (
              <option key={producto._id} value={producto._id}>
                {producto.nombre} - {producto.precio} PYG
              </option>
            ))}
          </select>
        </div>

        {productosSeleccionados.length > 0 && (
          <div className="mb-3">
            <h4>Carrito:</h4>
            <ul className="list-group">
              {productosSeleccionados.map(producto => (
                <li key={producto._id} className="list-group-item d-flex justify-content-between align-items-center">
                  {producto.nombre} - {producto.precio} PYG
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarProductoSeleccionado(producto._id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3"><strong>Total a pagar:</strong> {calcularTotal()} PYG</p>
          </div>
        )}

        <div className="mb-3">
          <label>Monto Ingresado</label>
          <input
            type="number"
            className="form-control"
            value={montoIngresado}
            onChange={manejarCambioMonto}
            min="0"
          />
        </div>

        {mensajeError && <p className="text-danger">{mensajeError}</p>}
        {vuelto !== null && <p className="text-success">Vuelto a dar: {vuelto} PYG</p>}

        <div className="d-flex justify-content-between">
          <button className="btn btn-success" onClick={procesarVenta}>Procesar Venta</button>
          <button className="btn btn-danger" onClick={cancelarVenta}>Cancelar Venta</button>
        </div>
      </div>
    </div>
  );
};

export default VentaDeProductos;
