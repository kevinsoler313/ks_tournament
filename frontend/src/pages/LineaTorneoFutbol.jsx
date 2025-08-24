// src/pages/LineaTorneoFutbol.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";

function LineaTorneoFutbol() {
  const location = useLocation();
  const { equipos } = location.state || { equipos: [] };

  // Inicializamos la tabla de posiciones
  const initialTabla = equipos.reduce((acc, eq) => {
    acc[eq] = { puntos: 0, jugados: 0, gf: 0, gc: 0, dg: 0 };
    return acc;
  }, {});
  const [tabla, setTabla] = useState(initialTabla);

  // Generamos los partidos (liga simple: todos contra todos)
  const partidos = [];
  for (let i = 0; i < equipos.length; i++) {
    for (let j = i + 1; j < equipos.length; j++) {
      partidos.push([equipos[i], equipos[j]]);
    }
  }

  // Estado para los resultados
  const [resultados, setResultados] = useState(
    partidos.map(() => [null, null])
  );

const handleCambioGoles = (index, equipo, valor) => {
  const nuevos = [...resultados];
  const numero = valor === "" ? null : Number(valor); // si está vacío, null
  if (equipo === "A") nuevos[index][0] = numero;
  else nuevos[index][1] = numero;
  setResultados(nuevos);
};


  const actualizarTabla = (e) => {
  e.preventDefault();

  // Inicializamos la tabla desde cero
  const nuevaTabla = equipos.reduce((acc, eq) => {
    acc[eq] = { puntos: 0, jugados: 0, gf: 0, gc: 0, dg: 0 };
    return acc;
  }, {});

  resultados.forEach(([gf, gc], idx) => {
    if (gf === null || gf === "" || gc === null || gc === "") return;

    const [eq1, eq2] = partidos[idx];

    nuevaTabla[eq1].jugados += 1;
    nuevaTabla[eq2].jugados += 1;

    nuevaTabla[eq1].gf += gf;
    nuevaTabla[eq1].gc += gc;
    nuevaTabla[eq1].dg = nuevaTabla[eq1].gf - nuevaTabla[eq1].gc;

    nuevaTabla[eq2].gf += gc;
    nuevaTabla[eq2].gc += gf;
    nuevaTabla[eq2].dg = nuevaTabla[eq2].gf - nuevaTabla[eq2].gc;

    if (gf > gc) {
      nuevaTabla[eq1].puntos += 3;
    } else if (gc > gf) {
      nuevaTabla[eq2].puntos += 3;
    } else {
      nuevaTabla[eq1].puntos += 1;
      nuevaTabla[eq2].puntos += 1;
    }
  });

  setTabla(nuevaTabla);
};



  return (
    <div className="container">
      <h1 className="title">Torneo de Fútbol - Formato Liga</h1>

      {equipos.length > 0 && (
        <>
          <div className="tabla-posiciones" style={{ overflowX: "auto", marginTop: "120px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Tabla de Posiciones</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#1e1f2f", color: "white" }}>
              <thead>
                <tr style={{ backgroundColor: "#444764", color: "#00c853" }}>
                  <th>#</th>
                  <th>Equipo</th>
                  <th>PTS</th>
                  <th>PJ</th>
                  <th>GF</th>
                  <th>GC</th>
                  <th>DG</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(tabla)
                    .sort((a, b) => {
                        // Orden descendente por puntos
                        if (b[1].puntos !== a[1].puntos) {
                        return b[1].puntos - a[1].puntos;
                        }
                        // Si hay empate en puntos, orden descendente por diferencia de goles
                        return b[1].dg - a[1].dg;
                    })
                    .map(([equipo, datos], idx) => (
                    <tr key={idx} style={{ textAlign: "center" }}>
                        <td>{idx + 1}</td>
                        <td style={{ fontWeight: "bold", textTransform: "uppercase" }}>{equipo}</td>
                        <td>{datos.puntos}</td>
                        <td>{datos.jugados}</td>
                        <td>{datos.gf}</td>
                        <td>{datos.gc}</td>
                        <td>{datos.dg}</td>
                    </tr>
                    ))}
                </tbody>

            </table>
          </div>

          <hr style={{ borderColor: "#444", margin: "40px 0" }} />

          <div className="tabla-resultados" style={{ marginTop: "20px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Resultados de Partidos</h3>
            <form onSubmit={actualizarTabla} style={{ maxWidth: "800px", margin: "0 auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#2c2f45" }}>
                    <th>Equipo A</th>
                    <th>Goles A</th>
                    <th>Goles B</th>
                    <th>Equipo B</th>
                  </tr>
                </thead>
                <tbody>
                  {partidos.map(([eq1, eq2], idx) => (
                    <tr key={idx} style={{ textAlign: "center" }}>
                      <td style={{ textTransform: "uppercase" }}>{eq1}</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          value={resultados[idx][0] ?? ""}
                          onChange={(e) => handleCambioGoles(idx, "A", e.target.value)}
                          className="input-marcador"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          value={resultados[idx][1] ?? ""}
                          onChange={(e) => handleCambioGoles(idx, "B", e.target.value)}
                          className="input-marcador"
                        />
                      </td>
                      <td style={{ textTransform: "uppercase" }}>{eq2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <button type="submit" className="button">
                  Actualizar tabla
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default LineaTorneoFutbol;
