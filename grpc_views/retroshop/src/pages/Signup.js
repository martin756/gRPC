import React, { useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

function Signup(props) {
    const baseUrl="https://localhost:5001/api/Usuarios"
    const cookies = new Cookies()
    const nombre = useRef(null),apellido = useRef(null)
    const dni = useRef(null),email = useRef(null)
    const username = useRef(null),password = useRef(null)
    const navigate = useNavigate()

    const registrarse=async(event)=>{
        debugger
        event.preventDefault()

        const jsonBody = 
        {
            "nombre": nombre.current.value,
            "apellido": apellido.current.value,
            "dni": dni.current.value,
            "email": email.current.value,
            "user": username.current.value,
            "password": password.current.value
        }
        debugger
        await axios.post(baseUrl, jsonBody)
        .then(response=>{
            debugger
            if (response.data.Message !== '400'){
                navigate('/')
            }else{
                alert("El usuario ya se encuentra registrado")
            }
        })
        .catch((error)=>{
            alert(error)
            //alert("Todos los campos son obligatorios")
        })
    }

    useEffect(()=>{
        if(cookies.get('User')){
            navigate('/mainmenu')
        }
    },[])

    return (
        <div className='containerPrincipal'>
            <div className='containerTitulo'>
                RetroShop</div>
            <div className='containerHome'>
                <form onSubmit={event => registrarse(event)} className='form-group'>
                    <label>Nombre: </label>
                    <br />
                    <input ref={nombre} type="text" className='form-control' name='nombre' required />
                    <br />
                    <label>Apellido: </label>
                    <br />
                    <input ref={apellido} type='text' className='form-control' name='apellido' required />
                    <br />
                    <label>Dni: </label>
                    <br />
                    <input ref={dni} type="number" className='form-control' name='dni' required />
                    <br />
                    <label>Email: </label>
                    <br />
                    <input ref={email} type="text" className='form-control' name='email' required />
                    <br />
                    <label>User: </label>
                    <br />
                    <input ref={username} type="text" className='form-control' name='usuario' required />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input ref={password} type="password" className='form-control' name='password' required
                    />
                    <br />
                    <button type="submit" className='btn btn-primary'>Registrarse</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;