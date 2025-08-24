// CrearTenis.jsx
import React from "react";

function CrearTenis() {
  return (
    <div className="container">
      <h1 className="title">Personalización del Torneo de Tenis 🎾</h1>
      <label>¿Es individual o dobles?</label>
      <select>
        <option>Individual</option>
        <option>Dobles</option>
      </select>
    </div>
  );
}

export default CrearTenis;
