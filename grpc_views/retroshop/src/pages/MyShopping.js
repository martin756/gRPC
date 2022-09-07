import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import CheckoutCarrito from '../components/CheckoutCarrito'
import Header from '../components/Header'

function MyShopping() {
    const baseUrl = "https://localhost:5001/api/Carrito/GetCarritoByIdUsuario"
    const cookies = new Cookies()
    const idusuario = cookies.get('Idusuario') === undefined ? 0 : cookies.get('Idusuario')
    const [carritos, setCarritos] = useState([])
    const traerCarritos = async () => {
        await axios.get(baseUrl+"?id="+idusuario)
        .then(response=>{
          debugger
          
          let obj = response.data.reduce((res, curr) =>
          {
              if (res[curr.Idcarrito])
                  res[curr.Idcarrito].push(curr);
              else
                  Object.assign(res, {[curr.Idcarrito]: [curr]});
              return res;
          }, {});
          
          let arr = []
          obj = Object.entries(obj)
          Object.entries(obj).forEach(value=>{
            value['1'].forEach(carrito=>{
                Array.isArray(carrito) && arr.push(carrito)
            })
        })
        setCarritos(arr)
          //const productsPublishedByLoggedUser = response.data.filter(p=>p.PublicadorIdusuario===idusuario && p.CantidadDisponible>0)
          //setProducts(productsPublishedByLoggedUser)
        })
        .catch(error=>{
          alert(error)
        })
    }

    useEffect(()=>{
        traerCarritos()
    },[])
  return (
    <div>
        <Header />
        <div className="row g-5 justify-content-center" style={{padding: '30px'}}>
            <div className="col-md-5 col-lg-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Tus Compras</span>
                </h4>
                <ul className="list-group mb-3">
                    <div className="row">
                    {carritos.length > 0 ? carritos.map((value=>(
                        value.map((carrito=>(
                            <CheckoutCarrito nombre={carrito.Nombre} cantidad={carrito.Cantidad} precio={carrito.Precio} total={carrito.Total}/>
                        )))
                    ))): "Todavia no has hecho ninguna compra"}
                    <br></br>
                    </div>
                    <br></br>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default MyShopping