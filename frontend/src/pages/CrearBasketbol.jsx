// CrearBasketbol.jsx
import React from "react";

function CrearBasketbol() {
  return (
    <div className="container">
      <h1 className="title">Personalización del Torneo de Basket 🏀</h1>
      <label>Número de jugadores por equipo:</label>
      <input type="number" placeholder="Ej: 5" />
    </div>
  );
}

export default CrearBasketbol;
