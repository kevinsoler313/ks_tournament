from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Modelo para recibir datos desde React
class Torneo(BaseModel):
    deporte: str

# Ruta de prueba
@app.get("/")
def inicio():
    return {"mensaje": "Bienvenido al backend de KS Tournament"}

# Ruta para crear un torneo
@app.post("/crear_torneo/")
def crear_torneo(torneo: Torneo):
    return {"mensaje": f"Torneo de {torneo.deporte} creado exitosamente"}
