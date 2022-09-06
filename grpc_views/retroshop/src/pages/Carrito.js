import React, { useEffect, useRef, useState } from "react";
import Cookies from 'universal-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import ProductCard from '../components/ProductCard';
import { jsonCarrito } from './carritoDemo';
import Header from '../components/Header';
import CheckoutCarrito from '../components/CheckoutCarrito';

export default function Carrito(props) {
  const cookies = new Cookies()
  let carrito = cookies.get('Carrito') === undefined ? [] : cookies.get('Carrito')
  const baseUrl = "https://localhost:5001/api"
  const [products, setProducts] = useState([])
  const [total, setTotalAPagar] = useState(0)
  let flagMostrarItems = true
  const precio = useRef(null);
  const nombre = useRef(null);
  const cantidad = useRef(null);
  const id_Producto = useRef(null);
  const id_Usuario = useRef(null);
  const navigate = useNavigate()


  //const { search } = useLocation();
  //let query = React.useMemo(() => new URLSearchParams(search), [search]);
  //const idProduct = query.get('id')
  //const product = jsonCarrito.filter(p=>p.id==idProduct)[0]
  useEffect(() => {
    //getCookies()
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


  /*function setCookies(){
    const [carrito] = useState(jsonCarrito)
    console.log(carrito);
    var myArray = cookies.set('Carrito')
  }


  function getCookies(){
    //setCookies()

    //const cookies = new Cookies()
    

    //let obj = JSON.parse(myArray)
    //console.log(obj)
  }*/

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
    let totalAPagar = 0, idCarrito = 0
    let items = []
    carrito.forEach((value)=>{
      totalAPagar += value.CantidadSeleccionada*value.Precio
    })
    let saldoDisponible = cookies.get('Saldo') === undefined ? 0 : cookies.get('Saldo')
    if (saldoDisponible < totalAPagar) {
      debugger
      alert("Saldo insufiente")
      return
    }
    const jsonDataCarrito = {
      "total": totalAPagar,
      "clienteIdusuario": 16
    }
    await axios.post("https://localhost:5001/api/Carrito/PostCarrito", jsonDataCarrito).then(response=>{
      idCarrito = response.data.Id
    }).catch(error=>{
      console.log(error)
    })
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
    //let putProducto = {}
    carrito.forEach(async (value)=>{
      //putProducto.idproducto = value.idProducto
      //putProducto.cantidad = value.CantidadDisponible
      await axios.put(baseUrl+"/Producto/UpdateStock?idProducto="+value.IdProducto+"&cantidad="+value.CantidadDisponible)
    })
    const IdUsuario = cookies.get('Idusuario') === undefined ? 0 : cookies.get('Idusuario')
    await axios.post(baseUrl+"/Usuarios/CargarSaldo",{"idusuario": IdUsuario, "saldo_": (-totalAPagar)})
    cookies.set('Saldo',(saldoDisponible-totalAPagar))
    cookies.remove('Carrito')
    alert("Gracias por su compra!")
    navigate('/mainmenu')
  }

/*const postCarrito=async(event)=>{
    event.preventDefault()
    const jsonBody = 
    {
        "id_Producto": id_Producto.current.value,
        "nombre": nombre.current.value,
        "precio": precio.current.value,
        "cantidad": cantidad.current.value,
    }
    await axios.post("https://localhost:5001/api/Carrito", jsonBody)
    .then(response=>{
        if (response.data.Message.includes('400')){
            navigate('/mainmenu')
        }else{
            alert("El carrito ya se encuentra guardado")
        }
    })
    .catch((error)=>{
      alert(error)
  })
}

const postProductoCarrito=async(event)=>{
  event.preventDefault()
  const jsonBody = 
  {
      "id_Producto": id_Producto.current.value,
      "id_Usuario": id_Usuario.current.value,
  }
  await axios.post("https://localhost:5001/api/Producto_Carrito", jsonBody)
  .then(response=>{
      if (response.data.Message.includes('400')){
          navigate('/mainmenu')
      }else{
          alert("El carrito ya se encuentra guardado")
      }
  })
  .catch((error)=>{
    alert(error)
})
}*/

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
