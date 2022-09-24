import React, { useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


function CheckoutCarrito(props) {
    console.log("porps",props);
  //let query = useQuery()
  return (
    <div className="card-body text-center">
        <li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <strong>Producto: </strong>
            <i>{props.nombre}</i>
          </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <strong>Cantidad: </strong>
            <i>{props.cantidad}</i>
          </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <strong>Precio: </strong>
            <i>${props.precio}</i>
          </div>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <div>
            <strong>Subtotal: </strong>
            <i>${props.precio*props.cantidad}</i>
          </div>
        </li>
        {/*{props.total !== null &&
          <li class="list-group-item d-flex justify-content-between">
            <div>
              <strong>Total gastado: </strong>
              <i>${props.total}</i>
            </div>
          </li>
        }*/}
        <br></br>
    </div>  
  )
}

export default CheckoutCarrito
