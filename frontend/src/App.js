import './App.css';
import React from 'react';
import {Route,BrowserRouter,Routes} from 'react-router-dom';
//BOOTSTRAPT
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import Login from './components/Login';
import RegUsers from './components/registros/Reg_users';
import RegViajes from './components/registros/Reg_viajes';
import RegAutos from './components/registros/Reg_autos';
import RegRecep from './components/registros/Reg_recep';
import RentaAutos from './components/rentas/rentaAuto';
import RentaVuelos from './components/rentas/rentaVuelo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" exact element={<Login/>}/>
      <Route path="/regUser" exact element={<RegUsers/>}/>
      <Route path="/regViajes" exact element={<RegViajes/>}/>
      <Route path="/regAutos" exact element={<RegAutos/>}/>
      <Route path="/regRecep" exact element={<RegRecep/>}/>

      <Route path="/rentaAutos" exact element={<RentaAutos/>}/>
      <Route path="/rentaVuelos" exact element={<RentaVuelos/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;