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

  /*useEffect(() => {
    debugger
    if (!cookies.get('User')) {
      navigate('/')
    }
  }, [])*/

  const cerrarSesion = () => {
    debugger
    cookies.remove('Nombre', { path: '/' })
    cookies.remove('Apellido', { path: '/' })
    cookies.remove('Dni', { path: '/' })
    cookies.remove('Email', { path: '/' })
    cookies.remove('User', { path: '/' })
    cookies.remove('Password', { path: '/' })
    navigate('/')
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">RetroShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Cart onClick={()=>{navigate('/mainmenu')}} style={{color: 'white', alignSelf: 'center', cursor: 'pointer'}}>
            </Cart>
            <span id="badgeCarrito" class="position-absolute top-50 start-5 carrito p-1 badge bg-danger rounded-circle">
                {cookies.get('Carrito') !== undefined ? cookies.get('Carrito').length : 0}
            </span>
            <NavDropdown title="Perfil" id="collasible-nav-dropdown" align="end">
              <NavDropdown.Item onClick={()=>{navigate('/publish')}}>Publicar</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{}}>Mis publicaciones</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{}}>Mis compras</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{}}>Cargar saldo</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>cerrarSesion()}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;