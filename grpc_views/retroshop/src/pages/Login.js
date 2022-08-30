import {useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import md5 from 'md5'
import 'bootstrap/dist/css/bootstrap.min.css'
import Cookies from 'universal-cookie'
import axios from 'axios'
import '../css/Home.css'

function Login(props) {
    const baseUrl="https://localhost:5001/api/Usuarios"
    const cookies = new Cookies()
    const username = useRef(null)
    const password = useRef(null)
    const navigate = useNavigate()

    const iniciarSesion=async()=>{
        await axios.get(baseUrl+`/?username=${username.current.value}&password=${password.current.value}`)
        .then(response=>{
            return response.data
        }).then(response=>{
            if(response.User != undefined && response.User != ''){
                cookies.set('Nombre',response.Nombre, {path: '/'})
                cookies.set('Apellido',response.Nombre, {path: '/'})
                cookies.set('Dni',response.Dni, {path: '/'})
                cookies.set('Email',response.Email, {path: '/'})
                cookies.set('User',response.User, {path: '/'})
                cookies.set('Password',response.Password, {path: '/'})
                alert("Bienvenido "+response.Nombre)
            }else{
                alert("El usuario o la contraseña no son correctos")
            }
        })
        .catch(error=>{
            alert(error)
        })
    }

    const Registrarse=()=>{
        navigate('/signup')
    }

    return (
        <div className='containerPrincipal'>
            <div className='containerTitulo'>
                RetroShop</div>
            <div className='containerHome'>
                <div className='form-group'>
                    <label>Usuario: </label>
                    <br />
                    <input
                      ref={username}
                      type="text"
                      className='form-control'
                      name='usuario'
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                      ref={password}
                      type='password'
                      className='form-control'
                      name='password'
                    />
                    <br />
                    <button onClick={()=>iniciarSesion()} className='btn btn-primary'>Iniciar Sesión</button>
                </div>
                <button onClick={()=>Registrarse()} className='btn'>Registrarse</button>
            </div>
        </div>
    )
}

export default Login;