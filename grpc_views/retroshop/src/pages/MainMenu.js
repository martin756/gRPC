import React, {useEffect, useRef, useState} from 'react'
import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductCard from '../components/ProductCard';
//import '../css/ShopProductsList.css'

function MainMenu() {
    const categorias = [
        "Videojuegos",
        "Musica",
        "Diarios",
        "Revistas",
        "Adornos"
    ]
    const jsonProducts = [
        {
            nombre: "Resident Evil 4",
            descripcion: "Esta buenisimo",
            url_fotos: [
                "https://m.media-amazon.com/images/M/MV5BOGVkNjEyN2EtMjRiYi00ZWY1LThkOWItZTNkNjA0MTE4YmRhXkEyXkFqcGdeQXVyNjUxNDQwMzA@._V1_.jpg"
            ],
            categoria: categorias[0],
            precio: 345.99,
            cantidad_disponible: 300,
            fecha_fabricacion: new Date(2011,3,15),
            publicador: "Jorgito"
        },
        {
            nombre: "Coldplay",
            descripcion: "A Sky Full of Stars",
            url_fotos: [
                "https://i.scdn.co/image/ab67706f00000003a231f671c289555cfd09f716",
                "www.7amlle3ba.com/wp-content/uploads/2019/09/Resident-Evil-4.jpg"
            ],
            categoria: categorias[1],
            precio: 116.50,
            cantidad_disponible: 140,
            fecha_fabricacion: new Date(2015,4,18),
            publicador: "Kalii46"
        },
        {
            nombre: "Clarin",
            descripcion: "Noticias",
            url_fotos: [
                "https://comercial.clarin.com/wp-content/uploads/2018/09/Clarin-357x537-c-center.jpg",
                "www.7amlle3ba.com/wp-content/uploads/2019/09/Resident-Evil-4.jpg",
                "www.7amlle3ba.com/wp-content/uploads/2019/09/Resident-Evil-4.jpg"
            ],
            categoria: categorias[2],
            precio: 18.00,
            cantidad_disponible: 500,
            fecha_fabricacion: new Date(2015,7,1),
            publicador: "Dario.13"
        },
        {
            nombre: "Pronto",
            descripcion: "Todo revistas",
            url_fotos: [
                "https://perlitasperiodisticas.files.wordpress.com/2020/04/pronto.jpg",
                "www.7amlle3ba.com/wp-content/uploads/2019/09/Resident-Evil-4.jpg",
                "www.7amlle3ba.com/wp-content/uploads/2019/09/Resident-Evil-4.jpg"
            ],
            categoria: categorias[3],
            precio: 54.00,
            cantidad_disponible: 300,
            fecha_fabricacion: new Date(2012,7,16),
            publicador: "Robert45"
        },
        {
            nombre: "Guirnalda inglesa",
            descripcion: "Muy pesado",
            url_fotos: [
                "https://i0.wp.com/www.puntoled.com.ar/wp-content/uploads/2021/07/Guirnalda-de-2-Mt-de-Esferas-de-4-Cm-en-Hilo-en-Colores-Tierra-y-luces-LED.png?fit=1080%2C1080",
                "www.7amlle3ba.com/wp-content/uploads/2019/09/Resident-Evil-4.jpg",
                "www.7amlle3ba.com/wp-content/uploads/2019/09/Resident-Evil-4.jpg"
            ],
            categoria: categorias[4],
            precio: 927.00,
            cantidad_disponible: 11,
            fecha_fabricacion: new Date(1945,4,23),
            publicador: "yudi44"
        },
        {
            nombre: "Florero Suizo",
            descripcion: "Gran adorno",
            url_fotos: [
                "https://www.antiguedadesroldan.com/wp-content/uploads/2020/05/1-139-1-scaled.jpg",
                "www.7amlle3ba.com/wp-content/uploads/2019/09/Resident-Evil-4.jpg",
                "www.7amlle3ba.com/wp-content/uploads/2019/09/Resident-Evil-4.jpg"
            ],
            categoria: categorias[4],
            precio: 405.00,
            cantidad_disponible: 141,
            fecha_fabricacion: new Date(1967,6,3),
            publicador: "Robert45"
        }
    ]

    const [products, setProductsFilter] = useState(jsonProducts)
    const filtroCategoria = useRef(null),filtroNombre = useRef(null)
    const filtroPrecioDesde = useRef(null),filtroPrecioHasta = useRef(null)
    const filtroFechaDesde = useRef(null),filtroFechaHasta = useRef(null)

    const filterProducts = () => {
        const filteredProducts = products.filter(product=>product.nombre==filtroNombre.current.value)
        setProductsFilter(filteredProducts)
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
                        <option defaultselected value="Seleccione categoria">Seleccione categoria</option>
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


