import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import CheckoutCarrito from '../components/CheckoutCarrito'
import Header from '../components/Header'
import { Document, Page, PDFDownloadLink, Text, View } from '@react-pdf/renderer'

function MyShopping() {
    const baseUrl = "https://localhost:5001/api/Carrito/GetCarritoByIdUsuario"
    const cookies = new Cookies()
    const idusuario = cookies.get('Idusuario') === undefined ? 0 : cookies.get('Idusuario')
    const [carritos, setCarritos] = useState([])
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
                            <PDFDownloadLink document={<DescargarFacturaPDF datos={carrito}/>} fileName="factura">
                                <button className='btn btn-info'>Descargar factura</button>
                            </PDFDownloadLink>
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

function DescargarFacturaPDF(props) {
    const cookies = new Cookies()
    return (
      <Document>
        <Page size="A4">
            <View style={{display: 'flex', flexDirection: "column", paddingTop: '10px', paddingLeft: '10px'}}>
                <Text>Factura nro. {props.datos[0].DatosFactura.Idfactura}</Text>
                <Text style={{padding: '10px'}}>Datos del vendedor: {props.datos[0].DatosVendedor.Apellido}, {props.datos[0].DatosVendedor.Nombre} {props.datos[0].DatosVendedor.Dni} {props.datos[0].DatosVendedor.Email}</Text>
                <Text style={{padding: '10px'}}>Datos del comprador: {cookies.get('Apellido')}, {cookies.get('Nombre')} {cookies.get('Dni')} {cookies.get('Email')}</Text>
                <Text>Fecha de compra: {new Date(props.datos[0].DatosFactura.FechaCompra.Seconds*1000).toLocaleString()}</Text>
                {props.datos.map((value=>(
                    <View style={{padding: '10px'}}>
                        <Text style={{paddingBottom: '3px'}}>Producto: {value.Nombre}</Text>
                        <Text style={{paddingBottom: '3px'}}>Precio unitario: ${value.Precio}</Text>
                        <Text style={{paddingBottom: '3px'}}>Cantidad: {value.Cantidad}</Text>
                        <Text style={{paddingBottom: '3px'}}>Subtotal: ${value.Subtotal}</Text>
                    </View>
                )))}
                <Text>Total a pagar: ${props.datos[0].DatosFactura.TotalFacturado}</Text>
            </View>
        </Page>
      </Document>
    )
}
