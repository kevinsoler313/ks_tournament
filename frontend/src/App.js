import React from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1 className="title">🏆 KS Tournament</h1>

      <button className="button">CREAR TORNEO</button>

      <select className="select">
        <option value="">Seleccionar tipo de torneo</option>
        <option value="futbol">⚽ Fútbol</option>
        <option value="tenis">🎾 Tenis</option>
        <option value="basket">🏀 Baloncesto</option>
      </select>
    </div>
  );
}

export default App;
