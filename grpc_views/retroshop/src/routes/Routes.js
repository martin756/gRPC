import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '../pages/Login'
import MainMenu from '../pages/MainMenu';
import Signup from '../pages/Signup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/mainmenu' element={<MainMenu />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
