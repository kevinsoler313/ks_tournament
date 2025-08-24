import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearFutbol() {
  const [tipoTorneo, setTipoTorneo] = useState("Liga");
  const [numEquipos, setNumEquipos] = useState(2);
  const navigate = useNavigate();

  const handleSiguiente = () => {
    navigate("/configurar-equipos-futbol", { state: { cantidadEquipos: numEquipos } });
  };

  return (
    <div className="container">
      <h1 className="title">Configura tu Torneo de Fútbol</h1>

      <label>Tipo de torneo:</label>
      <select value={tipoTorneo} onChange={(e) => setTipoTorneo(e.target.value)}>
        <option value="Liga">Liga</option>
        <option value="Mundial">Mundial</option>
      </select>

      <label>Cantidad de equipos:</label>
      <input
        type="number"
        min="2"
        value={numEquipos}
        onChange={(e) => setNumEquipos(Number(e.target.value))}
      />

      <button className="button" onClick={handleSiguiente}>
        Siguiente
      </button>
    </div>
  );
}

export default CrearFutbol;
