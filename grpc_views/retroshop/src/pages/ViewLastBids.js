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
        axios.get("https://localhost:5001/api/Producto/GetPujasSubastasKafka?idProducto="+idProduct)
        .then(response=>{
            setProduct(response.data)
            if (response.data.length == 0){
                setMensaje("Aún no se registraron historial de pujas para el producto subastado")
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
                <span className="text-primary">Historial de Pujas</span>
                </h4>
                <ul className="list-group mb-3">
                    <div>
                    {product.length > 0 ? product.map((value=>(
                        <div className="row list-group mb-3">
                            <div className="card-body text-center">
                                <li class="list-group-item d-flex justify-content-between lh-sm">
                                  <div>
                                    <strong>Fecha de Puja: </strong>
                                    <i>{new Date(value.FechaPuja.Seconds*1000).toLocaleString()}</i>
                                  </div>
                                </li>
                                <li class="list-group-item d-flex justify-content-between lh-sm">
                                  <div>
                                    <strong>Id de Comprador: </strong>
                                    <i>{value.IdPujador}</i>
                                  </div>
                                </li>
                                <li class="list-group-item d-flex justify-content-between lh-sm">
                                  <div>
                                    <strong>Precio Ofrecido: </strong>
                                    <i>{value.PrecioOfrecido}</i>
                                  </div>
                                </li>
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