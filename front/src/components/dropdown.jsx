import React, { useState } from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router-dom"

const MenuAjuestes = () => {
    const [estado, setEstado] = useState(false);
    const abrir = () => setEstado(!estado);
    const navigate = useNavigate()

    const cerraSecion = async () => {
        const response = await fetch('http://localhost:8000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {
            navigate('/');
    
        } else {
            alert('Error al cerrar sesión');
        }
    }

    const detallesCuentas= () => {
        navigate('/detalles')
    }
    
    return (
        <div>
            <Dropdown isOpen={estado} toggle={abrir}>
            <DropdownToggle   className="botonAjustes" caret> <img src="../../public/icons-ajustes.png" alt=" escudo Afa" className="IconosAjuste" /></DropdownToggle>
                
                <DropdownMenu>
                    <DropdownItem onClick={()=> detallesCuentas()}> Ver detalles de cuentas </DropdownItem>
                    <DropdownItem onClick={() =>cerraSecion()}>Cerrar Sesion </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
};

export default MenuAjuestes;
