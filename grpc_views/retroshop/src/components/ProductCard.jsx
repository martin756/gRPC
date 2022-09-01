import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types'

function ProductCard(props) {
  return (
  <div className="col-6 col-md-6 col-lg-4 mb-3">
    <div className="card h-100 border-0">
      <div className="card-img-top">
        <img style={{height: '240px'}} src={props.url} className="card-img img-fluid mx-auto d-block" alt="Card image cap" />
      </div>
      <div className="card-body text-center">
        <h4 className="card-title">
          <a href="product.html" className=" font-weight-bold text-dark text-uppercase small">{props.nombre}</a>
        </h4>
        <h5 className="card-price">
          <i>${props.precio}</i>
        </h5>
      </div>
    </div>
  </div>
  )
}

export default ProductCard
