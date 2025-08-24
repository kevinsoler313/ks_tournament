import React, { useState } from "react";
import "../App.css";

function CrearFutbol() {
  const [tipoTorneo, setTipoTorneo] = useState("Liga");
  const [cantidadEquipos, setCantidadEquipos] = useState(4);

  const handleGuardar = () => {
    alert(`Torneo: ${tipoTorneo}\nCantidad de equipos: ${cantidadEquipos}`);
  };

  return (
    <div className="container">
      <h1 className="title">Configuración Torneo de Fútbol</h1>

      <div className="form-group">
        <label>Tipo de torneo:</label>
        <select
          value={tipoTorneo}
          onChange={(e) => setTipoTorneo(e.target.value)}
        >
          <option value="Liga">Liga</option>
          <option value="Mundial">Mundial</option>
        </select>
      </div>

      <div className="form-group">
        <label>Cantidad de equipos: </label>
        <input
          type="number"
          value={cantidadEquipos}
          onChange={(e) => setCantidadEquipos(e.target.value)}
          placeholder="Ej: 8"
          min="2"
        />
      </div>

      <button className="button" onClick={handleGuardar}>
        Guardar Configuración
      </button>
    </div>
  );
}

export default CrearFutbol;
