import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Header from '../components/Header'

function ChargeBalance() {
    const cookies = new Cookies()
    let saldoDisponible = cookies.get('Saldo') === undefined ? 0 : parseFloat(cookies.get('Saldo'))
    let idUsuario = cookies.get('Idusuario') === undefined ? 0 : cookies.get('Idusuario')
    const saldoACargar = useRef(null)
    const navigate = useNavigate()

    const cargarSaldo = async (event) =>{
        event.preventDefault()
        let saldo = saldoACargar.current === undefined ? 0.0 : parseFloat(saldoACargar.current.value)
        await axios.post("https://localhost:5001/api/Usuarios/CargarSaldo",{"idusuario": idUsuario, "saldo_": saldo})
        .then(response=>{
            debugger
            saldoDisponible += saldo
            cookies.set('Saldo',saldoDisponible)
            alert(response.data.Message)
        }).catch(error=>{
            alert(error)
        })
        navigate('/mainmenu')
    }

    useEffect(()=>{

    },[])
  return (
    <div>
        <Header />
        <div className="container">
            <div className="row g-5 mt-4" style={{justifyContent: 'center'}}>
                <div className="col-md-6 col-lg-7">
                    <h4 className="mb-3">Cargar Saldo</h4>
                    <form onSubmit={event => cargarSaldo(event)} className="needs-validation" noValidate>
                    <div className="row g-3">
                        <div className="col-12">
                            <div className="input-group has-validation">
                                <span className="input-group-text">$</span>
                                <input ref={saldoACargar} type="number" className='form-control' name='precio' required min="1" defaultValue={1000}/>
                                <span className="input-group-text">.00</span>
                                <div className="invalid-feedback"></div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <button className="w-100 btn btn-primary btn-lg" type="submit">Cargar Saldo</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChargeBalance