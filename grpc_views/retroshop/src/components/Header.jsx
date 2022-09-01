import React, { useEffect }  from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

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
        <Navbar.Brand href="#home">RetroShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <NavDropdown title="Perfil" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Publicar</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Mis publicaciones</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Mis compras</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Cargar saldo</NavDropdown.Item>
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