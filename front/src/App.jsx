import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";
import Gallery from "./components/galerry";
import Detalles from "./components/detallesCuentas";
import Pruebo from "./components/pruebo";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/detalles" element={<Detalles />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
