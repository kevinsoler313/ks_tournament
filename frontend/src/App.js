import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [deporte, setDeporte] = useState("futbol");
  const navigate = useNavigate();

const handleCrearTorneo = () => {
  navigate(`/crear/${deporte}`);
};

  return (
    <div className="container">
      <h1 className="title">KS TOURNAMENT</h1>

      <select 
        value={deporte} 
        onChange={(e) => setDeporte(e.target.value)}
      >
        <option value="futbol">Fútbol</option>
        <option value="tenis">Tenis</option>
        <option value="basketbol">Basketbol</option>
      </select>

      <button className="button" onClick={handleCrearTorneo}>
        CREAR TORNEO
      </button>
    </div>
  );
}

export default App;
