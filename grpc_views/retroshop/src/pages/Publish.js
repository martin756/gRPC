import React, { useEffect, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import Header from "../components/Header";
import { PlusLg, DashLg } from 'react-bootstrap-icons'
import { categorias } from "./productsDemo";
import Cookies from "universal-cookie";

function Publish(props) {
    const baseUrl="https://localhost:5001/api/Producto"
    const nombre = useRef(null) 
    const descripcion = useRef(null)
    const precio = useRef(null)
    const stock = useRef(null)
    const fechaFabricacion = useRef(null)
    const fechaFinalizacionSubasta = useRef(null)
    const esSubasta = useRef(null)
    const tipoCategoria = useRef(null)
    const imagen1 = useRef(null), imagen2 = useRef(null)
    const imagen3 = useRef(null), imagen4 = useRef(null), imagen5 = useRef(null)
    const navigate = useNavigate()
    const [inputs, setInputsState] = useState([])
    const cookies = new Cookies()
    const idusuario = cookies.get('Idusuario') === undefined ? 0 : cookies.get('Idusuario')
    const [isChecked, setIsChecked] = useState(false);

    const publicar=async(event)=>{
        event.preventDefault()
        debugger
        const jsonBody = 
        {
            "nombre": nombre.current.value,
            "descripcion": descripcion.current.value,
            "idtipocategoria": tipoCategoria.current.options[tipoCategoria.current.options.selectedIndex].index,
            "precio": parseFloat(precio.current.value),
            "cantidad_disponible": parseInt(stock.current.value),
            "fecha_publicacion": fechaFabricacion.current.value,
            "publicador_idusuario": parseInt(idusuario),
            "url_fotos": [imagen1.current.value, imagen2.current.value, imagen3.current.value, imagen4.current.value, imagen5.current.value],
            "fecha_finalizacion_subasta": fechaFinalizacionSubasta.current.value,
            "esSubasta": isChecked
        }
        debugger
        await axios.post(baseUrl, jsonBody)
        .then(response=>{
            if (response.data.Message.includes('400')){
                alert(response.data.Message)
            }else{
                alert("Producto publicado correctamente")
                navigate('/')
                
            }
        })
        .catch((error)=>{
            alert(error)
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

      const handleOnChange = () => {
        setIsChecked(!isChecked);
      };

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
                        <label className="form-label">Categoría</label>
                        <select ref={tipoCategoria} className="form-select" required>
                            <option value="">Seleccione categoria</option>
                            {categorias.map((value, index)=>(
                                <option>{value}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">Seleccione una categoría.</div>
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
                            <input ref={imagen2} type="text" className='form-control' placeholder="Opcional"/>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="input-group has-validation mb-1" key="3">
                            <input ref={imagen3} type="text" className='form-control' placeholder="Opcional"/>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="input-group has-validation mb-1" key="4">
                            <input ref={imagen4} type="text" className='form-control' placeholder="Opcional"/>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="input-group has-validation mb-1" key="5">
                            <input ref={imagen5} type="text" className='form-control' placeholder="Opcional"/>
                            <div className="invalid-feedback"></div>
                        </div>
                    </div>
                    <div>
                        <div class="custom-control custom-checkbox mb-3">
                            <input type="checkbox" id="topping" name="topping" value="Paneer" checked={isChecked} onChange={handleOnChange}/> 
                            <label class="custom-control-label" for="customControlValidation1">¿Es subasta?</label>
                        </div>
                        <div>
                            <div className="col-12">
                                <label className="form-label">Fecha de finalizacion de la subasta</label>
                                <input ref={fechaFinalizacionSubasta} type="datetime-local" className='form-control' name="text" min={new Date().toISOString().slice(0, -8)} max="2025-01-01" disabled={!isChecked} required/>
                                <div className="invalid-feedback">Ingrese la fecha de finalización de la subasta!</div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <button className="w-100 btn btn-primary btn-lg" type="submit">Publicar</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Publish;