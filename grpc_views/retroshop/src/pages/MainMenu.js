import React, {useEffect, useRef, useState} from 'react'
import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductCard from '../components/ProductCard';
//import '../css/ShopProductsList.css'
import { jsonProducts, categorias } from './productsDemo';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function MainMenu() {
    const baseUrl="https://localhost:5001/api/Producto"
    const cookies = new Cookies()
    const tabEventKeys = {productos: "productos", subastas: "subastas"}
    
    //const [categorias, setCategories] = useState([])
    const [eventKey, setEventKey] = useState(tabEventKeys.productos)
    const [productsReadOnly, setProductsReadOnly] = useState([])
    const [products, setProductsFiltered] = useState([])
    const [productsOnAuctionReadOnly, setProductsOnAuctionReadOnly] = useState([])
    const filtroCategoria = useRef(null),filtroNombre = useRef(null)
    const filtroPrecioDesde = useRef(null),filtroPrecioHasta = useRef(null)
    const filtroFechaDesde = useRef(null),filtroFechaHasta = useRef(null)

    const filterProducts = (eKey) => {
        let productsFiltered = eKey === tabEventKeys.productos ? [...productsReadOnly] : [...productsOnAuctionReadOnly]

        productsFiltered = filtroPorNombre(productsFiltered,filtroNombre)
        productsFiltered = filtroPorCategoria(productsFiltered,filtroCategoria)
        productsFiltered = filtroRangoPrecio(productsFiltered,filtroPrecioDesde,filtroPrecioHasta)
        productsFiltered = filtroRangoFecha(productsFiltered,filtroFechaDesde,filtroFechaHasta)

        setProductsFiltered(productsFiltered)
    }

    /*const filtroPorCategoria = (arr) => {
      const optionLabelSelected = filtroCategoria.current.options[filtroCategoria.current.options.selectedIndex]
      if (optionLabelSelected.index !== 0) {
        debugger
        return arr.filter(product=>product.Idtipocategoria===optionLabelSelected.index)
      }
      return arr
    }

    const filtroPorNombre = (arr) => {
      if (filtroNombre.current.value !== '') {
        return arr.filter(product=>product.Nombre.toLowerCase()
          .includes(filtroNombre.current.value.toLowerCase()))
      }
      return arr
    }

    const filtroRangoPrecio = (arr) => {
      if (filtroPrecioDesde.current.value !== '') {
        arr = arr.filter(product=>product.Precio >= filtroPrecioDesde.current.value)
      }
      if (filtroPrecioHasta.current.value !== '') {
        arr = arr.filter(product=>product.Precio <= filtroPrecioHasta.current.value)
      }
      return arr
    }

    const filtroRangoFecha = (arr) => {
      debugger
      if (filtroFechaDesde.current.value !== '') {
        arr = arr.filter(product=>product.FechaPublicacion >= filtroFechaDesde.current.value)
      }
      if (filtroFechaHasta.current.value !== '') {
        arr = arr.filter(product=>product.FechaPublicacion <= filtroFechaHasta.current.value)
      }
      return arr
    }*/

    const traerProductos = async () => {
      await axios.get(baseUrl+"/GetProductos")
      .then(response=>{
        debugger
        const idusuario = cookies.get('Idusuario') === undefined ? 0 : parseInt(cookies.get('Idusuario'))
        const productsNotPublishedByLoggedUser = response.data.filter(p=>p.PublicadorIdusuario!==idusuario && p.CantidadDisponible>0)
        setProductsReadOnly(productsNotPublishedByLoggedUser)
        setProductsFiltered(productsNotPublishedByLoggedUser)
      })
      .catch(error=>{
        alert(error)
      })
    }

    const traerSubastas = async () => {
      await axios.get(baseUrl+"/GetSubastas")
      .then(response=>{
        debugger
        const idusuario = cookies.get('Idusuario') === undefined ? 0 : parseInt(cookies.get('Idusuario'))
        const subastasNotPublishedByLoggerUser = response.data.filter(s=>s.PublicadorIdusuario!==idusuario && s.CantidadDisponible>0)
        setProductsOnAuctionReadOnly(subastasNotPublishedByLoggerUser)
      })
      .catch(error=>{
        alert(error)
      })
    }

    const mostrarProductosSegunTipo = (eKey) => {
      debugger
      setEventKey(eKey)
      filterProducts(eKey)
    }

    useEffect(()=>{
      traerProductos()
      traerSubastas()
    },[])

    return (
        <div>
        <Header />
        
        <div className="container pt-5">
          <div className="row">
            <div className="col-md-8 order-md-2 col-lg-9">
              <Tabs defaultActiveKey={tabEventKeys.productos} className="mb-3" onSelect={mostrarProductosSegunTipo}>
                <Tab eventKey={tabEventKeys.productos} title="Compra directa">
                  <div className="container-fluid">
                    <div className="row">
                        {products.length > 0 ? products.map((value)=>(
                          <ProductCard id={value.Idproducto} nombre={value.Nombre} precio={value.Precio} 
                          url={value.UrlFotos[0]} cantidad_disponible={value.CantidadDisponible} linkPage="buyProduct"/>
                        )) : "No hay productos para mostrar"}
                    </div>
                  </div>
                </Tab>
                <Tab eventKey={tabEventKeys.subastas} title="En subasta">
                  <div className="container-fluid">
                    <div className="row">
                        {products.length > 0 ? products.map((value)=>(
                          <ProductCard id={value.Idproducto} nombre={value.Nombre} precio={value.Precio} 
                          url={value.UrlFotos[0]} cantidad_disponible={value.CantidadDisponible} linkPage="Subasta"/>
                        )) : "No hay productos para mostrar"}
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
            <div className="col-md-4 order-md-1 col-lg-3 sidebar-filter">
              <h6 className="text-uppercase font-weight-bold mb-2">Categoria</h6>
              <div className="mt-2 mb-2 pl-2">
                <select ref={filtroCategoria} className="form-select">
                    <option value="Seleccione categoria">Seleccione categoria</option>
                    {categorias.map((value, index)=>(
                        <option value={index}>{value}</option>
                    ))}
                </select>
              </div>
              <h6 className="text-uppercase mt-4 mb-2 font-weight-bold">Nombre</h6>
              <div className="mt-2 mb-2 pl-2">
                <div className="input-group mb-3">
                    <input ref={filtroNombre} type="text" className="form-control" placeholder='Escriba nombre de producto...'/>
                </div>
              </div>
              <h6 className="text-uppercase mt-4 mb-2 font-weight-bold">Rango de Precio</h6>
              <div className="price-filter-control">
                <input ref={filtroPrecioDesde} type="number" className="form-control w-100 pull-left mb-2" placeholder='Desde' id="price-min-control" />
                <input ref={filtroPrecioHasta} type="number" className="form-control w-100 pull-right" placeholder='Hasta' id="price-max-control" />
              </div>
              <h6 className="text-uppercase mt-4 mb-2 font-weight-bold">Fecha de Fabricación</h6>
              <div className="price-filter-control">
                <div className="form-floating mb-2">
                    <input ref={filtroFechaDesde} type="date" className="form-control"/>
                    <label htmlFor="floatingInput">DESDE</label>
                </div>
                <div className="form-floating">
                    <input ref={filtroFechaHasta} type="date" className="form-control"/>
                    <label htmlFor="floatingPassword">HASTA</label>
                </div>
              </div>
              <div className='text-center'>
                <button onClick={()=>{filterProducts(eventKey)}} className="btn btn-lg btn-block btn-primary mt-5">Filtrar Productos</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export const filtroPorCategoria = (arr,refCategoria) => {
  const optionLabelSelected = refCategoria.current.options[refCategoria.current.options.selectedIndex]
  if (optionLabelSelected.index !== 0) {
    debugger
    return arr.filter(product=>product.Idtipocategoria===optionLabelSelected.index)
  }
  return arr
}

export const filtroPorNombre = (arr,refNombre) => {
  if (refNombre.current.value !== '') {
    return arr.filter(product=>product.Nombre.toLowerCase()
      .includes(refNombre.current.value.toLowerCase()))
  }
  return arr
}

export const filtroRangoPrecio = (arr,refPrecioDesde,refPrecioHasta) => {
  if (refPrecioDesde.current.value !== '') {
    arr = arr.filter(product=>product.Precio >= refPrecioDesde.current.value)
  }
  if (refPrecioHasta.current.value !== '') {
    arr = arr.filter(product=>product.Precio <= refPrecioHasta.current.value)
  }
  return arr
}

export const filtroRangoFecha = (arr,refFechaDesde,refFechaHasta) => {
  debugger
  if (refFechaDesde.current.value !== '') {
    arr = arr.filter(product=>product.FechaPublicacion >= refFechaDesde.current.value)
  }
  if (refFechaHasta.current.value !== '') {
    arr = arr.filter(product=>product.FechaPublicacion <= refFechaHasta.current.value)
  }
  return arr
}


