import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'

function PublishedProducts() {
    const baseUrl = "https://localhost:5001/api/Producto/GetProductos"
    const cookies = new Cookies()
    const [products, setProducts] = useState([])
    const traerProductos = async () => {
        await axios.get(baseUrl)
        .then(response=>{
          debugger
          const idusuario = cookies.get('Idusuario') === undefined ? 0 : parseInt(cookies.get('Idusuario'))
          const productsPublishedByLoggedUser = response.data.filter(p=>p.PublicadorIdusuario===idusuario && p.CantidadDisponible>0)
          setProducts(productsPublishedByLoggedUser)
        })
        .catch(error=>{
          alert(error)
        })
    }

    useEffect(()=>{
        traerProductos()
    },[])

  return (
    <div>
        <Header />
        <div className="container pt-5">
            <div className="col-md-12 order-md-3 col-lg-12">
                <div className="row">
                    {products.length > 0 ? products.map((value)=>(
                    <ProductCard id={value.Idproducto} nombre={value.Nombre} precio={value.Precio} 
                    url={value.UrlFotos[0]} cantidad_disponible={value.CantidadDisponible} linkPage="editPublication"/>
                    )) : "No hay productos para mostrar"}
                </div>
            </div>
        </div>
    </div>
  )
}

export default PublishedProducts