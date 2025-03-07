import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VentaDeProductos = () => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [montoRecibido, setMontoRecibido] = useState(''); // Sin formatear para edición
    const [vuelto, setVuelto] = useState('');
    const [saldoPendiente, setSaldoPendiente] = useState(0);

    const [clientes, setClientes] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState('');
    const [tipoVenta, setTipoVenta] = useState('contado');

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/producto');
                setProductos(res.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        const fetchClientes = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/clientes');
                setClientes(res.data);
            } catch (error) {
                console.error('Error al obtener clientes:', error);
            }
        };

        fetchProductos();
        fetchClientes();
    }, []);

    const agregarAlCarrito = (producto) => {
        const productoEnCarrito = carrito.find((item) => item._id === producto._id);
        if (productoEnCarrito) {
            setCarrito((prevCarrito) =>
                prevCarrito.map((item) =>
                    item._id === producto._id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
            );
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
        setTotal((prevTotal) => prevTotal + producto.precio);
    };

    const quitarDelCarrito = (id) => {
        const producto = carrito.find((item) => item._id === id);
        if (producto.cantidad === 1) {
            setCarrito((prevCarrito) => prevCarrito.filter((item) => item._id !== id));
        } else {
            setCarrito((prevCarrito) =>
                prevCarrito.map((item) =>
                    item._id === id ? { ...item, cantidad: item.cantidad - 1 } : item
                )
            );
        }
        setTotal((prevTotal) => prevTotal - producto.precio);
    };

    const formatearNumero = (numero) => {
        return parseFloat(numero).toLocaleString('es-ES'); // Formato español con puntos
    };

    const calcularSaldoPendiente = (monto) => {
        setMontoRecibido(monto); // Guardar el monto recibido sin formatear

        const montoNumerico = parseFloat(monto.replace(/\./g, '')) || 0; // Quita puntos antes de parsear
        const saldo = total - montoNumerico;

        if (saldo > 0) {
            setSaldoPendiente(saldo); // Actualizar el saldo pendiente
            setVuelto('0'); // No hay vuelto si el saldo es positivo
        } else {
            setSaldoPendiente(0); // Saldo pendiente es 0 si se cubre el total
            setVuelto(formatearNumero(Math.abs(saldo))); // Calcular vuelto si el monto es mayor al total
        }
    };

    const realizarVenta = async () => {
        if (!clienteSeleccionado || carrito.length === 0) {
            alert('Debe seleccionar un cliente y agregar productos al carrito.');
            return;
        }

        const montoNumerico = parseFloat(montoRecibido.replace(/\./g, '')) || 0;

        if (montoNumerico <= 0) {
            alert('Debe ingresar un monto válido.');
            return;
        }

        if (saldoPendiente > 0 && tipoVenta === 'contado') {
            alert('El monto ingresado no cubre el total de la venta. Aumente el monto o cambie a crédito.');
            return;
        }

        try {
            if (tipoVenta === 'credito') {
                const cliente = clientes.find((c) => c._id === clienteSeleccionado);
                const nuevoCredito = parseFloat(cliente.creditoAcumulado || 0) + saldoPendiente;

                await axios.put(`http://localhost:4000/api/clientes/${clienteSeleccionado}`, {
                    ...cliente,
                    creditoAcumulado: nuevoCredito,
                });
            }

            const venta = {
                clienteId: clienteSeleccionado,
                productos: carrito,
                total,
                tipoVenta,
                saldoPendiente: saldoPendiente > 0 ? saldoPendiente : 0, // Guardar el saldo pendiente
                pagos: [{ monto: montoNumerico, fecha: new Date() }], // Registrar el pago
            };

            await axios.post('http://localhost:4000/api/ventas', venta);

            if (saldoPendiente === 0) {
                alert('Venta realizada con éxito.');
                setCarrito([]);
                setTotal(0);
                setMontoRecibido('');
                setVuelto('');
                setClienteSeleccionado('');
                setTipoVenta('contado');
            } else {
                alert(`Pago parcial registrado. Saldo pendiente: gs. ${formatearNumero(saldoPendiente)}`);
                setTotal(saldoPendiente); // Actualizar el total al saldo pendiente
                setMontoRecibido(''); // Reiniciar el monto recibido
                setSaldoPendiente(0); // Reiniciar el saldo pendiente
            }
        } catch (error) {
            console.error('Error al realizar la venta:', error);
            alert('Hubo un error al realizar la venta.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>FORM POS</h2>
            <div className="row">
                <div className="col-md-8">
                    <h3>Productos</h3>
                    <ul className="list-group">
                        {productos.map((producto) => (
                            <li key={producto._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {producto.nombre} - gs. {producto.precio}
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => agregarAlCarrito(producto)}
                                >
                                    Agregar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <h3>Carrito</h3>
                    <ul className="list-group">
                        {carrito.map((producto) => (
                            <li key={producto._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {producto.nombre} - gs. {producto.precio} x {producto.cantidad}
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => quitarDelCarrito(producto._id)}
                                >
                                    Quitar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h4 className="mt-3">Total: gs. {formatearNumero(total)}</h4>
                    <div className="mt-3">
                        <label>Monto Recibido:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={montoRecibido}
                            onChange={(e) => calcularSaldoPendiente(e.target.value)}
                        />
                        <h5 className="mt-2">Vuelto: gs. {vuelto}</h5>
                        <h5 className="mt-2">Saldo Pendiente: gs. {formatearNumero(saldoPendiente)}</h5>
                    </div>
                    <div className="mt-3">
                        <label>Seleccionar Cliente:</label>
                        <select
                            className="form-select"
                            value={clienteSeleccionado}
                            onChange={(e) => setClienteSeleccionado(e.target.value)}
                        >
                            <option value="">Seleccione un cliente</option>
                            {clientes.map((cliente) => (
                                <option key={cliente._id} value={cliente._id}>
                                    {cliente.nombre} - Crédito: {cliente.creditoAcumulado}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-3">
                        <label>Tipo de Venta:</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="contado"
                                    name="tipoVenta"
                                    className="form-check-input"
                                    value="contado"
                                    checked={tipoVenta === 'contado'}
                                    onChange={(e) => setTipoVenta(e.target.value)}
                                />
                                <label htmlFor="contado" className="form-check-label">Contado</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    id="credito"
                                    name="tipoVenta"
                                    className="form-check-input"
                                    value="credito"
                                    checked={tipoVenta === 'credito'}
                                    onChange={(e) => setTipoVenta(e.target.value)}
                                />
                                <label htmlFor="credito" className="form-check-label">Crédito</label>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-success mt-3 w-100" onClick={realizarVenta}>
                        Realizar Venta
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VentaDeProductos;