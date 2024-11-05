import React from 'react';

const Proximo = () => {
    const datos = [
        {
            "teams": {
                "home": {
                    "name": "Argentina",
                    "logo": "https://ssl.gstatic.com/onebox/media/sports/logos/1xBWyjjkA6vEWopPK3lIPA_96x96.png"
                },
                "away": {
                    "name": "Paraguay",
                    "logo": "https://ssl.gstatic.com/onebox/media/sports/logos/-FN-y84Al3dbth0hW1t5Qg_96x96.png"
                }
            }
        },
        {
            "teams": {
                "home": {
                    "name": "Argentina",
                    "logo": "https://ssl.gstatic.com/onebox/media/sports/logos/1xBWyjjkA6vEWopPK3lIPA_96x96.png"
                },
                "away": {
                    "name": "Perú",
                    "logo": "https://ssl.gstatic.com/onebox/media/sports/logos/1ZizIpPB_eo-u8zYYjnFcg_96x96.png"
                }
            }
        }
    ];

    return (
        <div className="proximoPartidos">
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
    );
};

export default Proximo;
