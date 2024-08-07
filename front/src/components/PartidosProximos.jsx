import { useEffect, useState } from "react";

const Proximo = () => {
    const [datos, setDatos] = useState();
    useEffect(() => {
        const fetchPartidos = async () => {
            const url = `https://v3.football.api-sports.io/fixtures?team=26&next=2 `;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'x-apisports-key': "c7c23ac2199a5e7df2282b84da987986",
                        'x-rapidapi-host': "v3.football.api-sports.io"
                    }
                });
                const respuesta = await response.json();
                console.log(response)
                setDatos(respuesta.response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchPartidos();
    }, []);
    return (
        <div  className="proximoPartidos">
        <h2 className="tituloPartidos">Próximo partido de Argentina</h2>
        {datos && datos.map((partido, index) => (
            <div key={index} className="botonPartido">
                <div className="column local">
                    <div className="teamProximo">
                        <img src={partido.teams.home.logo} alt={`${partido.teams.home.name} logo`} className="team-logo" />
                        <span className="team-name">{partido.teams.home.name}</span>
                    </div>
                </div>
                <div className="column vs">VS</div>
                <div className="column visitante">
                    <div className="teamProximo">
                        <img src={partido.teams.away.logo} alt={`${partido.teams.away.name} logo`} className="team-logo" />
                        <span className="team-name">{partido.teams.away.name}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
    )
}
export default Proximo;