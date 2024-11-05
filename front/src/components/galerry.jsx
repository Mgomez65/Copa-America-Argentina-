import { useEffect, useState } from "react";
import "./estilos/gallery.css";
import MenuAjuestes from "./dropdown";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import ArgentinaInfoWithRadar from './pruebo';
import Proximo from "./PartidosProximos"
import { jugadoress } from '../jugadores/jugadores';


const Pruebo = () => {
    const jugadores = jugadoress[0];
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
    const [mostrarPartido, setMostrarPartido] = useState(true);
    const [mostrarJugadores, setMostrarJugadores] = useState(false);
    const [partidoSeleccionado, setPartidoSeleccionado] = useState(true);
    const partidosMundial = {
        "fase_de_grupos": [
            {
                "partido": "Argentina vs Canadá",
                "resultado": "2 - 0",
                "logos": {
                    "argentina": "https://ssl.gstatic.com/onebox/media/sports/logos/1xBWyjjkA6vEWopPK3lIPA_96x96.png",
                    "canada": "https://ssl.gstatic.com/onebox/media/sports/logos/H23oIEP6qK-zNc3O8abnIA_96x96.png"
                }
            },
            {
                "partido": "Argentina vs Chile",
                "resultado": "1 - 0",
                "logos": {
                    "argentina": "https://ssl.gstatic.com/onebox/media/sports/logos/1xBWyjjkA6vEWopPK3lIPA_96x96.png",
                    "chile": "https://ssl.gstatic.com/onebox/media/sports/logos/cI5rCchv6SjDgZ5NuEaMMQ_96x96.png"
                }
            },
            {
                "partido": "Argentina vs Perú",
                "resultado": "2 - 0",
                "logos": {
                    "argentina": "https://ssl.gstatic.com/onebox/media/sports/logos/1xBWyjjkA6vEWopPK3lIPA_96x96.png",
                    "peru": "https://ssl.gstatic.com/onebox/media/sports/logos/1ZizIpPB_eo-u8zYYjnFcg_96x96.png"
                }
            }
        ],
        "cuartos_de_final": {
            "partido": "Argentina vs Ecuador",
            "resultado": "1 (4) - 1 (2)",
            "logos": {
                "argentina": "https://ssl.gstatic.com/onebox/media/sports/logos/1xBWyjjkA6vEWopPK3lIPA_96x96.png",
                "ecuador": "https://ssl.gstatic.com/onebox/media/sports/logos/AKqvkBpIyr-iLOK7Ig7-yQ_96x96.png"
            }
        },
        "semifinal": {
            "partido": "Argentina vs Canadá",
            "resultado": "2 - 0",
            "logos": {
                "argentina": "https://ssl.gstatic.com/onebox/media/sports/logos/1xBWyjjkA6vEWopPK3lIPA_96x96.png",
                "canada": "https://ssl.gstatic.com/onebox/media/sports/logos/H23oIEP6qK-zNc3O8abnIA_96x96.png"
            }
        },
        "final": {
            "partido": "Argentina vs Colombia",
            "resultado": "1 - 0",
            "logos": {
                "argentina": "https://ssl.gstatic.com/onebox/media/sports/logos/1xBWyjjkA6vEWopPK3lIPA_96x96.png",
                "colombia": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAAsY58+1GTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAABERJREFUeNrtm8trE0Ecx2d3p7UFg0FLQQ82ra+z6MWDiAqC/iWeWgQvihVR8S6IB/HgP+BFPKkU/wDBs2AhuVSU+oCCrc3ufp2Jm7pJd+c9m4RmyjbZnd3sfH7v2WQIGbdxG7e93AJRZ7PZPA1gib29xLYjbItGhCth2xrbVoIgeNxoND5qCYBBB61W6z57vc12wxFXcsqE8Ghubu4ue0V/Jy26IoO/s3Mg/plOkq8x0nZgNxYoHdI8YbdWQ4rt4HBE6EFusSFnYUy8a1lqAZnZf+hoHm3Utl6k9eBdRPCHCzNvJgUDLHoPyTVEfE33PTTu0yGbIr/ItXhj+npEwskgs4Sz/e4QFpj/Uvd4bfN5WievGfyWkSYG19hYsUnqeElrv58kXdaMjQgFkAU8Zvbfk3rwpjjoYXSEUccrStrrSQ+bRAA82pPJtJX0mLyWBQyTgFIyka4meTaZADpaT9NY4sci/x8Sq8nuiQ7LfzaZAMq1qQ0x/FZDzcENLcGpAGEtSGpmtqgYaiAWYCJxOHKd6gREh0NbtgEUVVmAgSXAND5gVFzAZRBEhVbjxQUgGAQcgLh3hdCdtmAxcBsrQlUuAPU+ZXgM3FXcZwGjlOcigJqlXepU+oC51QyoJpCUwoo30AI3KZ78xQdqpwBYuo2rlGledVJ7YFeVo2vt2woAOtKEwTmu5g12VSetJgDB0A38WwJ1B2lYMFlVjvZu4/lLD6jvw3fK9JEFrLQOxTTqN2WWCuD9p/lk8elN6ySBvkEARLKPYhSUf07PNdiN/2xpIblwxpMFlFkuCqSvA696Txm8FxcQjRMlt9aFL9O+66frwjpA52aq4C7hVbQvsypqHuagHw8Kj6nBi64rdUNYzgVgkH7KB2MHX+b3tgnTSRoEdC0B4vIGMPp8aGrfSxDUNUvI+j34vZIAtOZCSpqCvFwyhLdRFvVp/iJtuIS3SZnCJ0I2OdcU3BX8QOYCutFZJdiZwkNxnlUqgEPJZnp547O1D6CsyCIQnoh/J/V2oyRJ93X2z41m0lOptgBOtn8k97689ZAX9etkEKifX2Am+7fPJYQc8+wC0mhoVi7awvuJAco5yK5c9A0vmQzBbOoFN3WyFrxkDPCaBWBhMSrgKiFd8CDAbjYInzHBAbzE7K1ng1VAK4F7grcTgNbTEg3wCuHLBMB/VhohDCPLWlj/OYNKoNOF5/uc5T9bTyv6XmCt07FwNIQucH4rAS81d0/w/Eh4vBHm2WQCWOH/otmZ6fDK+Q0pqCRdIvenDK50TEHzHPDqxQ3OkmcTCoCvsSHZz8RrtxanwYQQE2jVBUJoUY2hqnUF+DhgLwz+wPKNLnyasfXyFo2v2Ww+yC+Zib+tb22vNhO048RBqnAcY3cLKJiYiPadmI/o7MxUTrEPG43GslIW4AuM+Bqb7qIp/kFsIyPadhZNFXXu+WVz4zZu47a321+RqZZk05jl7wAAAABJRU5ErkJggg=="
            }
        }
    };



    const toggleMostrarPartidos = () => {
        setMostrarPartido(prevState => !prevState);
        setJugadorSeleccionado(null)
        if (mostrarJugadores) {
            setMostrarJugadores(false);
            setPartidoSeleccionado(true)
        }
    };

    const toggleMostrarJugadores = () => {
        setMostrarJugadores(prevState => !prevState);
        setPartidoSeleccionado(null)
        if (mostrarPartido) {
            setMostrarPartido(false);
        }
    };

    const mostrarEstadisticasJugador = (jugador) => {
        setJugadorSeleccionado(jugador);
    };

    const handleSeleccionarJugador = (jugador) => {
        setJugadorSeleccionado(jugador);
    };

    const prepareChartData = (jugador) => {

        if (!jugador) return [];

        return [
            { stat: 'Goles', value: jugador.Goles },
            { stat: 'Asistencias', value: jugador.Asistencias },
            { stat: 'Partidos', value: jugador.Partidos },
            { stat: 'Tarjetas Amarillas', value: jugador['Tarjetas Amarillas'] },
            { stat: 'Tarjetas Rojas', value: jugador['Tarjetas Rojas'] },
        ];
    };


    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="header">
                <div className="HeaderIzquierdo">
                    <img src="../../public/ESCUDO.png" alt="Escudo AFA" className="IconosAfa" />
                    <h2>Copa América 2024 Selección Argentina</h2>
                </div>
                <div className="HeaderDerecho">
                    <button className="botonIcono" onClick={toggleMostrarPartidos}>
                        <img src="../../public/futbol.png" alt="Icono partidos" className="Iconos" />
                        {mostrarPartido ? "Ocultar " : "Mostrar"} Partidos
                    </button>
                    <button className="botonIcono" onClick={toggleMostrarJugadores}>
                        <img src="../../public/persona.png" alt="Icono jugadores" className="Iconos" />
                        {mostrarJugadores ? "Ocultar " : "Mostrar "} Jugadores
                    </button>
                    <MenuAjuestes />
                </div>
            </header>

            <div className="column_gallery">
                <div className="column">
                    {mostrarPartido && (
                        <div className="ContedorPartidos">
                            <h2 className="tituloPartidos">Argentina Copa América Partidos</h2>
                            {partidosMundial.fase_de_grupos.map((partido, index) => (
                                <div key={index} className="botonPartido">
                                    <div className="team">
                                        <img src={partido.logos.argentina} alt="Argentina logo" className="team-logo" />
                                        <span className="team-name">Argentina</span>
                                    </div>
                                    <span className="vs"><strong>{partido.resultado}</strong></span>
                                    <div className="team">
                                        <img src={partido.logos.canada || partido.logos.chile || partido.logos.peru} alt={`${partido.partido.split(' vs ')[1]} logo`} className="team-logo" />
                                        <span className="team-name">{partido.partido.split(' vs ')[1]}</span>
                                    </div>
                                </div>
                            ))}
                            <h3 className="tituloPartidos">Cuartos de Final</h3>
                            <div className="botonPartido">
                                <div className="team">
                                    <img src={partidosMundial.cuartos_de_final.logos.argentina} alt="Argentina logo" className="team-logo" />
                                    <span className="team-name">Argentina</span>
                                </div>
                                <span className="vs"><strong>{partidosMundial.cuartos_de_final.resultado}</strong></span>
                                <div className="team">
                                    <img src={partidosMundial.cuartos_de_final.logos.ecuador} alt="Ecuador logo" className="team-logo" />
                                    <span className="team-name">Ecuador</span>
                                </div>
                            </div>
                            <h3 className="tituloPartidos">Semifinal</h3>
                            <div className="botonPartido">
                                <div className="team">
                                    <img src={partidosMundial.semifinal.logos.argentina} alt="Argentina logo" className="team-logo" />
                                    <span className="team-name">Argentina</span>
                                </div>
                                <span className="vs"><strong>{partidosMundial.semifinal.resultado}</strong></span>
                                <div className="team">
                                    <img src={partidosMundial.semifinal.logos.canada} alt="Canadá logo" className="team-logo" />
                                    <span className="team-name">Canadá</span>
                                </div>
                            </div>
                            <h3 className="tituloPartidos">Final</h3>
                            <div className="botonPartido">
                                <div className="team">
                                    <img src={partidosMundial.final.logos.argentina} alt="Argentina logo" className="team-logo" />
                                    <span className="team-name">Argentina</span>
                                </div>
                                <span className="vs"><strong>{partidosMundial.final.resultado}</strong></span>
                                <div className="team">
                                    <img src={partidosMundial.final.logos.colombia} alt="Colombia logo" className="team-logo" />
                                    <span className="team-name">Colombia</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {mostrarJugadores && (
                        jugadores.length > 0 ? (
                            <div className="ContenedorJugadores">
                                <h2 className="tituloPartidos">Argentina Copa America Jugadores</h2>
                                {jugadores.map((jugador) => (
                                    <button
                                        className="BotonJugadores"
                                        onClick={() => mostrarEstadisticasJugador(jugador)}
                                        key={jugador.POS} // Usa 'POS' como clave única
                                    >
                                        {jugador.Nombre}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p>Cargando jugadores...</p>
                        )
                    )}
                </div>

                <div className="column">
                    {jugadorSeleccionado && (
                        <div style={{'backgroundColor': 'white'}}>
                            <h2>Detalles del Jugador</h2>
                            <div className="mostrarJugador">
                                <img src={jugadorSeleccionado.Foto} alt={jugadorSeleccionado.Nombre} className="jugador-logo" />
                                <div>
                                    <p><strong>Nombre:</strong> {jugadorSeleccionado.Nombre}</p>
                                    <p><strong>Nacionalidad:</strong> {jugadorSeleccionado.Nacionalidad}</p>
                                    <p> <strong>Edad:</strong> {jugadorSeleccionado.Edad}</p>
                                    <p><strong>Estatura:</strong> {jugadorSeleccionado.Estatura}</p>
                                    <p><strong>Peso:</strong> {jugadorSeleccionado.Peso}</p>
                                </div>
                            </div>
                            <div>
                                <h6>Estadísticas</h6>
                                <BarChart
                                    width={600}
                                    height={300}
                                    data={prepareChartData(jugadorSeleccionado)}
                                    style={{ backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
                                >
                                    <XAxis dataKey="stat" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </div>
                        </div>
                    )}
                        {partidoSeleccionado && (
                            <>
                                <div className="graficoPartido">
                                    <h2 className="tituloPartidos">Estadística Argentina Campeona Copa América 2024</h2>
                                    <ArgentinaInfoWithRadar />
                                </div>
                                {partidoSeleccionado && (<Proximo />)} 
                            </>
                        )}
                </div>
            </div>
            
        </div>
    );
};

export default Pruebo;