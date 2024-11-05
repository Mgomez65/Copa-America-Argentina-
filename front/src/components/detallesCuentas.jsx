import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./estilos/detalle.css";
import Actualizar from "./Actualizar";
import GetUserId from "./token";

const Detalles = () => {
    const [usuarios, setUsuarios] = useState(null);
    const [error, setError] = useState(null);
    const userId = GetUserId();
    const navigate = useNavigate();

    const MostrarInfomacion = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/${userId}`, {
                method: "GET",
                credentials: 'include', 
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                if (response.status === 401) {
                    setError('No autorizado. Por favor, inicie sesión nuevamente.');
                } else {
                    setError(`Error: ${response.statusText}. ${errorText}`);
                }
                return;
            }

            const respuesta = await response.json();
            setUsuarios(respuesta); // Guarda la respuesta en el estado
        } catch (error) {
            setError('Error al obtener la información del usuario.');
        }
    };
    const eliminar = async () => {
        try {
            const response = await fetch(`http://localhost:8000/delete/${userId}`, {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.statusText}. ${errorText}`);
            }

            const respuesta = await response.json();
            alert(respuesta.message);
            navigate('/'); // Redirecciona a la página principal al eliminar el usuario
        } catch (error) {
            alert("Error al eliminar el usuario: " + error.message);
        }
    };

    useEffect(() => {
        MostrarInfomacion(); 
    }, []); 

    if (error) {
        return <div>Error: {error}</div>; 
    }

    if (!usuarios) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="header">
            <div className="HeaderIzquierdo"> 
        <img src="../../public/ESCUDO.png" alt=" escudo Afa" className="IconosAfa" /><h2>Copa America 2024 Selecion Argentina </h2>

        </div>
                    <Link to="/gallery" className="nav-link">
                    <button className=" botonIcono">
                    <img src="../../public/flecha.png" alt=" Iconos jugadores" className="Iconos"/>
                        
                        Volver</button>
                    
                    </Link>
                
            </header>
            <div className="column_Act">
                <div className="actualizar_div">
                    <Actualizar />
                </div>
                <div className="Informacion">
                    <h2 className="tituloPartidos"><strong>Información de la Cuenta</strong></h2><br />
                    <h4>Nombre de Usuario: <strong>{usuarios.nombreUsuario}</strong></h4>
                    <h4>Email: <strong>{usuarios.gmail}</strong></h4><br />
                    <button className="boton_eliminar" onClick={eliminar}>Eliminar</button>
                </div>
            </div>
        </div>
    );
}

export default Detalles;
