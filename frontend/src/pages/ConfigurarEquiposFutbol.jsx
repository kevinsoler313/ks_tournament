// src/pages/ConfigurarEquiposFutbol.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";

function ConfigurarEquiposFutbol() {
  const location = useLocation();
  const { cantidadEquipos } = location.state || { cantidadEquipos: 0 };

  const [nombresEquipos, setNombresEquipos] = useState(
    Array(cantidadEquipos).fill("")
  );

  const handleNombreChange = (index, value) => {
    const nuevosNombres = [...nombresEquipos];
    nuevosNombres[index] = value;
    setNombresEquipos(nuevosNombres);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Equipos configurados:", nombresEquipos);
    // Aquí podrías redirigir a otra página o guardar los datos
  };

  return (
    <div className="container">
      <h1 className="title">Configurar Equipos de Fútbol</h1>
      {cantidadEquipos > 0 ? (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginTop: "30px" }}>
          {nombresEquipos.map((nombre, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <label style={{ color: "#fff", fontWeight: "bold", marginBottom: "5px" }}>
                Nombre del equipo {index + 1}:
              </label>
              <input
                type="text"
                className="select"
                value={nombre}
                onChange={(e) => handleNombreChange(index, e.target.value)} // CORREGIDO
                placeholder={`Equipo ${index + 1}`} // CORREGIDO
                />

            </div>
          ))}
          <button className="button" type="submit">Guardar Equipos</button>
        </form>
      ) : (
        <p style={{ color: "#fff", marginTop: "20px" }}>No se especificó la cantidad de equipos.</p>
      )}
    </div>
  );
}

export default ConfigurarEquiposFutbol;
