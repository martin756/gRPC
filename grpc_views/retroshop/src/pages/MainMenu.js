import React, {useEffect, useRef, useState} from 'react'
import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductCard from '../components/ProductCard';
//import '../css/ShopProductsList.css'
import { jsonProducts, categorias } from './productsDemo';

function MainMenu() {
    
    const [products, setProductsFilter] = useState(jsonProducts)
    /*const [productsByCategories, setFilterByCategories] = useState(jsonProducts)
    const [productsByNombre, setFilterByName] = useState(jsonProducts)
    const [productsByPriceRange, setFilterByPriceRange] = useState(jsonProducts)
    const [productsByDateRange, setFilterByDateRange] = useState(jsonProducts)
    const [productsFiltered, setProductsFiltered] = useState(null)*/
    /*let productsByCategories = [...jsonProducts]
    let productsByNombre = [...jsonProducts]
    let productsByPriceRange = [...jsonProducts]
    let productsByDateRange = [...jsonProducts]*/
    let productsFiltered = [...jsonProducts];

    const filtroCategoria = useRef(null),filtroNombre = useRef(null)
    const filtroPrecioDesde = useRef(null),filtroPrecioHasta = useRef(null)
    const filtroFechaDesde = useRef(null),filtroFechaHasta = useRef(null)

    const filterProducts = () => {
        productsFiltered = filtroPorNombre(productsFiltered)
        productsFiltered = filtroPorCategoria(productsFiltered)
        productsFiltered = filtroRangoPrecio(productsFiltered)
        productsFiltered = filtroRangoFecha(productsFiltered)

        //productsFiltered = [...productsByNombre]
        setProductsFilter(productsFiltered)
    }

    const filtroPorCategoria = (arr) => {
      const optionLabelSelected = filtroCategoria.current.options[filtroCategoria.current.options.selectedIndex]
      if (optionLabelSelected.index !== 0) {
        return arr.filter(product=>product.categoria===optionLabelSelected.label)
      }
      return arr
    }

    const filtroPorNombre = (arr) => {
      if (filtroNombre.current.value !== '') {
        return arr.filter(product=>product.nombre.toLowerCase()
          .includes(filtroNombre.current.value.toLowerCase()))
      }
      return arr
    }

    const filtroRangoPrecio = (arr) => {
      if (filtroPrecioDesde.current.value !== '') {
        arr = arr.filter(product=>product.precio >= filtroPrecioDesde.current.value)
      }
      if (filtroPrecioHasta.current.value !== '') {
        arr = arr.filter(product=>product.precio <= filtroPrecioHasta.current.value)
      }
      return arr
    }

    const filtroRangoFecha = (arr) =>{
      debugger
      if (filtroFechaDesde.current.value !== '') {
        arr = arr.filter(product=>product.fecha_fabricacion >= new Date(filtroFechaDesde.current.value))
      }
      if (filtroFechaHasta.current.value !== '') {
        arr = arr.filter(product=>product.fecha_fabricacion <= new Date(filtroFechaHasta.current.value))
      }
      return arr
    }

    return (
        <div>
        <Header />
        
        {/*<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />*/}
        <div className="container pt-5">
              <div className="row">
                <div className="col-md-8 order-md-2 col-lg-9">
                  <div className="container-fluid">
                    <div className="row">
                      {products.map((value)=>(
                        <ProductCard nombre={value.nombre} precio={value.precio} url={value.url_fotos[0]}/>
                      ))}
                    </div>
                  </div>
                </div><div className="col-md-4 order-md-1 col-lg-3 sidebar-filter">
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
                    <button onClick={()=>{filterProducts()}} className="btn btn-lg btn-block btn-primary mt-5">Filtrar Productos</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
}

export default MainMenu;


