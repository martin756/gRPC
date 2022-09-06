import React, { useEffect, useRef, useState } from "react";
import Cookies from 'universal-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import ProductCard from '../components/ProductCard';
import { jsonCarrito } from './carritoDemo';
import Header from '../components/Header';
import CheckoutCarrito from '../components/CheckoutCarrito';



export default function Carrito(props) {
  const products =  getCookies()
  const precio = useRef(null);
  const nombre = useRef(null);
  const cantidad = useRef(null);
  const id_Producto = useRef(null);
  const id_Usuario = useRef(null);
  const navigate = useNavigate()

  const { search } = useLocation();
  let query = React.useMemo(() => new URLSearchParams(search), [search]);
  const idProduct = query.get('id')
  const product = jsonCarrito.filter(p=>p.id==idProduct)[0]
  useEffect(() => {
      const script = document.createElement('script');
      script.src = "https://getbootstrap.com/docs/5.2/examples/checkout/form-validation.js";
      script.async = true;
      document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);


  function setCookies(){
    const cookies = new Cookies()
    const [carrito] = useState(jsonCarrito)
    console.log(carrito);
    var myArray = cookies.set('Carrito')
  }


  function getCookies(){
    setCookies()

    const cookies = new Cookies()
    var myArray = cookies.get('Carrito')
    console.log(myArray)

    let obj = JSON.parse(myArray)
    console.log(obj)
  }

  const comprar=async(event)=>{

    event.preventDefault()
  }

const postCarrito=async(event)=>{
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
}

  return (
    <div>
    <Header />
    <div class="row g-5">
      <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">Tu Carrito</span>
        </h4>
        <ul class="list-group mb-3">
          <form onSubmit={event=> comprar(event)} className='form-group'>
            <div className="row">
              {products.map((value) => (
              <CheckoutCarrito nombre={value.nombre} cantidad={value.cantidad} precio={value.precio}/>
              ))}
            </div>
            <button className="w-100 btn btn-primary btn-lg" type="submit">Comprar</button>
          </form>
        </ul>
      </div>
    </div>
  </div>
  )
}
