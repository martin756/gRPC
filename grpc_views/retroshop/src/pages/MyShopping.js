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
    const [datosVendedor, setVendedor] = useState([])
    const [datosFactura, setDatosFactura] = useState([])
    const [fechaCompra, setFechaCompra] = useState([])
    const traerCarritos = async () => {
        await axios.get(baseUrl+"?id="+idusuario)
        .then(response=>{
            debugger
          //1. Separo todos los items que compro historicamente el usuario en un array por carrito
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
          debugger
          //2. Separo todos los items de cada carrito en un sub-array por factura
          let itemsCarritosPorFactura = []
          arr.forEach(subArray => {
            obj = subArray.reduce((res,curr) =>
            {
                if (res[curr.DatosFactura.Idfactura])
                    res[curr.DatosFactura.Idfactura].push(curr)
                else
                    Object.assign(res, {[curr.DatosFactura.Idfactura]: [curr]})
                return res;
            }, {})

            let vec = []
            obj = Object.entries(obj)
            Object.entries(obj).forEach(value=>{
                value['1'].forEach(factura=>{
                    Array.isArray(factura) && vec.push(factura)
                })
            })
            itemsCarritosPorFactura.push(vec)
          });
          
        setCarritos(itemsCarritosPorFactura)
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
        <div className="d-flex g-5 justify-content-center" style={{padding: '30px'}}>
            <div className="col-md-5 col-lg-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Tus Compras</span>
                </h4>
                <ul className="list-group mb-3">
                    <div>
                    {carritos.map((value=>(
                        <div className="row list-group mb-3"><h4>Carrito nro. {value[0][0].Idcarrito}</h4>
                        {value.map((carrito=>(
                            <div><h5>Factura nro. {carrito[0].DatosFactura.Idfactura}</h5>
                            <button className='btn btn-info'>Descargar factura</button>
                            {carrito.map((factura=>(
                                <div>
                                <CheckoutCarrito nombre={factura.Nombre} cantidad={factura.Cantidad} precio={factura.Precio} total={factura.Subtotal} />
                                </div>
                            )))}
                            <h5>
                                <strong>Total facturado: </strong>
                                <i>${carrito[0].DatosFactura.TotalFacturado}</i>
                            </h5>
                            <br></br>
                            </div>
                        )))}
                        <hr />
                        <h4>Total Carrito ${value[0][0].Total}</h4>
                        </div>
                    )))}
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