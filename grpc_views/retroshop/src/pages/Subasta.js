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
import Alert from 'react-bootstrap/Alert';
import CountdownTimer from '../components/CountdownTimer';


function Subasta() {
    const navigate = useNavigate()
    const cookies = new Cookies()

    const precio = useRef(null)
    const [statePrecio, setPrecio] = useState(0)
    const [producto, setProducto] = useState([])
    const [fechaActual, setFechaActual] = useState(new Date())
    const [datosPublicador, setDatosPublicador] = useState([])
    const [stringsUrlsFotos, setArrayUrlsStrings] = useState([])

    const { search } = useLocation();
    let query = React.useMemo(() => new URLSearchParams(search), [search]);

    const idProduct = query.get('id')
    const baseUrl = "https://localhost:5001/api/Producto/"

    const pujar = async (event) => {
        event.preventDefault()
        debugger
        const jsonBody = {
            idPujador: parseInt(cookies.get('Idusuario')),
            precioOfrecido: parseFloat(precio.current.value),
            idProducto: parseInt(idProduct),
            fechaPuja: {"seconds": Math.floor(Date.now()/1000), "nanos": 0}
        }
        await axios.post(baseUrl+"PostPujaSubastaKafka",jsonBody)
        .then(response=>{
            //alert("Nuevo precio ofertado")
            const p = parseFloat(precio.current.value)
            setPrecio(p)
        })
        .catch(error=>{
            alert(error)
        })
    }

    const traerProductoEnSubasta = async () => {
        await axios.get(baseUrl+"GetProductoById"+`/?id=${idProduct}`)
        .then(response=>{
            debugger
            const jsonResponse = response.data
            jsonResponse.FechaFin = (jsonResponse.FechaFin.Seconds+10800)*1000
            jsonResponse.FechaInicio = (jsonResponse.FechaInicio.Seconds+10800)*1000
            jsonResponse.FechaUltimaPuja = (jsonResponse.FechaUltimaPuja.Seconds+10800)*1000
            setProducto(jsonResponse)
            setArrayUrlsStrings(jsonResponse.UrlFotos)
            setDatosPublicador(response.data.Publicador)
            setPrecio(jsonResponse.PrecioFinal)
        })
        .catch(error=>{
            alert(error)
        })
    }

    useEffect(() => {
        traerProductoEnSubasta()
        setInterval(()=>{
            setFechaActual(new Date())
        },1000)
        const script = document.createElement('script');
        script.src = "https://getbootstrap.com/docs/5.2/examples/checkout/form-validation.js";
        script.async = true;
        document.body.appendChild(script);
      return () => {
          document.body.removeChild(script);
        }
      }, []);

      const SOCKET_URL = "http://localhost:8080/pujas"

      let onConnected = () => {
          console.log("Conectado al websocket")
      }
  
      let onMessageReceived = (msg) => {
          //console.log(msg)
          alert("Nuevo precio ofertado")
          setPrecio(msg.PrecioOfrecido)
      }

    //La fecha que se convierte para usarse en el contador
    const fechaString = producto.FechaFin;
    const fechaDate = new Date(fechaString);
    const dateTimeLeft = fechaDate.getTime()

    return (
        <div>
            <Header />
            <SockJsClient 
            url={SOCKET_URL}
            topics={['/topic/ultimaPuja']}
            onConnect={onConnected}
            onDisconnect={console.log("Desconectado!")}
            onMessage={msg => onMessageReceived(msg)}
            debug={false}
            />
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
                            <h2 className="name">{producto.Nombre}<h5>Publicado por <a href="#">{datosPublicador.User}</a></h5></h2>
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
                                        La subasta caduca en:
                                        <CountdownTimer targetDate={dateTimeLeft} />
                                    </div>
                                    <hr />
                                    <div>
                                        Ultima puja: 
                                        <h5>$ {statePrecio}</h5>
                                    </div>
                                    <br />
                                    {fechaActual < new Date(producto.FechaFin) ?
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 col-lg-6">
                                        <form onSubmit={(event)=>{pujar(event)}} className="needs-validation" noValidate>
                                            <div className="col-12">
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text">$</span>
                                                    <input ref={precio} type="number" className='form-control' placeholder='Oferte un monto' name='precio' required min={statePrecio+1} defaultValue={statePrecio+1}/>
                                                    <span className="input-group-text">.00</span>
                                                    <div className="invalid-feedback">Precio inferior al ultimo ofertado.</div>
                                                </div>
                                            </div>
                                            <br></br>
                                            <button type="submit" className="btn btn-success btn-lg">Pujar</button>
                                        </form>
                                        </div>
                                    </div>
                                    : 
                                    <Alert key="danger" variant="danger">
                                        La subasta se ha cerrado!
                                    </Alert>
                                    }
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
    const SOCKET_URL = "http://localhost:8080/pujas"

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
        topics={['/topic/ultimaPuja']}
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