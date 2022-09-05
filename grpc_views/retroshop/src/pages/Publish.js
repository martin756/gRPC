import React, { useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import Header from "../components/Header";
import { PlusLg, DashLg } from 'react-bootstrap-icons'

function Publish(props) {
    const baseUrl="https://localhost:5001/api/Publicar"
    const nombre = useRef(null) 
    const descripcion = useRef(null)
    const precio = useRef(null)
    const stock = useRef(null)
    const fechaFabricacion = useRef(null)
    const imagen1 = useRef(null), imagen2 = useRef(null)
    const imagen3 = useRef(null), imagen4 = useRef(null), imagen5 = useRef(null)
    const navigate = useNavigate()
    const [inputs, setInputsState] = useState([])

    const publicar=async(event)=>{
        event.preventDefault()
        const jsonBody = 
        {
            "nombre": nombre.current.value,
            "descripcion": descripcion.current.value,
            "precio": precio.current.value,
            "stock": stock.current.value,
            "fechaFabricacion": fechaFabricacion.current.value,
            "imagenes": [imagen1.current.value, imagen2.current.value, imagen3.current.value, imagen4.current.value, imagen5.current.value]
        }
        debugger
        await axios.post(baseUrl, jsonBody)
        .then(response=>{
            if (response.data.Message.includes('400')){
                navigate('/')
            }else{
                alert("El producto ya se encuentra publicado")
            }
        })
        .catch(()=>{
            alert("Todos los campos son obligatorios")
        })

    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://getbootstrap.com/docs/5.2/examples/checkout/form-validation.js";
        script.async = true;
        document.body.appendChild(script);
      return () => {
          document.body.removeChild(script);
        }
      }, []);

      /*const addDynamicInput = () => {
        if (inputs.length <= 3) {
            imagen.current.push()
            let arr = [...inputs]
            arr.push(inputs.length)
            setInputsState(arr)
        }
      }

      const removeDynamicInput = (index) => {
        debugger
        let r = imagen.current;
        if (inputs.length > 0) {
            let arr = [...inputs]
            arr.splice(index,1)
            setInputsState(arr)
        }
      }*/

    return (
        <div>
        <Header />
        <div className="container">
            <div className="row g-5 mt-4" style={{justifyContent: 'center'}}>
            <div className="col-md-6 col-lg-7">
                <h4 className="mb-3">Publicar nuevo producto</h4>
                <form onSubmit={event => publicar(event)} className="needs-validation" noValidate>
                <div className="row g-3">
                    <div className="col-12">
                        <label className="form-label">Nombre del producto</label>
                        <input ref={nombre} type="text" className='form-control' required/>
                        <div className="invalid-feedback">El nombre del producto es requerido.</div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Descripción <span className="text-muted">(Opcional)</span></label>
                        <input ref={descripcion} type='text' className='form-control'/>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Precio unitario</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text">$</span>
                            <input ref={precio} type="number" className='form-control' name='precio' required min="1"/>
                            <span className="input-group-text">.00</span>
                            <div className="invalid-feedback">Precio inválido.</div>
                        </div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Cantidad a stockear</label>
                        <input ref={stock} type="number" className='form-control' required min="1"/>
                        <div className="invalid-feedback">Ingrese una cantidad válida.</div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Fecha de fabricación</label>
                        <input ref={fechaFabricacion} type="date" className='form-control' required/>
                        <div className="invalid-feedback">Ingrese la fecha de fabricación.</div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">URLs de imágenes <span className="text-muted">(Máx. 5)</span></label>
                        <div className="input-group has-validation mb-1">
                            <input ref={imagen1} type="text" className='form-control' required key="1"/>
                            <div className="invalid-feedback">Provea una URL de imagen del producto.</div>
                        </div>
                        <div className="input-group has-validation mb-1" key="2">
                            <input ref={imagen2} type="text" className='form-control'/>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="input-group has-validation mb-1" key="3">
                            <input ref={imagen3} type="text" className='form-control'/>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="input-group has-validation mb-1" key="4">
                            <input ref={imagen4} type="text" className='form-control'/>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="input-group has-validation mb-1" key="5">
                            <input ref={imagen5} type="text" className='form-control'/>
                            <div className="invalid-feedback"></div>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <button className="w-100 btn btn-primary btn-lg" type="submit">Publicar</button>
                </form>
            </div>
        </div>
    </div>
        {/*<div className='containerPrincipal'>
            <div className='containerTitulo'>
                Publicar un nuevo producto</div>
            <div className='containerHome'>
                <form onSubmit={event => publicar(event)} className='form-group'>
                    <label>Nombre: </label>
                    <br />
                    <input ref={nombre} type="text" className='form-control' name='nombre' required/>
                    <br />
                    <label>Descripción: </label>
                    <br />
                    <input ref={descripcion} type='text' className='form-control' name='descripcion'/>
                    <br />
                    <label>Precio unitario: </label>
                    <br />
                    <input ref={precio} type="number" className='form-control' name='precio' required/>
                    <br />
                    <label>Cantidad de stock: </label>
                    <br />
                    <input ref={stock} type="number" className='form-control' name='stock' required/>
                    <br />
                    <label>Fecha de fabricación: </label>
                    <br />
                    <input ref={fechaFabricacion} type="text" className='form-control' name='fechaFabricacion' required/>
                    <br />
                    <label>URL de imagen: </label>
                    <br />
                    <input ref={imagen} type="text" className='form-control' name='imagen' required/>
                    <br />
                    <button type="submit" className='btn btn-primary'>Publicar</button>
                </form>
            </div>
    </div>*/}
        </div>
    );
}

export default Publish;