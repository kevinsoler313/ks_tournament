import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import CrearFutbol from "./pages/CrearFutbol";
import CrearTenis from "./pages/CrearTenis";
import CrearBasketbol from "./pages/CrearBasketbol";
import ConfigurarEquiposFutbol from "./pages/ConfigurarEquiposFutbol";
import LineaTorneoFutbol from "./pages/LineaTorneoFutbol";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="/crear/futbol" element={<CrearFutbol />} />
    <Route path="/crear/tenis" element={<CrearTenis />} />
    <Route path="/crear/basketbol" element={<CrearBasketbol />} />
    <Route path="/configurar-equipos-futbol" element={<ConfigurarEquiposFutbol />} />
    <Route path="/linea-torneo-futbol" element={<LineaTorneoFutbol />} />
  </Routes>
  </BrowserRouter>
);
