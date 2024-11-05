import React, { useState } from 'react';
import "./estilos/login.css";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Register from "./register"
const Login = () => {

  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });
        const respuesta = await response.json(); 
        console.log(response)    
        if (response.ok) {
          navigate('/gallery');
      } else {
          alert(respuesta.message);
      }
    } catch (error) {
      alert("Error registrando usuario: " + error.message);
    }
  };



  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="header">
      <div className="HeaderIzquierdo"> 
        <img src="../../public/ESCUDO.png" alt=" escudo Afa" className="IconosAfa" /><h2>Copa America 2024 Selección Argentina </h2>

        </div>
        <a className="flex items-center justify-center" href="#"></a>
        <Link to="/" className="nav-link">
                    <button className=" botonIcono">
                    <img src="../../public/flecha.png" alt=" Iconos jugadores" className="Iconos"/>
                        
                        Volver</button>
                    
                    </Link>
      </header>
      <div className='columnLogin'>
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="tituloPartidos">Inicio de Sesión</h2> <br />
            <div>
              <input
                className="register-input"
                placeholder="Email"
                {...register("gmail", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                })}
              />
              {errors.gmail?.type === "required" && <p>El campo es requerido</p>}
              {errors.gmail?.type === "pattern" && (
                <p>El formato de email no es correcto</p>
              )}
            </div>
            <div>
              <input
                className="register-input"
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                })}
              />
              {errors.password?.type === "pattern" && (
                <p>La Contraseña debe tener 1 Mayúscula, 1 minúscula y más de 8 caracteres</p>
              )}
              {errors.password?.type === "required" && <p>El campo es requerido</p>}
            </div>
            <button className="login-button" type="submit">Iniciar Sesión</button>
            
          </form>
        </div>
        <div className="login-container">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default Login;