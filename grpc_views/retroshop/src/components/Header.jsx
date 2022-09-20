import React, { useEffect }  from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Cart } from 'react-bootstrap-icons';
import '../css/ShopProductsList.css'

function Header() {
  const cookies = new Cookies()
  const navigate = useNavigate()

  const cerrarSesion = () => {
    cookies.remove('Nombre')
    cookies.remove('Apellido')
    cookies.remove('Dni')
    cookies.remove('Email')
    cookies.remove('User')
    cookies.remove('Password')
    cookies.remove('EsMonitor')
    cookies.remove('Saldo')
    navigate('/')
  }
  
  useEffect(() => {
    if (!cookies.get('User')) {
      navigate('/')
    }
  }, [])

  return (
    <div>
      {JSON.parse(cookies.get('EsMonitor')) ? 
      <UsuarioMonitor cookies={cookies} closeSession={cerrarSesion}/> 
      : 
      <UsuarioComun cookies={cookies} navigator={navigate} closeSession={cerrarSesion}/>}
    </div>
  );
}

function UsuarioComun(props){
  return(
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
        <Container>
          <Navbar.Brand href="/">RetroShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <div style={{color: 'white', alignSelf: 'center', paddingRight: '10px'}}>
                Balance: ${props.cookies.get('Saldo')}
              </div>
              <Cart onClick={()=>{props.navigator('/carrito')}} style={{color: 'white', alignSelf: 'center', cursor: 'pointer'}}>
              </Cart>
              <span id="badgeCarrito" class="position-absolute top-50 start-5 carrito p-1 badge bg-danger rounded-circle">
                  {props.cookies.get('Carrito') !== undefined ? props.cookies.get('Carrito').length : 0}
              </span>
              <NavDropdown title={props.cookies.get('Nombre')} id="collasible-nav-dropdown" align="end">
                <NavDropdown.Item onClick={()=>{props.navigator('/publish')}}>Publicar</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>{props.navigator('/publishedProducts')}}>Mis publicaciones</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>{props.navigator('/myShopping')}}>Mis compras</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>{props.navigator('/chargeBalance')}}>Cargar saldo</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={()=>props.closeSession()}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

function UsuarioMonitor(props){
  return(
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
        <Container>
          <Navbar.Brand href="/">RetroShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavDropdown title={props.cookies.get('Nombre')} id="collasible-nav-dropdown" align="end">
                <NavDropdown.Item onClick={()=>props.closeSession()}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;