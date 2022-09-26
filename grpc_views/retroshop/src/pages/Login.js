import React, { useRef, useEffect }  from 'react'
import {useNavigate} from 'react-router-dom'
import md5 from 'md5'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cookies from 'universal-cookie'
import axios from 'axios'
import '../css/Home.css'

function Login() {
    const baseUrl="https://localhost:5001/api/Usuarios"
    const cookies = new Cookies()
    const username = useRef(null)
    const password = useRef(null)
    const navigate = useNavigate()

    const iniciarSesion=async(event)=>{
        debugger
        event.preventDefault()
        await axios.get(baseUrl+`/?username=${username.current.value}&password=${password.current.value}`)
        .then(response=>{
            return response.data
        }).then(response=>{
            if(response.User !== undefined && response.User !== ''){
                cookies.set('Idusuario',response.Idusuario)
                cookies.set('Nombre',response.Nombre)
                cookies.set('Apellido',response.Apellido)
                cookies.set('Dni',response.Dni)
                cookies.set('Email',response.Email)
                cookies.set('User',response.User)
                cookies.set('Password',response.Password)
                cookies.set('EsMonitor',response.EsMonitor)
                cookies.set('Saldo',response.Saldo)
                alert("Bienvenido "+response.Nombre)
                response.EsMonitor ? navigate('/admin') : navigate('/mainmenu')
            }else{
                alert("El usuario o la contraseña no son correctos")
            }
        })
        .catch(error=>{
            alert(error)
        })
        //navigate('/mainmenu')
    }

    const Registrarse=()=>{
        navigate('/signup')
    }

    useEffect(()=>{
        if(cookies.get('User') && !JSON.parse(cookies.get('EsMonitor'))){
            navigate('/mainmenu')
        }else if(cookies.get('User') && JSON.parse(cookies.get('EsMonitor'))){
            navigate('/admin')
        }
    },[])

    return (
        <div className='containerPrincipal'>
            <div className='containerTitulo'>
                RetroShop</div>
            <div className='containerHome'>
                <form onSubmit={event => iniciarSesion(event)} className='form-group'>
                    <label>Usuario: </label>
                    <br />
                    <input ref={username} type="text" className='form-control' name='usuario' required />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input ref={password} type='password' className='form-control' name='password' required />
                    <br />
                    <button type="submit" className='btn btn-primary'>Iniciar Sesión</button>
                </form>
                <button onClick={()=>Registrarse()} className='btn'>Registrarse</button>
            </div>
        </div>
    )
}

export default Login;