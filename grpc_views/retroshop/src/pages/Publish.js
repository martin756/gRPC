import React, { useRef } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

function Publish(props) {
    const baseUrl="https://localhost:5001/api/Publicar"
    const nombre = useRef(null) 
    const descripcion = useRef(null)
    const precio = useRef(null)
    const stock = useRef(null)
    const fechaFabricacion = useRef(null)
    const imagen = useRef(null)
    const navigate = useNavigate()

    const publicar=async()=>{
        const jsonBody = 
        {
            "nombre": nombre.current.value === "" ? 0 : nombre.current.value,
            "descripcion": descripcion.current.value === "" ? 0 : descripcion.current.value,
            "precio": precio.current.value,
            "stock": stock.current.value,
            "fechaFabricacion": fechaFabricacion.current.value === "" ? 0 : fechaFabricacion.current.value,
            "imagen": imagen.current.value === "" ? 0 : imagen.current.value
        }
        debugger
        await axios.post(baseUrl, jsonBody)
        .then(response=>{
            debugger
            if (response.data.Message !== '400'){
                navigate('/')
            }else{
                alert("El producto ya se encuentra publicado")
            }
        })
        .catch(()=>{
            alert("Todos los campos son obligatorios")
        })

    }

    return (
        <div className='containerPrincipal'>
            <div className='containerTitulo'>
                Publicar un nuevo producto</div>
            <div className='containerHome'>
                <div className='form-group'>
                <label>Nombre: </label>
                    <br />
                    <input
                        ref={nombre}
                        type="text"
                        className='form-control'
                        name='nombre'
                    />
                    <br />
                    <label>Descripción: </label>
                    <br />
                    <input
                        ref={descripcion}
                        type='text'
                        className='form-control'
                        name='descripcion'
                    />
                    <br />
                    <label>Precio unitario: </label>
                    <br />
                    <input
                        ref={precio}
                        type="number"
                        className='form-control'
                        name='precio'
                    />
                    <br />
                    <label>Cantidad de stock: </label>
                    <br />
                    <input
                        ref={stock}
                        type="number"
                        className='form-control'
                        name='stock'
                    />
                    <br />
                    <label>Fecha de fabricación: </label>
                    <br />
                    <input
                        ref={fechaFabricacion}
                        type="text"
                        className='form-control'
                        name='fechaFabricacion'
                    />
                    <br />
                    <label>URL de imagen: </label>
                    <br />
                    <input
                        ref={imagen}
                        type="text"
                        className='form-control'
                        name='imagen'
                    />
                    <br />
                    <button onClick={() => publicar()} className='btn btn-primary'>Publicar</button>
                </div>
            </div>
        </div>
    );
}

export default Publish;