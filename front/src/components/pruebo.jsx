import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Datos de ejemplo para el gráfico de radar
const radarData = [
  {
    metric: 'Goles',
    valor: 10,
    fullMark: 20,
  },
  {
    metric: 'Faltas Totales',
    valor: 30,
    fullMark: 50,
  },
  {
    metric: 'Pases',
    valor: 150,
    fullMark: 200,
  },
  {
    metric: 'Tiros',
    valor: 80,
    fullMark: 100,
  },
  {
    metric: 'Posesión (%)',
    valor: 55,
    fullMark: 100,
  }
];

// Componente del gráfico de radar
const RadarChartComponent = () => (
  <ResponsiveContainer width="100%" height={200}>
    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
      <PolarGrid stroke="#000" strokeWidth={1} fill="#fff" />
      <PolarAngleAxis dataKey="metric" stroke="#000" />
      <PolarRadiusAxis stroke="#000" />
      <Radar
        name="Argentina"
        dataKey="valor"
        stroke="#00bfff"  // Celeste
        fill="#00bfff"   // Celeste
        fillOpacity={0.6}
      />
    </RadarChart>
  </ResponsiveContainer>
);

// Componente principal
const ArgentinaInfoWithRadar = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Información sobre Argentina */}
      <div style={{ flex: 1, padding: '20px',  }}>
        <p><strong>Partidos Jugados:</strong> 6</p>
        <p><strong>Victorias:</strong> 5</p>
        <p><strong>Empates:</strong> 1</p>
        <p><strong>Derrotas:</strong> 0</p>
        <p><strong>Goles a Favor:</strong> 9</p>
        <p><strong>Goles en Contra:</strong> 1</p>
        <p><strong>Faltas Totales:</strong> 30</p>
        <p><strong>Pases Totales:</strong> 150</p>
        <p><strong>Tiros Totales:</strong> 80</p>
        <p><strong>Posesión Promedio:</strong> 55%</p>
      </div>

      {/* Gráfico de radar */}
      <div style={{ flex: 1 }}>
        <h2>Radar del promedio </h2>
        <RadarChartComponent />
      </div>
    </div>
  );
};

export default ArgentinaInfoWithRadar;
