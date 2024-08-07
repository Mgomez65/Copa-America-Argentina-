import React from 'react';
import { Navigate, Outlet,useNavigate } from 'react-router-dom';
import GetUserId from './token'; 

const PrivateRoute = () => {

  const userId = GetUserId(); 

  return userId ? <Outlet   /> : <Navigate to="/" />; // Renderiza los componentes hijos si está autenticado, de lo contrario redirige a /login
};

export default PrivateRoute;