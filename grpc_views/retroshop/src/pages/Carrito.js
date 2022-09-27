import React, { useEffect, useRef, useState } from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from '../components/Header';
import CheckoutCarrito from '../components/CheckoutCarrito';

export default function Carrito(props) {
  const cookies = new Cookies()
  let carrito = cookies.get('Carrito') === undefined ? [] : cookies.get('Carrito')
  const baseUrl = "https://localhost:5001/api"
  const [products, setProducts] = useState([])
  const [total, setTotalAPagar] = useState(0)
  let flagMostrarItems = true
  const navigate = useNavigate()

  useEffect(() => {
    debugger
    const myArray = cookies.get('Carrito')
    setProducts(myArray)
    calcularTotal()
      const script = document.createElement('script');
      script.src = "https://getbootstrap.com/docs/5.2/examples/checkout/form-validation.js";
      script.async = true;
      document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const calcularTotal = () =>{
    let totalAPagar = 0
    carrito.forEach((value)=>{
      totalAPagar += value.CantidadSeleccionada*value.Precio
    })
    setTotalAPagar(totalAPagar)
  }

  const comprar=async(event)=>{
    event.preventDefault()
    debugger
    let totalAPagar = total, idCarrito = 0
    let items = []
    const IdUsuario = cookies.get('Idusuario') === undefined ? 0 : cookies.get('Idusuario')
    let saldoDisponible = cookies.get('Saldo') === undefined ? 0 : cookies.get('Saldo')
    if (saldoDisponible < totalAPagar) {
      alert("Saldo insufiente")
      return
    }

    //Genero un carrito
    const jsonDataCarrito = {
      "total": totalAPagar,
      "clienteIdusuario": IdUsuario
    }
    await axios.post("https://localhost:5001/api/Carrito/PostCarrito", jsonDataCarrito).then(response=>{
      idCarrito = response.data.Id
    }).catch(error=>{console.log(error)})

    //Genero los items para el carrito
    carrito.forEach((value)=>{
      items.push(
        {
          "idproducto": parseInt(value.IdProducto), 
          "idcarrito": idCarrito, 
          "cantidad": parseInt(value.CantidadSeleccionada), 
          "subtotal": value.CantidadSeleccionada*value.Precio
        })
    })
    await axios.post("https://localhost:5001/api/Carrito/PostItemsCarrito", items)

    //Actualizo los stocks de los productos abonados
    carrito.forEach(async (value)=>{
      await axios.put(baseUrl+"/Producto/UpdateStock?idProducto="+value.IdProducto+"&cantidad="+value.CantidadDisponible)
    })

    //Descuento el total de la compra del saldo del usuario
    await axios.post(baseUrl+"/Usuarios/CargarSaldo",{"idusuario": IdUsuario, "saldo_": (-totalAPagar)})
    cookies.set('Saldo',(saldoDisponible-totalAPagar))

    //Actualizo el total de la compra al carrito
    await axios.put(baseUrl+"/Carrito/UpdateTotal",{"idcarrito": idCarrito, "total": totalAPagar})
    await generarFacturas(idCarrito)
    cookies.remove('Carrito')
    alert("Gracias por su compra!")
    navigate('/mainmenu')
  }

  const generarFacturas=async(idCarrito)=>{
    debugger
    let facturas = []
    const fecha = new Date()
    const fechaParseada = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds()
    let obj = carrito.reduce((res, curr) =>
    {
        if (res[curr.DatosVendedor.Idusuario])
            res[curr.DatosVendedor.Idusuario].push(curr);
        else
            Object.assign(res, {[curr.DatosVendedor.Idusuario]: [curr]});
        return res;
    }, {});
    let arr = []
    obj = Object.entries(obj)
    Object.entries(obj).forEach(value=>{
      value['1'].forEach(item=>{
          Array.isArray(item) && arr.push(item)
      })
    })
    arr.forEach(value=>{
      const factura = {
        fechacompra: fechaParseada,
        items: [],
        datosComprador: {
          idusuario: cookies.get('Idusuario'),
          nombre: cookies.get('Nombre'),
          apellido: cookies.get('Apellido'),
          dni: cookies.get('Dni'),
          email: cookies.get('Email')
        },
        datosVendedor: {},
        totalFacturado: 0,
        idcarrito: idCarrito
      }
      value.forEach(item=>{
        factura.datosVendedor = {
          idusuario: item.DatosVendedor.Idusuario,
          nombre: item.DatosVendedor.Nombre,
          apellido: item.DatosVendedor.Apellido,
          dni: item.DatosVendedor.Dni,
          email: item.DatosVendedor.Email
        }
        factura.items.push({
          idproducto: item.IdProducto,
          nombre: item.Nombre,
          precio: item.Precio,
          cantidad: item.CantidadSeleccionada
        })
        factura.totalFacturado += item.CantidadSeleccionada*item.Precio
      })
      facturas.push(factura)
    })
    await axios.post(baseUrl+"/Carrito/PostFacturasKafka",facturas)
    .then(response=>{console.log(response.data)})
    .catch(error=>{alert(error)})
  }

  return (
    <div>
    <Header />
    <div className="row g-5 justify-content-center" style={{padding: '30px'}}>
      <div className="col-md-5 col-lg-4 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Tu Carrito</span>
        </h4>
        <ul className="list-group mb-3">
          <form onSubmit={event=> comprar(event)} className='form-group'>
            <div className="row">
              {products !== undefined ? products.map((value) => (
                <CheckoutCarrito nombre={value.Nombre} cantidad={value.CantidadSeleccionada} precio={value.Precio}/>
              )) : flagMostrarItems=false}
              <br></br>
              {flagMostrarItems ?
              <div>
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <strong>Total a pagar: </strong>
                  <i>${total}</i>
                </div>
              </li>
              </div>
              : <div>Nada por aqui</div>}
            </div>
            <br></br>
            {flagMostrarItems && <button className="w-100 btn btn-primary btn-lg" type="submit">Comprar</button>}
          </form>
        </ul>
      </div>
    </div>
  </div>
  )
}
