import { useState } from "react";

export default function Home() {
  const [deporte, setDeporte] = useState("futbol");

  const handleCrearTorneo = () => {
    alert(`Creando torneo de ${deporte}...`);
    // Aquí después conectaremos con el backend en Python
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🏆 Bienvenido a KS Tournament</h1>

      {/* Selección de deporte */}
      <select
        className="mb-4 p-2 border rounded-lg shadow"
        value={deporte}
        onChange={(e) => setDeporte(e.target.value)}
      >
        <option value="futbol">⚽ Fútbol</option>
        <option value="tenis">🎾 Tenis</option>
        <option value="voleibol">🏐 Voleibol</option>
      </select>

      {/* Botón principal */}
      <button
        onClick={handleCrearTorneo}
        className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold"
      >
        CREAR TORNEO
      </button>
    </div>
  );
}
