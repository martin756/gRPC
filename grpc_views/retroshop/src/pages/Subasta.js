import React, { useRef, useEffect, useState } from 'react'
import SockJsClient from 'react-stomp'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { jsonProducts } from './productsDemo';
import Carousel from 'react-bootstrap/Carousel'
import Header from '../components/Header';
import { CartPlusFill } from 'react-bootstrap-icons';
import Cookies from 'universal-cookie';
import axios from 'axios';


function Subasta() {
    const navigate = useNavigate()
    const cookies = new Cookies()

    const precio = useRef(null)
    const [producto, setProducto] = useState([])
    const [stringsUrlsFotos, setArrayUrlsStrings] = useState([])

    const { search } = useLocation();
    let query = React.useMemo(() => new URLSearchParams(search), [search]);

    const idProduct = query.get('id')
    const baseUrl = "https://localhost:5001/api/Producto/GetProductoById"

    const pujar = (event) => {
        event.preventDefault()
        //implementacion endpoint de actualizacion de la ultima puja precio en subasta
    }

    const traerProducto = async () => {
        await axios.get(baseUrl+`/?id=${idProduct}`)
        .then(response=>{
            setProducto(response.data)
            setArrayUrlsStrings(response.data.UrlFotos)
        })
        .catch(error=>{
            alert(error)
        })
    }

    useEffect(() => {
        traerProducto()
        const script = document.createElement('script');
        script.src = "https://getbootstrap.com/docs/5.2/examples/checkout/form-validation.js";
        script.async = true;
        document.body.appendChild(script);
      return () => {
          document.body.removeChild(script);
        }
      }, []);

    return (
        <div>
            <Header />
            <div className="container">
                <div className="product-content product-detail">
                    <div className="row justify-content-center" style={{alignItems: 'center'}}>
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <Carousel style={{ width: '300px', height: '400px' }}>
                                {stringsUrlsFotos.map((value) => (
                                    value !== "" &&
                                    <Carousel.Item>
                                        <img
                                            className="d-block"
                                            style={{ width: '300px', height: '400px' }}
                                            src={value}
                                            alt="..."
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <h2 className="name">{producto.Nombre}<h5>Publicado por <a href="#">{producto.Publicador}</a></h5></h2>
                            <h5>{producto.FechaPublicacion}</h5>
                            <hr /><h3 className="price-container">${producto.Precio}</h3><hr />
                            <div className="description description-tabs">
                                <div className="tab-content">
                                        <strong>Descripción del producto</strong>
                                        <p>{producto.Descripcion}</p>
                                    <hr/>
                                    <div>
                                        Unidades en subasta: 
                                        <h5>{producto.CantidadDisponible}
                                        </h5>
                                    </div>
                                    <hr />
                                    <div>
                                        Tiempo restante de la subasta:
                                        <h5>{new Date().toLocaleString()}</h5>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 col-lg-6">
                                        <form onSubmit={(event)=>{pujar(event)}} className="needs-validation" noValidate>
                                            <div className="col-12">
                                                <label className="form-label">Ultima puja</label>
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text">$</span>
                                                    <input ref={precio} type="number" className='form-control' placeholder='Oferte un monto' name='precio' required min={producto.Precio} defaultValue={producto.Precio}/>
                                                    <span className="input-group-text">.00</span>
                                                    <div className="invalid-feedback">Precio inválido.</div>
                                                </div>
                                            </div>
                                            <br></br>
                                            <button type="submit" className="btn btn-success btn-lg">Pujar</button>
                                        </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
/*function Subasta() {
    const [mensajes, setMessage] = useState([])
    const SOCKET_URL = "http://localhost:8080/mensajes"

    let onConnected = () => {
        console.log("Conectado al websocket")
    }

    let onMessageReceived = (msg) => {
        console.log(msg)
        setMessage(mensajes.concat(msg))
    }

  return (
    <div>
        <SockJsClient 
        url={SOCKET_URL}
        topics={['/topic/mensaje']}
        onConnect={onConnected}
        onDisconnect={console.log("Desconectado!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
        />
        {mensajes.map((item, index)=>(
            <div>{JSON.stringify(item)}</div>
        ))}
    </div>
  )
}*/

export default Subasta