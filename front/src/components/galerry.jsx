import { useEffect, useState } from "react";
import "./estilos/gallery.css";
import MenuAjuestes from "./dropdown";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import ArgentinaInfoWithRadar from './pruebo';
import Proximo from "./PartidosProximos"

const Pruebo = () => {
    const [partidos, setPartidos] = useState([]);
    const [jugadores, setJugadores] = useState([]);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
    const [mostrarPartido, setMostrarPartido] = useState(true);
    const [mostrarJugadores, setMostrarJugadores] = useState(false);
    const [partidoSeleccionado, setPartidoSeleccionado] = useState(true);

    useEffect(() => {
        const fetchPartidos = async () => {
            const url = `https://v3.football.api-sports.io/fixtures?season=2024&league=9&team=26`;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'x-apisports-key': "c7c23ac2199a5e7df2282b84da987986",
                        'x-rapidapi-host': "v3.football.api-sports.io"
                    }
                });
                const respuesta = await response.json();
                setPartidos(respuesta.response);
                console.log(partidos)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchPartidos();
    }, []);

    useEffect(() => {
        const fetchJugadores = async () => {
            const url = `https://v3.football.api-sports.io/players?season=2024&league=9&team=26`;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'x-apisports-key': "c7c23ac2199a5e7df2282b84da987986",
                        'x-rapidapi-host': "v3.football.api-sports.io"
                    }
                });
                const respuesta = await response.json();
                setJugadores(respuesta.response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchJugadores();
    }, []);

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


    const prepareChartData = (jugador) => {
        if (!jugador || !jugador.statistics.length) return [];

        const stats = jugador.statistics[0]; // Suponiendo que solo tienes un objeto en el array 'statistics'
        return [
            { stat: 'Goles', value: stats.goals.total },
            { stat: 'Asistencias', value: stats.goals.assists },
            { stat: 'Pases Totales', value: stats.passes.total },
            { stat: 'Recuperaciones', value: stats.tackles.total },
            { stat: 'Minutos Jugados', value: stats.games.minutes }
        ];
    };

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="header">
                <div className="HeaderIzquierdo"> <img src="../../public/ESCUDO.png" alt=" escudo Afa" className="IconosAfa" /><h2>Copa America 2024 Selecion Argentina </h2>
                    <MenuAjuestes />
                </div>
                <div className="HeaderDerecho">
                    <button className=" botonIcono" onClick={toggleMostrarPartidos}>
                        <img src="../../public/futbol.png" alt=" Iconos jugadores" className="Iconos" />
                        {mostrarPartido ? "Ocultar " : "Mostrar"} Partidos
                    </button>
                    <button className="botonIcono" onClick={toggleMostrarJugadores}>
                        <img src="../../public/persona.png" alt=" Iconos jugadores" className="Iconos" />
                        {mostrarJugadores ? "Ocultar " : "Mostrar "} Jugadores
                    </button>
                </div>

            </header>

            <div className="column_gallery">
                <div className="column">

                    {mostrarPartido && (
                        partidos.length > 0 ? (

                            <div className="ContedorPartidos">
                                <h2 className="tituloPartidos">Argentina Copa America Partidos</h2>
                                {partidos.map(partido => (
                                    <div key={partido.fixture.id} >
                                        <div className="botonPartido">
                                            <div className="team">
                                                <img src={partido.teams.home.logo} alt={`${partido.teams.home.name} logo`} className="team-logo" />
                                                <span className="team name">{partido.teams.home.name}</span>
                                            </div>
                                            <span className="vs"><strong>{partido.goals.home} vs {partido.goals.away}</strong></span>
                                            <div className="team">
                                                <img src={partido.teams.away.logo} alt={`${partido.teams.away.name} logo`} className="team-logo" />
                                                <span className="team name">{partido.teams.away.name}</span>
                                            </div></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Cargando partidos...</p>
                        )
                    )}

                    {mostrarJugadores && (
                        jugadores.length > 0 ? (
                            <div className="ContenedorJugadores">
                                <h2 className="tituloPartidos">Argentina Copa America Jugadores</h2>
                                {jugadores.map(jugador => (
                                    <button className="BotonJugadores" onClick={() => mostrarEstadisticasJugador(jugador)} key={jugador.player.id}>
                                        {jugador.player.name}
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
                        <div className="jugador-info">
                            <h6  className="tituloPartidos">Informacion del jugador</h6>
                            <div className="column_Jugador">
                                <div>
                                    <img src={jugadorSeleccionado.player.photo} alt={jugadorSeleccionado.player.name} className="jugador-logo" />
                                </div>
                                <div>
                                    <p><strong>Nombre:</strong> {jugadorSeleccionado.player.firstname}</p>
                                    <p><strong>Apellido:</strong> {jugadorSeleccionado.player.lastname}</p>
                                    <p><strong>Nacionalidad:</strong> {jugadorSeleccionado.player.nationality}</p>
                                    <p><strong>Nacimiento:</strong> {jugadorSeleccionado.player.birth.date} ({jugadorSeleccionado.player.age})</p>
                                    <p><strong>Altura:</strong> {jugadorSeleccionado.player.height}</p>
                                    <p><strong>Peso:</strong> {jugadorSeleccionado.player.weight}</p>
                                </div>
                            </div>
                            <div className="grafico">
                                <h6  className="tituloPartidos">Gráfico de Estadísticas del Jugador</h6>
                                <BarChart
                                    width={600}
                                    height={300}
                                    data={prepareChartData(jugadorSeleccionado)}
                                    style={{ backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
                                >
                                    <CartesianGrid strokeDasharray="5 5" stroke="#ddd" />
                                    <XAxis
                                        dataKey="stat"
                                        tick={{ fill: '#333', fontSize: 12, fontWeight: 500 }}
                                        axisLine={{ stroke: '#333', strokeWidth: 2 }}
                                    />
                                    <YAxis
                                        tick={{ fill: '#333', fontSize: 12, fontWeight: 500 }}
                                        axisLine={{ stroke: '#333', strokeWidth: 2 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderColor: '#ccc', borderRadius: '5px', borderWidth: '1px' }}
                                        labelStyle={{ color: '#333' }}
                                        itemStyle={{ color: '#333' }}
                                    />
                                    <Legend
                                        wrapperStyle={{ padding: '10px', fontSize: '14px', fontWeight: '500' }}
                                        verticalAlign="top"
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill="#8884d8"
                                        barSize={40}
                                        radius={[5, 5, 0, 0]}
                                    />
                                </BarChart>
                            </div>
                        </div>
                    )}

                    {partidoSeleccionado && (
                        <div className="graficoPartido">
                            <h2 className="tituloPartidos "> Estadistica Argentina Campeona Copa America 2024 </h2>
                            <ArgentinaInfoWithRadar />
                        </div>
                    )}
                </div>
            </div>
            {partidoSeleccionado && (<Proximo />)}
            
            
        </div>
    );
};

export default Pruebo;