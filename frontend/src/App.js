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

import Inicio_turista from './components/inicios/Inicio_Turista';
import Inicio_admin from './components/inicios/inicio_admin';
import Inicio_recep from './components/inicios/Inicio_Recep'
//ADMIN
import RegUsersA from './components/inicios/reg_admin/Reg_users';
import RegViajesA from './components/inicios/reg_admin/Reg_viajes';
import RegAutosA from './components/inicios/reg_admin/Reg_autos';


//IMPORTANTE COLOCAR LAS COMPONENTES DE LAS PAGINAS EN MAYUSCULAS AL INICIO O CAUSARA CONFLICTOS 
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

      <Route path="/initT" exact element={<Inicio_turista/>}/>
      <Route path="/initR" exact element={<Inicio_recep/>}/>
      <Route path="/initA" exact element={<Inicio_admin/>}/>

      <Route path="/regUserA" exact element={<RegUsersA/>}/>
      <Route path="/regViajesA" exact element={<RegViajesA/>}/>
      <Route path="/regAutosA" exact element={<RegAutosA/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;