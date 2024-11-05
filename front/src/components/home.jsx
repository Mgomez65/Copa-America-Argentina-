import React from "react";
import "./estilos/home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="header">
            <div className="HeaderIzquierdo"> 
        <img src="../../public/ESCUDO.png" alt=" escudo Afa" className="IconosAfa" /><h2>Copa America 2024 Selecion Argentina </h2>
        </div>      
                <Link to="/login" className="nav-link">
                    <button className=" botonIcono">
                    <img src="../../public/iconoSesion.png" alt=" Iconos jugadores" className="Iconos"/>
                        Iniciar Sesion    
                    </button>
                    
                    </Link>                 
                
            </header>
            <main className="flex-1">

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-10">
                        <div className=" flex flex-col space-y-4">
                            <h1 className="title">Argentina, Campeona de la Copa America 2024</h1>
                            <p className="description">
                                La selección de Argentina se consagró campeona de La copa del America 2024, 
                                celebrada en Estados Unidos. Liderados por Lionel Messi, 
                                Los albicelestes lograron su decimosexta Trofeo tras vencer a Colombia en una final épica, consagrándose como el máximo ganador de la Copa América. <br /> 
                                
                            </p>
                            <Link to="/login" className="button">
                                Iniciar Sesión
                            </Link>
                        </div>
                        <div>
                            <img
                                src="https://www.clarin.com/img/2024/07/15/FSYk3cFMv_2000x1500__1.jpg"
                                alt="Argentina Campeona"
                                className="fotoCAmpeona"
                            />
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-10">
                        <div>
                            <img
                                src="./DiMariaCopa.jpg"
                                alt="Argentina Campeona"
                                style={{'width': '600px'}}
                            />
                        </div>

                        <div className=" flex flex-col space-y-4">
                            <h1 className="text-">
                                Resultados de Argentina para consagrarse campeón
                            </h1>
                            <ul className="features">
                                <li className="feature">
                                    <div>
                                        <h3 className="feature-title">
                                            20 de junio, Fase de grupos - Argentina vs Canada                                         
                                        </h3>
                                        <p className="feature-description">Marcador: 2-0</p>
                                    </div>
                                </li>
                                <li className="feature">
                                    <div>
                                        <h3 className="feature-title">
                                            25 de junio, Fase de grupos - Chile vs Argentina
                                        </h3>
                                        <p className="feature-description">Marcador: 0-1</p>
                                    </div>
                                </li>
                                <li className="feature">
                                    <div>
                                        <h3 className="feature-title">
                                            29 de Junio, Fase de grupos - Argentina vs Peru
                                        </h3>
                                        <p className="feature-description">Marcador: 2-0</p>
                                    </div>
                                </li>
                                <li className="feature">
                                    <div>
                                        <h3 className="feature-title">
                                            4 de Julio, Cuartos - Argentina vs Ecuador
                                        </h3>
                                        <p className="feature-description">
                                            Marcador: 1-1 en penaltis (4-2)
                                        </p>
                                    </div>
                                </li>
                                <li className="feature">
                                    <div>
                                        <h3 className="feature-title">
                                            9 de julio, Semifinales - Argentina vs Canada
                                        </h3>
                                        <p className="feature-description">Marcador: 2-0</p>
                                    </div>
                                </li>
                                <li className="feature">
                                    <div>
                                        <h3 className="feature-title">
                                            14 de julio, Final - Argentina vs Canada
                                        </h3>
                                        <p className="feature-description">
                                            Marcador: 1-0
                                        </p>
                                    </div>
                                </li>
                                <br />
                            </ul>
                        </div>
                    </div>
                </section>
            </main>{" "}
        </div>
    );
};

export default Home;
