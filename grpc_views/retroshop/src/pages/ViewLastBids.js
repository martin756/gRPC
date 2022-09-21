import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css'

function ViewLastBids() {
    const [product, setProduct] = useState([])
    const [mensaje, setMensaje] = useState("Buscando registros...")

    const { search } = useLocation();
    let query = useMemo(() => new URLSearchParams(search), [search]);
    const idProduct = query.get('id')

    const traerHistorialProducto = async() => {
        axios.get("https://localhost:5001/api/Producto/GetCambiosProductosKafka?idProducto="+idProduct)
        .then(response=>{
            setProduct(response.data)
            if (response.data.length == 0){
                setMensaje("No se registraron historial de cambios para el producto seleccionado")
            }
        })
        .catch(error=>{
            alert(error)
        })
    }
    useEffect(()=>{
        traerHistorialProducto()
    },[])
  return (
    <div>
        <Header />
        <div className="d-flex g-5 justify-content-center" style={{padding: '30px'}}>
            <div className="col-md-5 col-lg-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Historial de auditoría</span>
                </h4>
                <ul className="list-group mb-3">
                    <div>
                    {product.length > 0 ? product.map((value=>(
                        <div className="row list-group mb-3">
                            <div className="card-body text-center">
                                <li class="list-group-item d-flex justify-content-between lh-sm">
                                  <div>
                                    <strong>Accion: </strong>
                                    <i>{value.accion}</i>
                                  </div>
                                </li>
                                <li class="list-group-item d-flex justify-content-between lh-sm">
                                  <div>
                                    <strong>Fecha: </strong>
                                    <i>{new Date(value.fecha_edicion).toLocaleString()}</i>
                                  </div>
                                </li>
                                {value.camposCambiados.map((campo=>(
                                    <div>
                                        <li class="list-group-item d-flex justify-content-between lh-sm">
                                            <div>
                                                <strong>Campo Registrado: </strong>
                                                <i>{campo.campo_registrado}</i>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between lh-sm">
                                            <div>
                                                <strong>Nuevo valor: </strong>
                                                <i>{campo.nuevo_valor}</i>
                                            </div>
                                        </li>
                                    </div>
                                )))}
                                <br></br>
                            </div>
                        </div>
                    ))) : mensaje}
                    <br></br>
                    </div>
                    <br></br>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ViewLastBids