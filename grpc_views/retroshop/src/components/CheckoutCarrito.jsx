import React, { useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


function CheckoutCarrito(props) {
    console.log("porps",props);
  //let query = useQuery()
  return (
    <div className="card-body text-center">
        <li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <strong>Producto:</strong>
            <i>{props.nombre}</i>
          </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <strong>Cantidad de Productos:</strong>
            <i>{props.cantidad}</i>
          </div>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <div>
            <strong>Precio:</strong>
            <i>${props.precio}</i>
          </div>
        </li>
    </div>  
  )
}

export default CheckoutCarrito
