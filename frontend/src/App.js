import './App.css';
import React from 'react';
import {Route,BrowserRouter,Routes} from 'react-router-dom';
//BOOTSTRAPT
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import Login from './components/Login';
import regUsers from './components/registros/Reg_users';
import regViajes from './components/registros/Reg_viajes';
import regAutos from './components/registros/Reg_autos';
import regRecep from './components/registros/Reg_recep';
import rentaAutos from './components/rentas/rentaAuto';
import rentaVuelos from './components/rentas/rentaVuelo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" exact element={<Login/>}/>
      <Route path="/regUser" exact element={<regUsers/>}/>
      <Route path="/regViajes" exact element={<regViajes/>}/>
      <Route path="/regAutos" exact element={<regAutos/>}/>
      <Route path="/regRecep" exact element={<regRecep/>}/>

      <Route path="/rentaAutos" exact element={<rentaAutos/>}/>
      <Route path="/rentaVuelos" exact element={<rentaVuelos/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;