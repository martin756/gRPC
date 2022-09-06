import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import MainMenu from '../pages/MainMenu';
import Publish from '../pages/Publish'
import BuyProduct from '../pages/BuyProduct';
import Carrito from '../pages/Carrito';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/mainmenu' element={<MainMenu />}/>
        <Route path='/publish' element={<Publish />}/>
        <Route path='/buyProduct' element={<BuyProduct />}/>
        <Route path='/carrito' element={<Carrito />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
