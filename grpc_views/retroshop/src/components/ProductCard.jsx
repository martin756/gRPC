import React, { useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom"

function ProductCard(props) {
  //let query = useQuery()
  return (
    <div className="col-6 col-md-4 col-lg-3 mb-3">
      {props.cantidad_disponible > 0 &&
      <div className="card h-100 border-0">
        <div className="card-img-top">
          <img style={{height: '240px'}} src={props.url} className="card-img img-fluid mx-auto d-block" alt="Card image cap" />
        </div>
        <div className="card-body text-center">
          <h4 className="card-title">
            {/*<a href={`/buyProduct?id=${props.id}`} className=" font-weight-bold text-dark text-uppercase small">{props.nombre}</a>*/}
            <Link to={"/"+props.linkPage+"?id="+props.id} className=" font-weight-bold text-dark text-uppercase small">{props.nombre}</Link>
          </h4>
          <h5 className="card-price">
            <i>${props.precio}</i>
          </h5>
        </div>
      </div>
    }
    </div>
  )
}

export default ProductCard
